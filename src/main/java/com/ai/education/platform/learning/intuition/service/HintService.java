package com.ai.education.platform.learning.intuition.service;

import com.ai.education.platform.learning.intuition.dto.HintRequest;
import com.ai.education.platform.learning.intuition.dto.HintResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HintService {

    private final HintPromptBuilder promptBuilder;
    private final ChatClient chatClient;

    public HintResponse generateHint(HintRequest request) {

        String prompt = promptBuilder.build(
                request.problem(),
                request.domain(),
                request.whatUserTried(),
                request.hintLevel()
        );

        String aiResponse = chatClient
                .prompt(prompt)
                .call()
                .content();

        return new HintResponse(aiResponse);


    }
}
