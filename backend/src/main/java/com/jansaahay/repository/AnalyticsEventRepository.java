package com.jansaahay.repository;

import com.jansaahay.entity.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {
    long countByEventType(String eventType);
    List<AnalyticsEvent> findTop50ByOrderByTimestampDesc();
}
