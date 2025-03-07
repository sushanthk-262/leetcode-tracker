package com.leetcode.tracker.controller;

import com.leetcode.tracker.entity.Submission;
import com.leetcode.tracker.repository.SubmissionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {
    private final SubmissionRepository submissionRepository;

    public SubmissionController(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @GetMapping("/{userId}")
    public List<Submission> getUserSubmissions(@PathVariable Long userId) {
        return submissionRepository.findByUserId(userId);
    }

    @PostMapping("/add")
    public Submission addSubmission(@RequestBody Submission submission) {
        return submissionRepository.save(submission);
    }
}