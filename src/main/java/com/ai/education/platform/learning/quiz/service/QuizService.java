package com.ai.education.platform.learning.quiz.service;

import com.ai.education.platform.learning.quiz.dto.QuizRequest;
import com.ai.education.platform.learning.quiz.dto.QuizResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final ChatClient chatClient;
    private final QuizPromptBuilder promptBuilder;
    private final ObjectMapper objectMapper;

    public QuizResponse generateQuiz(QuizRequest request) {
        String prompt = promptBuilder.build(
                request.topic(),
                request.level(),
                request.questionCount()
        );

        String aiResponse = chatClient
                .prompt(prompt)
                .call()
                .content();

        //Use ObjectMapper to convert AI JSON strings into typed Java objects.
        try { //It converts a JSON string into Java objects.[ AI response = String ,Controller response = Java object, Spring converts Java → JSON automatically
            return objectMapper.readValue(aiResponse, QuizResponse.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to parse quiz response", e);
        }

    }
}
