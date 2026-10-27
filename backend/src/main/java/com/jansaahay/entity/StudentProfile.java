package com.jansaahay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    private String educationLevel; // "10th", "12th / Diploma", "Undergraduate (UG)", "Postgraduate (PG)", "PhD / Post-Doctoral"
    private String caste; // "General", "OBC", "SC", "ST", "EWS", "Minority"
    private String gender; // "Male", "Female", "Transgender"
    private String state;
    private Double annualIncome; // in INR
    private Double marksPercentage;
    
    private Boolean isDifferentlyAbled = false;
    private Boolean isSingleGirlChild = false;
    private Boolean isOrphan = false;
    private Boolean isSportsNational = false;

    private LocalDateTime updatedAt;

    public StudentProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEducationLevel() { return educationLevel; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }

    public String getCaste() { return caste; }
    public void setCaste(String caste) { this.caste = caste; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getAnnualIncome() { return annualIncome; }
    public void setAnnualIncome(Double annualIncome) { this.annualIncome = annualIncome; }

    public Double getMarksPercentage() { return marksPercentage; }
    public void setMarksPercentage(Double marksPercentage) { this.marksPercentage = marksPercentage; }

    public Boolean getIsDifferentlyAbled() { return isDifferentlyAbled; }
    public void setIsDifferentlyAbled(Boolean isDifferentlyAbled) { this.isDifferentlyAbled = isDifferentlyAbled; }

    public Boolean getIsSingleGirlChild() { return isSingleGirlChild; }
    public void setIsSingleGirlChild(Boolean isSingleGirlChild) { this.isSingleGirlChild = isSingleGirlChild; }

    public Boolean getIsOrphan() { return isOrphan; }
    public void setIsOrphan(Boolean isOrphan) { this.isOrphan = isOrphan; }

    public Boolean getIsSportsNational() { return isSportsNational; }
    public void setIsSportsNational(Boolean isSportsNational) { this.isSportsNational = isSportsNational; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
