package com.jansaahay.dto;

import java.util.ArrayList;
import java.util.List;

public class ChatResponse {
    private String answer;
    private List<SourceCitation> sources = new ArrayList<>();
    private boolean confident;

    public ChatResponse() {}

    public ChatResponse(String answer, List<SourceCitation> sources, boolean confident) {
        this.answer = answer;
        this.sources = sources;
        this.confident = confident;
    }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public List<SourceCitation> getSources() { return sources; }
    public void setSources(List<SourceCitation> sources) { this.sources = sources; }

    public boolean isConfident() { return confident; }
    public void setConfident(boolean confident) { this.confident = confident; }

    public static class SourceCitation {
        private String scholarshipId;
        private String scholarshipName;
        private String officialUrl;
        private String deadline;
        private String amount;

        public SourceCitation() {}

        public SourceCitation(String scholarshipId, String scholarshipName, String officialUrl, String deadline, String amount) {
            this.scholarshipId = scholarshipId;
            this.scholarshipName = scholarshipName;
            this.officialUrl = officialUrl;
            this.deadline = deadline;
            this.amount = amount;
        }

        public String getScholarshipId() { return scholarshipId; }
        public void setScholarshipId(String scholarshipId) { this.scholarshipId = scholarshipId; }

        public String getScholarshipName() { return scholarshipName; }
        public void setScholarshipName(String scholarshipName) { this.scholarshipName = scholarshipName; }

        public String getOfficialUrl() { return officialUrl; }
        public void setOfficialUrl(String officialUrl) { this.officialUrl = officialUrl; }

        public String getDeadline() { return deadline; }
        public void setDeadline(String deadline) { this.deadline = deadline; }

        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
    }
}
