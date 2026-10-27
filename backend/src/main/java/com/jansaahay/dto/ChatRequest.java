package com.jansaahay.dto;

import java.util.ArrayList;
import java.util.List;

public class ChatRequest {
    private String query;
    private List<ChatMessage> history = new ArrayList<>();

    public ChatRequest() {}

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public List<ChatMessage> getHistory() { return history; }
    public void setHistory(List<ChatMessage> history) { this.history = history; }

    public static class ChatMessage {
        private String sender; // "user" or "assistant"
        private String text;

        public ChatMessage() {}
        public ChatMessage(String sender, String text) {
            this.sender = sender;
            this.text = text;
        }

        public String getSender() { return sender; }
        public void setSender(String sender) { this.sender = sender; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}
