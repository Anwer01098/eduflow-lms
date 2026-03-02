package com.eduflow.controller;

import com.eduflow.dto.MessagingDtos.*;
import com.eduflow.entity.Conversation;
import com.eduflow.entity.Message;
import com.eduflow.service.MessagingService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/messages")
public class MessagingController {
    private final MessagingService service;

    public MessagingController(MessagingService service) {
        this.service = service;
    }

    @PostMapping("/conversations")
    public Conversation createConversation(@RequestBody ConversationRequest req) {
        return service.create(req);
    }

    @PostMapping("/conversations/{conversationId}")
    public Message post(@PathVariable Long conversationId, @AuthenticationPrincipal UUID userId,
                        @RequestBody MessageRequest req) {
        return service.post(conversationId, userId, req);
    }

    @GetMapping("/conversations/{conversationId}")
    public List<Message> list(@PathVariable Long conversationId, @AuthenticationPrincipal UUID userId) {
        return service.listMessages(conversationId, userId);
    }
}
