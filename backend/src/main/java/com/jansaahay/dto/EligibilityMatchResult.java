package com.jansaahay.dto;

import com.jansaahay.entity.Scholarship;
import java.util.ArrayList;
import java.util.List;

public class EligibilityMatchResult {
    private Scholarship scholarship;
    private boolean eligible;
    private int matchPercentage;
    private List<String> matchedCriteria = new ArrayList<>();
    private List<String> unmatchedCriteria = new ArrayList<>();

    public EligibilityMatchResult() {}

    public EligibilityMatchResult(Scholarship scholarship, boolean eligible, int matchPercentage,
                                  List<String> matchedCriteria, List<String> unmatchedCriteria) {
        this.scholarship = scholarship;
        this.eligible = eligible;
        this.matchPercentage = matchPercentage;
        this.matchedCriteria = matchedCriteria;
        this.unmatchedCriteria = unmatchedCriteria;
    }

    public Scholarship getScholarship() { return scholarship; }
    public void setScholarship(Scholarship scholarship) { this.scholarship = scholarship; }

    public boolean isEligible() { return eligible; }
    public void setEligible(boolean eligible) { this.eligible = eligible; }

    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<String> getMatchedCriteria() { return matchedCriteria; }
    public void setMatchedCriteria(List<String> matchedCriteria) { this.matchedCriteria = matchedCriteria; }

    public List<String> getUnmatchedCriteria() { return unmatchedCriteria; }
    public void setUnmatchedCriteria(List<String> unmatchedCriteria) { this.unmatchedCriteria = unmatchedCriteria; }
}
