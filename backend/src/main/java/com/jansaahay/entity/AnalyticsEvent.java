package com.jansaahay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_events")
public class AnalyticsEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventType; // "SEARCH", "ELIGIBILITY_CHECK", "VIEW", "SAVED"

    private String query;
    private String scholarshipId;
    private Long userId;

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public AnalyticsEvent() {
        this.timestamp = LocalDateTime.now();
    }

    public AnalyticsEvent(String eventType, String query, String scholarshipId, Long userId, String metadata) {
        this.eventType = eventType;
        this.query = query;
        this.scholarshipId = scholarshipId;
        this.userId = userId;
        this.metadata = metadata;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getScholarshipId() { return scholarshipId; }
    public void setScholarshipId(String scholarshipId) { this.scholarshipId = scholarshipId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMetadata() { return metadata; }
    public void setMetadata(String metadata) { this.metadata = metadata; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
