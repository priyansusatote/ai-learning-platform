package com.ai.education.platform.learning.intuition.controller;

import com.ai.education.platform.learning.intuition.dto.HintRequest;
import com.ai.education.platform.learning.intuition.dto.HintResponse;
import com.ai.education.platform.learning.intuition.service.HintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/intuition/hint")
public class HintController {

    private final HintService hintService;

    @PostMapping
    public HintResponse getHint(@RequestBody @Valid HintRequest request){
        return hintService.generateHint(request);
    }
}
