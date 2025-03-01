package com.leetcode.tracker.controller;

import com.leetcode.tracker.entity.Problem;
import com.leetcode.tracker.repository.ProblemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/problems")
public class ProblemController {
    private final ProblemRepository repository;
    public ProblemController(ProblemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return repository.findAll();
    }
}