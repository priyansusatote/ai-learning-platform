package com.ai.education.platform.learning.quiz.dto;

import java.util.List;

public record QuizQuestion(
        String question,
        List<String> options,
        int correctAnswerIndex
) {
}
