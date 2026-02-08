package com.ai.education.platform.learning.roadmap.dto;

import com.ai.education.platform.learning.enums.LearningLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoadmapRequest(
        @NotBlank(message = "Goal is required")
        String goal,
        @NotNull(message = "Learning Level is required")
        LearningLevel level
) {
}
