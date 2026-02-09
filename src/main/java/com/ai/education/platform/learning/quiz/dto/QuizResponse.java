package com.ai.education.platform.learning.quiz.dto;

import java.util.List;

public record QuizResponse(
        List<QuizQuestion> quiz
) {
}
