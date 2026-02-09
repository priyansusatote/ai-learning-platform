package com.ai.education.platform.learning.dailyplan.goal.controller;

import com.ai.education.platform.learning.dailyplan.goal.dto.DailyPlanRequest;
import com.ai.education.platform.learning.dailyplan.goal.dto.DailyPlanResponse;
import com.ai.education.platform.learning.dailyplan.goal.service.DailyPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/daily-plan")
@RequiredArgsConstructor
public class DailyPlanController {

    private final DailyPlanService service;

    @PostMapping
    public DailyPlanResponse generate(
            @Valid @RequestBody DailyPlanRequest request
    ) {
        return new DailyPlanResponse(
                service.generatePlan(request)
        );
    }

}
