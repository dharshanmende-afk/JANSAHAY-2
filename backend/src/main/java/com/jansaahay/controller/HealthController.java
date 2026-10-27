package com.jansaahay.controller;

import com.jansaahay.repository.ScholarshipRepository;
import com.jansaahay.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final ScholarshipRepository scholarshipRepository;
    private final UserRepository userRepository;

    public HealthController(ScholarshipRepository scholarshipRepository, UserRepository userRepository) {
        this.scholarshipRepository = scholarshipRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<?> checkHealth() {
        long scholarshipsCount = scholarshipRepository.count();
        long usersCount = userRepository.count();

        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "timestamp", LocalDateTime.now(),
                "service", "JANSAAHAY Scholarship Platform Backend",
                "version", "1.0.0",
                "database", "CONNECTED",
                "totalScholarships", scholarshipsCount,
                "totalUsers", usersCount
        ));
    }
}
