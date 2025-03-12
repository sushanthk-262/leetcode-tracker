package com.leetcode.tracker.controller;

import com.leetcode.tracker.service.LeetCodeAuthService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {
  // Create an instance of the authentication service.
  private final LeetCodeAuthService authService = new LeetCodeAuthService();

  // Endpoint to log in to LeetCode and store the session cookies.
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
    authService.loginToLeetCode(username, password);
    return ResponseEntity.ok("Login successful");
  }

  // Endpoint to fetch submissions for a given LeetCode username.
  @GetMapping("/{username}")
    public ResponseEntity<String> getUserSubmissions(@PathVariable String username) {
        String query = """
        {
          "query": "query recentSubmissions($username: String!) { recentSubmissionList(username: $username) { title statusDisplay lang timestamp } }",
          "variables": { "username": \"""" + username + """\" }
        }""";

  HttpHeaders headers = authService.getAuthenticatedHeaders();
  HttpEntity<String> entity = new HttpEntity<>(query, headers);
  RestTemplate restTemplate = new RestTemplate();

  ResponseEntity<String> response = restTemplate.exchange("https://leetcode.com/graphql", HttpMethod.POST, entity, String.class);return ResponseEntity.ok(response.getBody());
}}
