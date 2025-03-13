package com.leetcode.tracker.controller;

import com.leetcode.tracker.service.LeetCodeAuthService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/submissions")
public class SubmissionController {
  private final LeetCodeAuthService authService = new LeetCodeAuthService();

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
    authService.loginToLeetCode(username, password);
    return ResponseEntity.ok("Login successful");
  }

  @GetMapping("/{username}")
  public ResponseEntity<String> getUserSubmissions(@PathVariable String username) {
    String query = String.format(
        """
            {
              "query": "query recentSubmissions($username: String!) { recentSubmissionList(username: $username) { title statusDisplay lang timestamp } }",
              "variables": { "username": "%s" }
            }
            """,
        username);

    HttpHeaders headers = authService.getAuthenticatedHeaders();
    HttpEntity<String> entity = new HttpEntity<>(query, headers);
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<String> response = restTemplate.exchange(
        "https://leetcode.com/graphql",
        HttpMethod.POST,
        entity,
        String.class);

    return ResponseEntity.ok(response.getBody());
  }
}
