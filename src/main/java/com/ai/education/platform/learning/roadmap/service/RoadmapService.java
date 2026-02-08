package com.ai.education.platform.learning.roadmap.service;

import com.ai.education.platform.learning.enums.LearningLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final ChatClient chatClient;
    private final RoadmapPromptBuilder promptBuilder;

    public String generateRoadmap(String goal, LearningLevel level) {

        String prompt = promptBuilder.buildPrompt(goal, level);

        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }
}
