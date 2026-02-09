package com.ai.education.platform.learning.quiz.dto;

import com.ai.education.platform.learning.enums.LearningLevel;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record QuizRequest(

        @NotBlank(message = "Topic is required")
        String topic,

        @NotNull(message = "Level is required")
        LearningLevel level,

        @Min(value = 1, message = "Minimum 1 question required")
        @Max(value = 10, message = "Maximum 10 questions allowed")
        int questionCount
) {}