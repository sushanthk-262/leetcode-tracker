package com.leetcode.tracker.controller;

import com.leetcode.tracker.entity.User;
import com.leetcode.tracker.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        return foundUser.map(u -> "Login Successful").orElse("Invalid credentials");
    }
}