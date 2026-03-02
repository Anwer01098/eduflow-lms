package com.eduflow.dto;

import com.eduflow.enums.ConversationType;
import java.util.List;

public class MessagingDtos {
    public record ConversationRequest(ConversationType type, String title, Long courseId, List<Long> profileIds) {}
    public record MessageRequest(String content) {}
}
