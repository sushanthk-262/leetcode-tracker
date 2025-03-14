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

  @GetMapping("/question/{titleSlug}")
  public ResponseEntity<String> getProblemDetails(@PathVariable String titleSlug) {
    String query = String.format(
        "{ \"query\": \"query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { difficulty } }\", \"variables\": { \"titleSlug\": \"%s\" } }",
        titleSlug);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<String> entity = new HttpEntity<>(query, headers);
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<String> response = restTemplate.exchange(
        "https://leetcode.com/graphql", HttpMethod.POST, entity, String.class);

    return ResponseEntity.ok(response.getBody());
  }

  @GetMapping("/submission-detail/{submissionId}")
  public ResponseEntity<String> getSubmissionDetail(@PathVariable String submissionId) {
    String query = String.format(
        "{ \"query\": \"query submissionDetail($submissionId: ID!) { submissionDetail(submissionId: $submissionId) { code } }\", \"variables\": { \"submissionId\": \"%s\" } }",
        submissionId);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<String> entity = new HttpEntity<>(query, headers);
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<String> response = restTemplate.exchange(
        "https://leetcode.com/graphql", HttpMethod.POST, entity, String.class);

    return ResponseEntity.ok(response.getBody());
  }

}