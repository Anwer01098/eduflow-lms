package com.eduflow.service;

import com.eduflow.dto.MessagingDtos.*;
import com.eduflow.entity.*;
import com.eduflow.exception.ApiException;
import com.eduflow.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MessagingService {
    private final ConversationRepository conversationRepo;
    private final ConversationParticipantRepository participantRepo;
    private final MessageRepository messageRepo;
    private final ProfileRepository profileRepository;

    public MessagingService(ConversationRepository conversationRepo, ConversationParticipantRepository participantRepo,
                            MessageRepository messageRepo, ProfileRepository profileRepository) {
        this.conversationRepo = conversationRepo;
        this.participantRepo = participantRepo;
        this.messageRepo = messageRepo;
        this.profileRepository = profileRepository;
    }

    public Conversation create(ConversationRequest req) {
        Conversation c = conversationRepo.save(Conversation.builder()
                .type(req.type()).title(req.title()).courseId(req.courseId())
                .createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build());
        if (req.profileIds() != null) {
            req.profileIds().forEach(pid -> participantRepo.save(ConversationParticipant.builder()
                    .conversationId(c.getId()).profileId(pid)
                    .joinedAt(LocalDateTime.now()).build()));
        }
        return c;
    }

    public Message post(Long conversationId, UUID userId, MessageRequest req) {
        Long profileId = profileRepository.findByUserId(userId).map(Profile::getId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile missing"));
        if (!participantRepo.existsByConversationIdAndProfileId(conversationId, profileId))
            throw new ApiException(HttpStatus.FORBIDDEN, "Not a conversation participant");
        return messageRepo.save(Message.builder()
                .conversationId(conversationId).senderId(userId)
                .content(req.content()).createdAt(LocalDateTime.now()).build());
    }

    public List<Message> listMessages(Long conversationId, UUID userId) {
        Long profileId = profileRepository.findByUserId(userId).map(Profile::getId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile missing"));
        if (!participantRepo.existsByConversationIdAndProfileId(conversationId, profileId))
            throw new ApiException(HttpStatus.FORBIDDEN, "Not a conversation participant");
        return messageRepo.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
}
