package com.ai.education.platform.learning.intuition.dto;

import com.ai.education.platform.learning.enums.HintDomain;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record HintRequest(
        @NotBlank(message = "Problem description is required")
        String problem,

        @NotNull(message = "Domain is required")
        HintDomain domain,

        @NotBlank(message = "What you tried is required")
        String whatUserTried,

        @Min(1) @Max(3)
        int hintLevel
) {
}
