package com.eduflow.repository;

import com.eduflow.entity.ConversationParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, Long> {
    boolean existsByConversationIdAndProfileId(Long conversationId, Long profileId);
    List<ConversationParticipant> findByConversationId(Long conversationId);
}
