package com.jansaahay.controller;

import com.jansaahay.dto.ChatRequest;
import com.jansaahay.dto.ChatResponse;
import com.jansaahay.service.RAGService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class RAGChatController {

    private final RAGService ragService;

    public RAGChatController(RAGService ragService) {
        this.ragService = ragService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = ragService.answerUserQuery(request);
        return ResponseEntity.ok(response);
    }
}
