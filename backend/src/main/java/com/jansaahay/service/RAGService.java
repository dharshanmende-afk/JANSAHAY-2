package com.jansaahay.service;

import com.jansaahay.dto.ChatRequest;
import com.jansaahay.dto.ChatResponse;
import com.jansaahay.entity.Scholarship;
import com.jansaahay.repository.ScholarshipRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Service
public class RAGService {

    private final ScholarshipRepository scholarshipRepository;
    private final List<IndexedDoc> index = new CopyOnWriteArrayList<>();

    public static class IndexedDoc {
        public Scholarship scholarship;
        public Set<String> tokens;
        public String searchableText;

        public IndexedDoc(Scholarship scholarship) {
            this.scholarship = scholarship;
            this.searchableText = (scholarship.getName() + " " +
                    scholarship.getProvider() + " " +
                    scholarship.getCategory() + " " +
                    scholarship.getLevel() + " " +
                    scholarship.getCasteEligibility() + " " +
                    scholarship.getGender() + " " +
                    scholarship.getApplicableStates() + " " +
                    scholarship.getFullScope() + " " +
                    scholarship.getTags() + " " +
                    scholarship.getPortalName()).toLowerCase();
            this.tokens = Arrays.stream(searchableText.split("[^a-zA-Z0-9]+"))
                    .filter(t -> t.length() > 2)
                    .collect(Collectors.toSet());
        }
    }

    public RAGService(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

    @PostConstruct
    public void init() {
        reindex();
    }

    public synchronized void reindex() {
        List<Scholarship> all = scholarshipRepository.findAll();
        List<IndexedDoc> newIndex = all.stream()
                .map(IndexedDoc::new)
                .collect(Collectors.toList());
        index.clear();
        index.addAll(newIndex);
    }

    public ChatResponse answerUserQuery(ChatRequest request) {
        if (index.isEmpty()) {
            reindex();
        }

        String query = request.getQuery();
        if (query == null || query.trim().length() < 2) {
            return new ChatResponse(
                    "Please ask a question about scholarship eligibility, deadlines, benefits, or documents.",
                    Collections.emptyList(),
                    false
            );
        }

        String normalizedQuery = query.toLowerCase().trim();
        Set<String> queryTokens = Arrays.stream(normalizedQuery.split("[^a-zA-Z0-9]+"))
                .filter(t -> t.length() > 2)
                .collect(Collectors.toSet());

        // Stop words removal
        Set<String> stopWords = Set.of(
            "the", "and", "for", "are", "can", "get", "how", "what", "which", "who", "with", "from", "any", "this", "that",
            "scholarship", "scholarships", "scheme", "schemes", "apply", "give", "tell", "details", "info", "information", "about"
        );
        queryTokens.removeAll(stopWords);

        if (queryTokens.isEmpty()) {
            return new ChatResponse(
                    "I could not find this, please verify on the official portal.",
                    Collections.emptyList(),
                    false
            );
        }

        // Score documents based on token overlap & specific matches
        Map<IndexedDoc, Double> scores = new HashMap<>();
        for (IndexedDoc doc : index) {
            double score = 0;
            for (String token : queryTokens) {
                if (doc.tokens.contains(token)) {
                    score += 1.0;
                }
                // Boost for exact name or provider substring match
                if (doc.scholarship.getName().toLowerCase().contains(token)) {
                    score += 2.0;
                }
                if (doc.scholarship.getProvider() != null && doc.scholarship.getProvider().toLowerCase().contains(token)) {
                    score += 1.5;
                }
                if (doc.scholarship.getCategory() != null && doc.scholarship.getCategory().toLowerCase().contains(token)) {
                    score += 1.2;
                }
            }
            if (score > 0) {
                scores.put(doc, score);
            }
        }

        // Check if confidence threshold is met
        if (scores.isEmpty()) {
            return new ChatResponse(
                    "I could not find this, please verify on the official portal.",
                    Collections.emptyList(),
                    false
            );
        }

        // Get top 3 matching scholarships
        List<IndexedDoc> topDocs = scores.entrySet().stream()
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .limit(3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        IndexedDoc primary = topDocs.get(0);
        double primaryScore = scores.get(primary);

        if (primaryScore < 2.0) {
            return new ChatResponse(
                    "I could not find this, please verify on the official portal.",
                    Collections.emptyList(),
                    false
            );
        }

        // Synthesize grounded answer strictly from DB context
        Scholarship s = primary.scholarship;
        StringBuilder answer = new StringBuilder();
        answer.append("Based on verified data in the JanSaahay database:\n\n");
        answer.append("**Scholarship:** ").append(s.getName()).append("\n");
        answer.append("**Provider:** ").append(s.getProvider() != null ? s.getProvider() : "Official Authority").append("\n");
        answer.append("**Financial Benefit / Amount:** ").append(s.getAmount()).append("\n");
        answer.append("**Application Deadline:** ").append(s.getDeadline() != null ? s.getDeadline() : "Check official portal").append(" (Status: ").append(s.getStatus()).append(")\n");

        if (s.getIncomeCeilingText() != null && !s.getIncomeCeilingText().isBlank()) {
            answer.append("**Income Ceiling:** ").append(s.getIncomeCeilingText()).append("\n");
        }
        if (s.getCasteEligibility() != null && !s.getCasteEligibility().isBlank()) {
            answer.append("**Eligible Categories:** ").append(s.getCasteEligibility()).append("\n");
        }
        if (s.getMinMarks() != null && s.getMinMarks() > 0) {
            answer.append("**Minimum Marks Required:** ").append(s.getMinMarks()).append("%\n");
        }

        answer.append("\n**Official Application Portal:** [").append(s.getPortalName() != null ? s.getPortalName() : "Official Site")
              .append("](").append(s.getOfficialPortalUrl()).append(")\n");

        if (s.getLastVerifiedOn() != null) {
            answer.append("\n*Last verified by JanSaahay Team on: ").append(s.getLastVerifiedOn()).append("*");
        }

        List<ChatResponse.SourceCitation> citations = topDocs.stream().map(doc -> {
            Scholarship item = doc.scholarship;
            return new ChatResponse.SourceCitation(
                    item.getId(),
                    item.getName(),
                    item.getOfficialPortalUrl(),
                    item.getDeadline(),
                    item.getAmount()
            );
        }).collect(Collectors.toList());

        return new ChatResponse(answer.toString(), citations, true);
    }
}
