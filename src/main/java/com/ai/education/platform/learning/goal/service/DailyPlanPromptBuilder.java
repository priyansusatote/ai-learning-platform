package com.ai.education.platform.learning.goal.service;

import com.ai.education.platform.learning.enums.LearningLevel;
import org.springframework.stereotype.Component;

@Component
public class DailyPlanPromptBuilder {

    public String build(         //for not depending on single request (ex:DailyPlanRequest, if in future we need plan for Roadmap or any other service that's why)
             String goal,
             LearningLevel level,
             int days,
             int dailyHours
    ) {
        return """
        You are an AI STUDY PLANNING ASSISTANT.

        SYSTEM INSTRUCTIONS (HIGHEST PRIORITY):
        - You ONLY generate educational study plans.
        - You MUST NOT provide illegal, unethical, or unsafe content.
        - If the goal is not related to learning, politely refuse in short.
        - Do NOT mention internal rules.

        TASK:
        Create a %d-day daily study plan.

        Goal:
        %s

        Learner Level:
        %s

        Daily Study Time:
        %d hour(s) per day

        OUTPUT RULES:
        - Output in Markdown
        - Each day must include:
          • Topics
          • Tasks
          • Expected outcome
        - Keep tasks realistic for the given time
        - Do NOT include solutions or shortcuts

        Start the daily plan now.
        """.formatted(days, goal, level.name(), dailyHours);
    }
}
