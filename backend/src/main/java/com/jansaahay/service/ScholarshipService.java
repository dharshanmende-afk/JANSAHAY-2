package com.jansaahay.service;

import com.jansaahay.dto.EligibilityCheckRequest;
import com.jansaahay.dto.EligibilityMatchResult;
import com.jansaahay.entity.AnalyticsEvent;
import com.jansaahay.entity.Scholarship;
import com.jansaahay.repository.AnalyticsEventRepository;
import com.jansaahay.repository.ScholarshipRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final AnalyticsEventRepository analyticsEventRepository;
    private final RAGService ragService;

    public ScholarshipService(ScholarshipRepository scholarshipRepository,
                              AnalyticsEventRepository analyticsEventRepository,
                              @Lazy RAGService ragService) {
        this.scholarshipRepository = scholarshipRepository;
        this.analyticsEventRepository = analyticsEventRepository;
        this.ragService = ragService;
    }

    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }

    public Optional<Scholarship> getScholarshipById(String id) {
        return scholarshipRepository.findById(id);
    }

    public List<Scholarship> searchScholarships(String query, String category) {
        // Record search event for analytics
        if (query != null && !query.trim().isEmpty()) {
            analyticsEventRepository.save(new AnalyticsEvent("SEARCH", query.trim(), null, null, "Category: " + category));
        }

        List<Scholarship> results;
        if (query != null && !query.trim().isEmpty()) {
            results = scholarshipRepository.searchScholarships(query.trim());
        } else {
            results = scholarshipRepository.findAll();
        }

        if (category != null && !category.equalsIgnoreCase("All") && !category.isBlank()) {
            results = results.stream()
                    .filter(s -> s.getCategory() != null && s.getCategory().equalsIgnoreCase(category.trim()))
                    .collect(Collectors.toList());
        }

        return results;
    }

    public List<EligibilityMatchResult> checkPersonalizedEligibility(EligibilityCheckRequest req, Long userId) {
        // Record eligibility check for analytics
        analyticsEventRepository.save(new AnalyticsEvent(
                "ELIGIBILITY_CHECK",
                req.getEducationLevel() + " | " + req.getCaste(),
                null,
                userId,
                "Income: " + req.getAnnualIncome() + ", Marks: " + req.getMarksPercentage()));

        List<Scholarship> all = scholarshipRepository.findAll();
        List<EligibilityMatchResult> results = new ArrayList<>();

        for (Scholarship sch : all) {
            List<String> matched = new ArrayList<>();
            List<String> unmatched = new ArrayList<>();
            int totalChecks = 0;
            int passedChecks = 0;

            // 1. Level check
            if (sch.getLevel() != null && !sch.getLevel().isBlank() && req.getEducationLevel() != null && !req.getEducationLevel().isBlank()) {
                totalChecks++;
                String schLevel = sch.getLevel().toLowerCase();
                String reqLevel = req.getEducationLevel().toLowerCase();
                boolean levelMatch = false;

                if (reqLevel.contains("10th") && (schLevel.contains("pre matric") || schLevel.contains("10th") || schLevel.contains("school") || schLevel.contains("all"))) {
                    levelMatch = true;
                } else if ((reqLevel.contains("12th") || reqLevel.contains("diploma")) && (schLevel.contains("10+2") || schLevel.contains("diploma") || schLevel.contains("post matric") || schLevel.contains("higher secondary"))) {
                    levelMatch = true;
                } else if (reqLevel.contains("undergraduate") && (schLevel.contains("undergraduate") || schLevel.contains("ug") || schLevel.contains("degree") || schLevel.contains("bachelor") || schLevel.contains("b.tech") || schLevel.contains("post matric"))) {
                    levelMatch = true;
                } else if (reqLevel.contains("postgraduate") && (schLevel.contains("postgraduate") || schLevel.contains("pg") || schLevel.contains("master") || schLevel.contains("post matric"))) {
                    levelMatch = true;
                } else if (reqLevel.contains("phd") && (schLevel.contains("phd") || schLevel.contains("doctor") || schLevel.contains("fellowship") || schLevel.contains("research"))) {
                    levelMatch = true;
                } else if (schLevel.contains("all") || schLevel.contains(reqLevel)) {
                    levelMatch = true;
                }

                if (levelMatch) {
                    passedChecks++;
                    matched.add("Education Level matched (" + req.getEducationLevel() + ")");
                } else {
                    unmatched.add("Targeted for " + sch.getLevel() + ", but your level is " + req.getEducationLevel());
                }
            }

            // 2. Caste / Social Category check
            if (sch.getCasteEligibility() != null && !sch.getCasteEligibility().isBlank() && req.getCaste() != null && !req.getCaste().isBlank()) {
                totalChecks++;
                String castes = sch.getCasteEligibility().toUpperCase();
                String userCaste = req.getCaste().toUpperCase();

                if (castes.contains("ALL") || castes.contains("GENERAL") && userCaste.equals("GENERAL") ||
                        castes.contains(userCaste) || (userCaste.equals("EWS") && castes.contains("EWS"))) {
                    passedChecks++;
                    matched.add("Category eligible: " + req.getCaste() + " (Scheme covers: " + sch.getCasteEligibility() + ")");
                } else {
                    unmatched.add("Requires category " + sch.getCasteEligibility() + " (your category: " + req.getCaste() + ")");
                }
            }

            // 3. Gender check
            if (sch.getGender() != null && !sch.getGender().isBlank() && req.getGender() != null && !req.getGender().isBlank()) {
                totalChecks++;
                String g = sch.getGender().trim().toLowerCase();
                String userG = req.getGender().trim().toLowerCase();

                if (g.equals("all") || g.contains(userG)) {
                    passedChecks++;
                    matched.add("Gender criteria satisfied (" + (g.equals("all") ? "Open to all genders" : sch.getGender()) + ")");
                } else {
                    unmatched.add("Reserved exclusively for " + sch.getGender() + " applicants");
                }
            }

            // 4. Annual Income ceiling check
            if (sch.getIncomeCeiling() != null && sch.getIncomeCeiling() > 0 && req.getAnnualIncome() != null) {
                totalChecks++;
                if (req.getAnnualIncome() <= sch.getIncomeCeiling()) {
                    passedChecks++;
                    matched.add(String.format("Family income ₹%,.0f is within the limit of ₹%,.0f", req.getAnnualIncome(), sch.getIncomeCeiling()));
                } else {
                    unmatched.add(String.format("Family income ₹%,.0f exceeds maximum ceiling of ₹%,.0f", req.getAnnualIncome(), sch.getIncomeCeiling()));
                }
            }

            // 5. Minimum Marks check
            if (sch.getMinMarks() != null && sch.getMinMarks() > 0 && req.getMarksPercentage() != null) {
                totalChecks++;
                if (req.getMarksPercentage() >= sch.getMinMarks()) {
                    passedChecks++;
                    matched.add(String.format("Academic score %.1f%% meets or exceeds minimum requirement (%d%%)", req.getMarksPercentage(), sch.getMinMarks()));
                } else {
                    unmatched.add(String.format("Academic score %.1f%% is below required minimum of %d%%", req.getMarksPercentage(), sch.getMinMarks()));
                }
            }

            // 6. State check
            if (sch.getApplicableStates() != null && !sch.getApplicableStates().isBlank() && req.getState() != null && !req.getState().isBlank()) {
                totalChecks++;
                String appStates = sch.getApplicableStates().toLowerCase();
                String userState = req.getState().toLowerCase();

                if (appStates.contains("all india") || appStates.contains(userState) || userState.contains("all")) {
                    passedChecks++;
                    matched.add("Domicile / State eligible: " + req.getState());
                } else {
                    unmatched.add("Applicable only in: " + sch.getApplicableStates() + " (your state: " + req.getState() + ")");
                }
            }

            // 7. Special flags
            if (Boolean.TRUE.equals(req.getIsDifferentlyAbled()) && sch.getName().toLowerCase().contains("disab")) {
                matched.add("Special quota/allowance for PwD / Differently Abled scholars applicable");
            }
            if (Boolean.TRUE.equals(req.getIsSingleGirlChild()) && sch.getName().toLowerCase().contains("girl")) {
                matched.add("Single Girl Child priority applicable");
            }

            int matchPercentage = totalChecks > 0 ? (int) Math.round(((double) passedChecks / totalChecks) * 100) : 100;
            boolean eligible = unmatched.isEmpty();

            results.add(new EligibilityMatchResult(sch, eligible, matchPercentage, matched, unmatched));
        }

        // Sort: 100% eligible first, then by matchPercentage descending
        results.sort((a, b) -> {
            if (a.isEligible() != b.isEligible()) {
                return a.isEligible() ? -1 : 1;
            }
            return Integer.compare(b.getMatchPercentage(), a.getMatchPercentage());
        });

        return results;
    }

    @Transactional
    public Scholarship createOrUpdateScholarship(Scholarship scholarship) {
        // Compute days left and status if deadline is set
        if (scholarship.getDeadline() != null && !scholarship.getDeadline().isBlank()) {
            try {
                LocalDate deadlineDate = LocalDate.parse(scholarship.getDeadline().trim(), DateTimeFormatter.ISO_LOCAL_DATE);
                LocalDate today = LocalDate.now();
                long days = ChronoUnit.DAYS.between(today, deadlineDate);
                scholarship.setDaysLeft((int) Math.max(0, days));

                if (days < 0) {
                    scholarship.setStatus("Expired");
                } else if (days <= 7) {
                    scholarship.setStatus("Closing Soon");
                } else {
                    scholarship.setStatus("Open");
                }
            } catch (Exception ignored) {}
        }

        if (scholarship.getLastVerifiedOn() == null || scholarship.getLastVerifiedOn().isBlank()) {
            scholarship.setLastVerifiedOn(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE));
        }

        Scholarship saved = scholarshipRepository.save(scholarship);

        // Re-index RAG data immediately after edit
        try {
            ragService.reindex();
        } catch (Exception e) {
            // Log without failing
        }

        return saved;
    }

    @Transactional
    public void deleteScholarship(String id) {
        scholarshipRepository.deleteById(id);
        // Re-index RAG data
        try {
            ragService.reindex();
        } catch (Exception ignored) {}
    }
}
