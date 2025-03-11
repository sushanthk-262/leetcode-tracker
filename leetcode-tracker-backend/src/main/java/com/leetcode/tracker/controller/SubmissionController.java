package com.leetcode.tracker.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {

    private static final String LEETCODE_API_URL = "https://leetcode.com/graphql";

    @GetMapping("/{username}")
    public ResponseEntity<String> getUserSubmissions(@PathVariable String username) {
        String query = """
                {
                  "query": "query recentSubmissions($username: String!) { recentSubmissionList(username: $username) { title statusDisplay lang timestamp } }",
                  "variables": { "username": \"" + username + "\" }
                }
                """;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(query, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(LEETCODE_API_URL, HttpMethod.POST, entity,
                String.class);

        return ResponseEntity.ok(response.getBody());
    }
}