package com.jansaahay.service;

import com.jansaahay.entity.Scholarship;
import com.jansaahay.repository.ScholarshipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ScheduledVerificationService {

    private static final Logger logger = LoggerFactory.getLogger(ScheduledVerificationService.class);
    private final ScholarshipRepository scholarshipRepository;

    public ScheduledVerificationService(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

    // Run automatically at startup, and then daily at 2:00 AM
    @EventListener(ApplicationReadyEvent.class)
    public void runInitialVerification() {
        logger.info("Triggering initial scholarship verification scan...");
        verifyScholarships();
    }

    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void verifyScholarships() {
        logger.info("Executing scheduled verification job for scholarships...");
        List<Scholarship> scholarships = scholarshipRepository.findAll();
        LocalDate today = LocalDate.now();
        int expiredCount = 0;
        int unverifiedFlaggedCount = 0;

        for (Scholarship s : scholarships) {
            boolean modified = false;

            // 1. Check Deadline and mark Expired / Closing Soon
            if (s.getDeadline() != null && !s.getDeadline().isBlank()) {
                try {
                    LocalDate deadline = LocalDate.parse(s.getDeadline().trim(), DateTimeFormatter.ISO_LOCAL_DATE);
                    long daysUntil = ChronoUnit.DAYS.between(today, deadline);
                    s.setDaysLeft((int) Math.max(0, daysUntil));

                    if (daysUntil < 0) {
                        if (!"Expired".equalsIgnoreCase(s.getStatus())) {
                            s.setStatus("Expired");
                            expiredCount++;
                            modified = true;
                        }
                    } else if (daysUntil <= 7) {
                        if (!"Closing Soon".equalsIgnoreCase(s.getStatus())) {
                            s.setStatus("Closing Soon");
                            modified = true;
                        }
                    } else {
                        if ("Expired".equalsIgnoreCase(s.getStatus())) {
                            s.setStatus("Open");
                            modified = true;
                        }
                    }
                } catch (Exception e) {
                    logger.warn("Could not parse deadline for scholarship {}: {}", s.getId(), s.getDeadline());
                }
            }

            // 2. Check if not verified in 30 days
            if (s.getLastVerifiedOn() != null && !s.getLastVerifiedOn().isBlank()) {
                try {
                    LocalDate verifiedDate = LocalDate.parse(s.getLastVerifiedOn().trim(), DateTimeFormatter.ISO_LOCAL_DATE);
                    long daysSinceVerified = ChronoUnit.DAYS.between(verifiedDate, today);
                    if (daysSinceVerified > 30) {
                        if (!s.isUnverifiedFlag()) {
                            s.setUnverifiedFlag(true);
                            unverifiedFlaggedCount++;
                            modified = true;
                        }
                    } else {
                        if (s.isUnverifiedFlag()) {
                            s.setUnverifiedFlag(false);
                            modified = true;
                        }
                    }
                } catch (Exception e) {
                    logger.warn("Could not parse lastVerifiedOn for scholarship {}: {}", s.getId(), s.getLastVerifiedOn());
                }
            } else {
                // If never verified, flag it
                s.setUnverifiedFlag(true);
                unverifiedFlaggedCount++;
                modified = true;
            }

            if (modified) {
                scholarshipRepository.save(s);
            }
        }

        logger.info("Scholarship verification complete: {} marked expired, {} flagged unverified (>30 days).",
                expiredCount, unverifiedFlaggedCount);
    }
}
