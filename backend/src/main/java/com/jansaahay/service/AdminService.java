package com.jansaahay.service;

import com.jansaahay.dto.AnalyticsSummaryDto;
import com.jansaahay.dto.UserDto;
import com.jansaahay.entity.AuditLog;
import com.jansaahay.entity.Scholarship;
import com.jansaahay.entity.User;
import com.jansaahay.repository.AnalyticsEventRepository;
import com.jansaahay.repository.AuditLogRepository;
import com.jansaahay.repository.ScholarshipRepository;
import com.jansaahay.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final AuditLogRepository auditLogRepository;
    private final AnalyticsEventRepository analyticsEventRepository;
    private final AuthService authService;

    public AdminService(UserRepository userRepository,
                        ScholarshipRepository scholarshipRepository,
                        AuditLogRepository auditLogRepository,
                        AnalyticsEventRepository analyticsEventRepository,
                        AuthService authService) {
        this.userRepository = userRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.auditLogRepository = auditLogRepository;
        this.analyticsEventRepository = analyticsEventRepository;
        this.authService = authService;
    }

    public List<UserDto> listUsers(String query) {
        List<User> users;
        if (query != null && !query.trim().isEmpty()) {
            users = userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query.trim(), query.trim());
        } else {
            users = userRepository.findAll();
        }

        // Return UserDto - STRICTLY NO PASSWORDS EXPOSED
        return users.stream().map(authService::toUserDto).collect(Collectors.toList());
    }

    @Transactional
    public UserDto changeUserRole(Long userId, String newRole, String adminEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        String sanitizedRole = newRole.trim().toUpperCase();
        if (!sanitizedRole.startsWith("ROLE_")) {
            sanitizedRole = "ROLE_" + sanitizedRole;
        }

        String oldRole = user.getRole();
        user.setRole(sanitizedRole);
        User updated = userRepository.save(user);

        // Record Audit Log
        auditLogRepository.save(new AuditLog(
                adminEmail,
                "USER_ROLE_CHANGE",
                "USER",
                String.valueOf(userId),
                "Changed role of " + user.getEmail() + " from " + oldRole + " to " + sanitizedRole
        ));

        return authService.toUserDto(updated);
    }

    @Transactional
    public UserDto toggleUserBlock(Long userId, boolean blockStatus, String adminEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        user.setBlocked(blockStatus);
        User updated = userRepository.save(user);

        // Record Audit Log
        auditLogRepository.save(new AuditLog(
                adminEmail,
                blockStatus ? "USER_BLOCK" : "USER_UNBLOCK",
                "USER",
                String.valueOf(userId),
                (blockStatus ? "Blocked user " : "Unblocked user ") + user.getEmail()
        ));

        return authService.toUserDto(updated);
    }

    @Transactional
    public void deleteUser(Long userId, String adminEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        String email = user.getEmail();
        userRepository.deleteById(userId);

        // Record Audit Log
        auditLogRepository.save(new AuditLog(
                adminEmail,
                "USER_DELETE",
                "USER",
                String.valueOf(userId),
                "Deleted user account: " + email
        ));
    }

    public List<AuditLog> getAuditLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }

    public AnalyticsSummaryDto getAnalyticsSummary() {
        AnalyticsSummaryDto summary = new AnalyticsSummaryDto();

        summary.setTotalUsers(userRepository.count());
        summary.setTotalAdminUsers(userRepository.countByRole("ROLE_ADMIN"));
        summary.setBlockedUsers(userRepository.countByBlocked(true));

        summary.setTotalScholarships(scholarshipRepository.count());
        summary.setOpenScholarships(scholarshipRepository.countByStatus("Open"));
        summary.setUpcomingScholarships(scholarshipRepository.countByStatus("Upcoming") + scholarshipRepository.countByStatus("Closing Soon"));
        summary.setExpiredScholarships(scholarshipRepository.countByStatus("Expired"));
        summary.setUnverifiedScholarships(scholarshipRepository.countByUnverifiedFlag(true));

        summary.setTotalSearches(analyticsEventRepository.countByEventType("SEARCH"));
        summary.setTotalEligibilityChecks(analyticsEventRepository.countByEventType("ELIGIBILITY_CHECK"));

        List<Map<String, Object>> recentEvents = analyticsEventRepository.findTop50ByOrderByTimestampDesc().stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", e.getId());
            map.put("eventType", e.getEventType());
            map.put("query", e.getQuery());
            map.put("scholarshipId", e.getScholarshipId());
            map.put("metadata", e.getMetadata());
            map.put("timestamp", e.getTimestamp());
            return map;
        }).collect(Collectors.toList());

        summary.setRecentEvents(recentEvents);

        return summary;
    }
}
