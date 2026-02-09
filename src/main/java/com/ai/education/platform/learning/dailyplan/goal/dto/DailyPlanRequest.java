package com.ai.education.platform.learning.dailyplan.goal.dto;

import com.ai.education.platform.learning.enums.LearningLevel;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DailyPlanRequest(
        @NotBlank String goal,
        @NotNull LearningLevel level,
        @Min(1) int days,
        @Min(1) int dailyHours

        ) {
}
