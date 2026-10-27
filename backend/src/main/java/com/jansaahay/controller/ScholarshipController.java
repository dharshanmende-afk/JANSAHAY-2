package com.jansaahay.controller;

import com.jansaahay.dto.EligibilityCheckRequest;
import com.jansaahay.dto.EligibilityMatchResult;
import com.jansaahay.entity.Scholarship;
import com.jansaahay.service.ScholarshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    public ScholarshipController(ScholarshipService scholarshipService) {
        this.scholarshipService = scholarshipService;
    }

    @GetMapping
    public ResponseEntity<List<Scholarship>> getAllScholarships(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category) {
        List<Scholarship> results = scholarshipService.searchScholarships(query, category);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getScholarshipById(@PathVariable String id) {
        return scholarshipService.getScholarshipById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "Scholarship not found with ID: " + id)));
    }

    @PostMapping("/check-eligibility")
    public ResponseEntity<List<EligibilityMatchResult>> checkPersonalizedEligibility(
            @RequestBody EligibilityCheckRequest request,
            Authentication authentication) {
        Long userId = null;
        List<EligibilityMatchResult> results = scholarshipService.checkPersonalizedEligibility(request, userId);
        return ResponseEntity.ok(results);
    }
}
