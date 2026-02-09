package com.ai.education.platform.learning.quiz.controller;

import com.ai.education.platform.learning.quiz.dto.QuizRequest;
import com.ai.education.platform.learning.quiz.dto.QuizResponse;
import com.ai.education.platform.learning.quiz.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @PostMapping
    public QuizResponse generate(
             @RequestBody @Valid QuizRequest request
    ) {
        return quizService.generateQuiz(request);
    }
}

