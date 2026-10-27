package com.jansaahay.dto;

import java.util.List;
import java.util.Map;

public class AnalyticsSummaryDto {
    private long totalUsers;
    private long totalAdminUsers;
    private long blockedUsers;
    private long totalScholarships;
    private long openScholarships;
    private long upcomingScholarships;
    private long expiredScholarships;
    private long unverifiedScholarships;
    private long totalSearches;
    private long totalEligibilityChecks;
    private List<Map<String, Object>> recentEvents;

    public AnalyticsSummaryDto() {}

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalAdminUsers() { return totalAdminUsers; }
    public void setTotalAdminUsers(long totalAdminUsers) { this.totalAdminUsers = totalAdminUsers; }

    public long getBlockedUsers() { return blockedUsers; }
    public void setBlockedUsers(long blockedUsers) { this.blockedUsers = blockedUsers; }

    public long getTotalScholarships() { return totalScholarships; }
    public void setTotalScholarships(long totalScholarships) { this.totalScholarships = totalScholarships; }

    public long getOpenScholarships() { return openScholarships; }
    public void setOpenScholarships(long openScholarships) { this.openScholarships = openScholarships; }

    public long getUpcomingScholarships() { return upcomingScholarships; }
    public void setUpcomingScholarships(long upcomingScholarships) { this.upcomingScholarships = upcomingScholarships; }

    public long getExpiredScholarships() { return expiredScholarships; }
    public void setExpiredScholarships(long expiredScholarships) { this.expiredScholarships = expiredScholarships; }

    public long getUnverifiedScholarships() { return unverifiedScholarships; }
    public void setUnverifiedScholarships(long unverifiedScholarships) { this.unverifiedScholarships = unverifiedScholarships; }

    public long getTotalSearches() { return totalSearches; }
    public void setTotalSearches(long totalSearches) { this.totalSearches = totalSearches; }

    public long getTotalEligibilityChecks() { return totalEligibilityChecks; }
    public void setTotalEligibilityChecks(long totalEligibilityChecks) { this.totalEligibilityChecks = totalEligibilityChecks; }

    public List<Map<String, Object>> getRecentEvents() { return recentEvents; }
    public void setRecentEvents(List<Map<String, Object>> recentEvents) { this.recentEvents = recentEvents; }
}
