package com.nic.OdishaOne.Service;

import com.nic.OdishaOne.Model.PasswordResetToken;
import com.nic.OdishaOne.Model.User;
import com.nic.OdishaOne.Repository.PasswordResetTokenRepository;
import com.nic.OdishaOne.Repository.UserRepo;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordResetTokenRepository PRTRepo;

    @Autowired
    private JavaMailSender mailSender;

    public void emailResetLink(String toEmail, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("nibeditasahoo812@gmail.com");
            message.setTo(toEmail);
            message.setSubject("IMPORTANT: Reset your password");
            message.setText("Click the link to reset your password for OdishaOne:\n" + resetLink);

            mailSender.send(message);
            System.out.println("✅ Mail sent successfully to " + toEmail + " with link: " + resetLink);
        } catch (Exception e) {
            System.err.println("❌ Failed to send mail: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public boolean sendResetLink(String email) {
        User user = userRepo.findByEmail(email);

        if (user == null) {
            return false;
        }

        String token = UUID.randomUUID().toString();
        Optional<PasswordResetToken> existingTokenOpt = PRTRepo.findByUser(user);
        PasswordResetToken resetToken;

        if (existingTokenOpt.isPresent()) {
            // Overwrite token and expiry
            resetToken = existingTokenOpt.get();
            resetToken.setToken(token);
            resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        } else {
            // Create new token
            resetToken = new PasswordResetToken(token, user);
        }

        PRTRepo.save(resetToken);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        // Send email with the link using JavaMailSender
        emailResetLink(email, resetLink);
        return true;
    }

    public ResponseEntity<?> resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = PRTRepo.findByToken(token);

        if (tokenOpt.isEmpty()) {
            return new ResponseEntity<>(Map.of("message", "Invalid token"), HttpStatus.BAD_REQUEST);
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return new ResponseEntity<>(Map.of("message", "Token expired"), HttpStatus.BAD_REQUEST);
        }

        User user = resetToken.getUser();
        user.setPassword(encoder.encode(newPassword));
        userRepo.save(user);

        PRTRepo.delete(resetToken); // remove the token from storage

        return new ResponseEntity<>(Map.of("message", "Password changed successfully."), HttpStatus.OK);
    }

}
