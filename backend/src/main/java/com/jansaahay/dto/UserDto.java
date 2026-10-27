package com.jansaahay.dto;

import java.time.LocalDateTime;

public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private boolean blocked;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;

    public UserDto() {}

    public UserDto(Long id, String name, String email, String role, boolean blocked, LocalDateTime createdAt, LocalDateTime lastLoginAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.blocked = blocked;
        this.createdAt = createdAt;
        this.lastLoginAt = lastLoginAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isBlocked() { return blocked; }
    public void setBlocked(boolean blocked) { this.blocked = blocked; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(LocalDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }
}
