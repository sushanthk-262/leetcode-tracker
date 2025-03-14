package com.leetcode.tracker.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {
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

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
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