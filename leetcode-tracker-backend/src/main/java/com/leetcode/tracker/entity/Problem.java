package com.leetcode.tracker.entity;

import jakarta.persistence.*;

@Entity
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String difficulty;
    private String status;
    // Getters and Setters
}