package com.leetcode.tracker.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class LeetCodeAuthService {
    private static final String LOGIN_URL = "https://leetcode.com/accounts/login/";
    private String csrfToken;
    private String sessionCookie;

    public void loginToLeetCode(String username, String password) {
        RestTemplate restTemplate = new RestTemplate();

        // 1. Fetch CSRF Token by performing a GET request to the login page
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0");
        ResponseEntity<String> response = restTemplate.exchange(LOGIN_URL, HttpMethod.GET, new HttpEntity<>(headers),
                String.class);

        csrfToken = extractCsrfToken(response);
        sessionCookie = extractSessionCookie(response);

        // 2. Perform login by sending username and password
        Map<String, String> loginData = new HashMap<>();
        loginData.put("login", username);
        loginData.put("password", password);

        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Cookie", "csrftoken=" + csrfToken);
        headers.set("X-CSRFToken", csrfToken);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(loginData, headers);
        ResponseEntity<String> loginResponse = restTemplate.exchange(LOGIN_URL, HttpMethod.POST, entity, String.class);

        // Store updated session cookie after login
        sessionCookie = extractSessionCookie(loginResponse);
    }

    private String extractCsrfToken(ResponseEntity<String> response) {
        List<String> cookies = response.getHeaders().get("Set-Cookie");
        if (cookies != null) {
            for (String cookie : cookies) {
                if (cookie.startsWith("csrftoken=")) {
                    return cookie.split(";")[0].split("=")[1];
                }
            }
        }
        return null;
    }

    private String extractSessionCookie(ResponseEntity<String> response) {
        List<String> cookies = response.getHeaders().get("Set-Cookie");
        if (cookies != null) {
            for (String cookie : cookies) {
                if (cookie.startsWith("LEETCODE_SESSION=")) {
                    return cookie.split(";")[0].split("=")[1];
                }
            }
        }
        return null;
    }

    public HttpHeaders getAuthenticatedHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0");
        headers.set("Cookie", "csrftoken=" + csrfToken + "; LEETCODE_SESSION=" + sessionCookie);
        headers.set("X-CSRFToken", csrfToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
