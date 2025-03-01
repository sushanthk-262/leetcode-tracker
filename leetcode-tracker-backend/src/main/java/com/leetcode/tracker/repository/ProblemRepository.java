package com.leetcode.tracker.repository;

import com.leetcode.tracker.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
}