package com.jansaahay.dto;

public class EligibilityCheckRequest {
    private String educationLevel;
    private String caste;
    private String gender;
    private String state;
    private Double annualIncome;
    private Double marksPercentage;
    private Boolean isDifferentlyAbled;
    private Boolean isSingleGirlChild;
    private Boolean isOrphan;
    private Boolean isSportsNational;

    public EligibilityCheckRequest() {}

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
}
