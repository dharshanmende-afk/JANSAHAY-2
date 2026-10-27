package com.jansaahay.controller;

import com.jansaahay.dto.AnalyticsSummaryDto;
import com.jansaahay.dto.BlockUserRequest;
import com.jansaahay.dto.ChangeRoleRequest;
import com.jansaahay.dto.UserDto;
import com.jansaahay.entity.AuditLog;
import com.jansaahay.entity.Scholarship;
import com.jansaahay.service.AdminService;
import com.jansaahay.service.ScholarshipService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final ScholarshipService scholarshipService;

    public AdminController(AdminService adminService, ScholarshipService scholarshipService) {
        this.adminService = adminService;
        this.scholarshipService = scholarshipService;
    }

    // --- User Management ---
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> listUsers(@RequestParam(required = false) String query) {
        List<UserDto> users = adminService.listUsers(query);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<?> changeRole(@PathVariable Long userId,
                                        @Valid @RequestBody ChangeRoleRequest request,
                                        Authentication authentication) {
        try {
            UserDto updated = adminService.changeUserRole(userId, request.getRole(), authentication.getName());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/users/{userId}/block")
    public ResponseEntity<?> toggleBlock(@PathVariable Long userId,
                                         @RequestBody BlockUserRequest request,
                                         Authentication authentication) {
        try {
            UserDto updated = adminService.toggleUserBlock(userId, request.isBlocked(), authentication.getName());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId, Authentication authentication) {
        try {
            adminService.deleteUser(userId, authentication.getName());
            return ResponseEntity.ok(Map.of("message", "User successfully deleted"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // --- Scholarship CRUD ---
    @PostMapping("/scholarships")
    public ResponseEntity<Scholarship> createScholarship(@RequestBody Scholarship scholarship, Authentication authentication) {
        Scholarship created = scholarshipService.createOrUpdateScholarship(scholarship);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/scholarships/{id}")
    public ResponseEntity<Scholarship> updateScholarship(@PathVariable String id,
                                                        @RequestBody Scholarship scholarship,
                                                        Authentication authentication) {
        scholarship.setId(id);
        Scholarship updated = scholarshipService.createOrUpdateScholarship(scholarship);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/scholarships/{id}")
    public ResponseEntity<?> deleteScholarship(@PathVariable String id, Authentication authentication) {
        scholarshipService.deleteScholarship(id);
        return ResponseEntity.ok(Map.of("message", "Scholarship deleted successfully"));
    }

    // --- Analytics ---
    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsSummaryDto> getAnalytics() {
        AnalyticsSummaryDto summary = adminService.getAnalyticsSummary();
        return ResponseEntity.ok(summary);
    }

    // --- Audit Logs ---
    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        List<AuditLog> logs = adminService.getAuditLogs();
        return ResponseEntity.ok(logs);
    }
}
