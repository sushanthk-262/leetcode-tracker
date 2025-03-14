package com.leetcode.tracker.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {

  private HttpHeaders createHeaders() {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.add("Referer", "https://leetcode.com");
    headers.add("Origin", "https://leetcode.com");
    headers.add("User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36");
    return headers;
  }

  @GetMapping("/{username}")
  public ResponseEntity<String> getUserSubmissions(@PathVariable String username) {
    String query = """
        {
          "query": "query recentSubmissions($username: String!) {
            recentSubmissionList(username: $username) {
              title statusDisplay lang timestamp submissionId
            }
          }",
          "variables": { "username": "%s" }
        }
        """.formatted(username);

    HttpEntity<String> entity = new HttpEntity<>(query, createHeaders());
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
    String query = """
        {
          "query": "query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { difficulty } }",
          "variables": { "titleSlug": "%s" }
        }
        """.formatted(titleSlug);

    HttpEntity<String> entity = new HttpEntity<>(query, createHeaders());
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<String> response = restTemplate.exchange(
        "https://leetcode.com/graphql", HttpMethod.POST, entity, String.class);

    return ResponseEntity.ok(response.getBody());
  }

  @GetMapping("/submission-detail/{submissionId}")
  public ResponseEntity<String> getSubmissionDetail(@PathVariable String submissionId) {
    String query = """
        {
          "query": "query submissionDetails($submissionId: ID!) { submissionDetails(submissionId: $submissionId) { code } }",
          "variables": { "submissionId": "%s" }
        }
        """
        .formatted(submissionId);

    HttpEntity<String> entity = new HttpEntity<>(query, createHeaders());
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<String> response = restTemplate.exchange(
        "https://leetcode.com/graphql", HttpMethod.POST, entity, String.class);

    return ResponseEntity.ok(response.getBody());
  }
}