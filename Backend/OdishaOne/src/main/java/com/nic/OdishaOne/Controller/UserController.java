package com.nic.OdishaOne.Controller;

import com.nic.OdishaOne.Model.User;
import com.nic.OdishaOne.Service.JwtService;
import com.nic.OdishaOne.Service.PasswordResetService;
import com.nic.OdishaOne.Service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class UserController {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    PasswordResetService PRService;

    @GetMapping("/test")
    public String test(){
        return "Test Success";
    }

    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {

        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        if (auth.isAuthenticated()) {
            String jwtToken = jwtService.generateToken(user.getEmail(), user.getPassword());
            ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtToken)
                    .httpOnly(true)       // Secure against XSS
                    .secure(false)         // Only send over HTTPS (Set to true when in production)
                    .sameSite("Strict")   // CSRF protection
                    .path("/")            // Available across the app
                    .maxAge(3600)         // 1-hour expiration
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

            return ResponseEntity.ok("Login successful");
        }

        return new ResponseEntity<>("Authentication Failed", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/Register")
    public ResponseEntity<?> register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userService.saveUser(user);
        if (savedUser != null) {
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Registration Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        return ResponseEntity.ok("Valid token");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        if(PRService.sendResetLink(email)){
            return new ResponseEntity<>(Map.of("message", "Reset link sent"),HttpStatus.OK);
        }
        return new ResponseEntity<>(Map.of("message", "Email not found"), HttpStatus.NOT_FOUND);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");



        return PRService.resetPassword(token, newPassword);
    }
}
