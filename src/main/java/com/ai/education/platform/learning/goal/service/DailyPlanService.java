package com.ai.education.platform.learning.goal.service;

import com.ai.education.platform.learning.goal.dto.DailyPlanRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyPlanService {

    private final ChatClient chatClient;
    private final DailyPlanPromptBuilder promptBuilder;

    public String generatePlan(DailyPlanRequest request){

        String prompt = promptBuilder.build(
                request.goal(),
                request.level(),
                request.days(),
                request.dailyHours()
        );

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}
