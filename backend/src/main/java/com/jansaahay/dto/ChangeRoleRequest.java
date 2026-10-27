package com.jansaahay.dto;

import jakarta.validation.constraints.NotBlank;

public class ChangeRoleRequest {
    @NotBlank(message = "Role is required (USER or ADMIN)")
    private String role;

    public ChangeRoleRequest() {}

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
