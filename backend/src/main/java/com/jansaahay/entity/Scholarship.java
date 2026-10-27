package com.jansaahay.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "scholarships")
public class Scholarship {

    @Id
    private String id;

    @Column(nullable = false, length = 500)
    private String name;

    @Column(length = 500)
    private String provider;

    private String badge;

    // Categories: Pre Matric, Post Matric, Merit, Fellowship, Loan Subsidy, Abroad
    @Column(nullable = false)
    private String category;

    private String amount;
    private Double maxAmountNumeric;

    @Column(length = 500)
    private String level; // Comma-separated or JSON: "Undergraduate,Postgraduate"

    private String applicableStates; // "All India" or comma-separated states

    @Column(length = 500)
    private String casteEligibility; // "General,OBC,SC,ST,EWS,Minority"

    private String gender; // "All", "Female", "Male", "Transgender"

    private Double incomeCeiling; // e.g. 450000
    private String incomeCeilingText;
    private Integer minMarks; // percentage, e.g. 80

    private String deadline; // YYYY-MM-DD
    private String status; // "Open", "Closing Soon", "Upcoming", "Expired"
    private Integer daysLeft;

    @Column(columnDefinition = "TEXT")
    private String fullScope;

    @Column(columnDefinition = "TEXT")
    private String benefits; // JSON array or formatted text

    @Column(columnDefinition = "TEXT")
    private String eligibilityCriteria; // JSON array or formatted text

    @Column(columnDefinition = "TEXT")
    private String requiredDocuments; // JSON array or formatted text

    @Column(columnDefinition = "TEXT")
    private String applicationSteps; // JSON array or formatted text

    private String officialPortalUrl;
    private String portalName;
    private String helpline;

    private String lastVerifiedOn; // YYYY-MM-DD
    private boolean featured = false;

    @Column(length = 500)
    private String tags;

    private boolean unverifiedFlag = false; // set to true if not verified in 30 days

    public Scholarship() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public Double getMaxAmountNumeric() { return maxAmountNumeric; }
    public void setMaxAmountNumeric(Double maxAmountNumeric) { this.maxAmountNumeric = maxAmountNumeric; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getApplicableStates() { return applicableStates; }
    public void setApplicableStates(String applicableStates) { this.applicableStates = applicableStates; }

    public String getCasteEligibility() { return casteEligibility; }
    public void setCasteEligibility(String casteEligibility) { this.casteEligibility = casteEligibility; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Double getIncomeCeiling() { return incomeCeiling; }
    public void setIncomeCeiling(Double incomeCeiling) { this.incomeCeiling = incomeCeiling; }

    public String getIncomeCeilingText() { return incomeCeilingText; }
    public void setIncomeCeilingText(String incomeCeilingText) { this.incomeCeilingText = incomeCeilingText; }

    public Integer getMinMarks() { return minMarks; }
    public void setMinMarks(Integer minMarks) { this.minMarks = minMarks; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getDaysLeft() { return daysLeft; }
    public void setDaysLeft(Integer daysLeft) { this.daysLeft = daysLeft; }

    public String getFullScope() { return fullScope; }
    public void setFullScope(String fullScope) { this.fullScope = fullScope; }

    public String getBenefits() { return benefits; }
    public void setBenefits(String benefits) { this.benefits = benefits; }

    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }

    public String getRequiredDocuments() { return requiredDocuments; }
    public void setRequiredDocuments(String requiredDocuments) { this.requiredDocuments = requiredDocuments; }

    public String getApplicationSteps() { return applicationSteps; }
    public void setApplicationSteps(String applicationSteps) { this.applicationSteps = applicationSteps; }

    public String getOfficialPortalUrl() { return officialPortalUrl; }
    public void setOfficialPortalUrl(String officialPortalUrl) { this.officialPortalUrl = officialPortalUrl; }

    public String getPortalName() { return portalName; }
    public void setPortalName(String portalName) { this.portalName = portalName; }

    public String getHelpline() { return helpline; }
    public void setHelpline(String helpline) { this.helpline = helpline; }

    public String getLastVerifiedOn() { return lastVerifiedOn; }
    public void setLastVerifiedOn(String lastVerifiedOn) { this.lastVerifiedOn = lastVerifiedOn; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public boolean isUnverifiedFlag() { return unverifiedFlag; }
    public void setUnverifiedFlag(boolean unverifiedFlag) { this.unverifiedFlag = unverifiedFlag; }
}
