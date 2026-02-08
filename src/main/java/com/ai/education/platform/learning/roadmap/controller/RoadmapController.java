package com.ai.education.platform.learning.roadmap.controller;

import com.ai.education.platform.learning.roadmap.dto.RoadmapRequest;
import com.ai.education.platform.learning.roadmap.dto.RoadmapResponse;
import com.ai.education.platform.learning.roadmap.service.RoadmapService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roadmap")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService roadmapService;

    @PostMapping
    public RoadmapResponse generate(@RequestBody @Valid RoadmapRequest request){

        String roadmap = roadmapService.generateRoadmap( //we get llm response in String
                request.goal(),
                request.level()
        );

        return new RoadmapResponse(roadmap);
    }
}
