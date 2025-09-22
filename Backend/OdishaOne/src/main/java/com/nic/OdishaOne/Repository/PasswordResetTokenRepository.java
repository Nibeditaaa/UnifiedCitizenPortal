package com.nic.OdishaOne.Repository;

import com.nic.OdishaOne.Model.PasswordResetToken;
import com.nic.OdishaOne.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);
}
