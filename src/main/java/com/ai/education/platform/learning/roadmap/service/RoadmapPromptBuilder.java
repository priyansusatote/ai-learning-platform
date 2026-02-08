package com.ai.education.platform.learning.roadmap.service;

import com.ai.education.platform.learning.enums.LearningLevel;
import org.springframework.stereotype.Component;

@Component
public class RoadmapPromptBuilder {


    public String buildPrompt(String goal, LearningLevel level) {

        String levelContext = explainLevel(level);

        return """
        You are an expert educator and curriculum designer.

        Create a clear, step-by-step learning roadmap.

        Goal:
        %s

        Learner background:
        %s

        Rules:
        - Output must be structured in Markdown
        - Break roadmap into phases or weeks
        - Each phase should include:
          - What to learn
          - Key topics
          - Expected outcome
        - Do NOT include code or solutions
        - Focus on learning progression, not shortcuts
        - Keep it concise but complete

        Start the roadmap now.
        """.formatted(goal, levelContext);  //formatted(goal, level); will fill the %s in prompt [We pass user input by formatting it into the prompt string, which Spring AI sends as a user message.]
    }

    private String explainLevel(LearningLevel level) {
        return switch (level) {
            case BEGINNER ->
                    "The learner is a complete beginner with no prior knowledge.";
            case INTERMEDIATE ->
                    "The learner knows the basics but lacks depth and practical confidence.";
            case ADVANCED ->
                    "The learner is experienced and wants advanced, in-depth mastery.";
        };
    }
}
