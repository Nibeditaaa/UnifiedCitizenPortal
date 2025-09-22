package com.nic.OdishaOne.Service;

import com.nic.OdishaOne.Model.User;
import com.nic.OdishaOne.Model.UserDTO;
import com.nic.OdishaOne.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public User saveUser(User user){
        return repo.save(user);
    }

    public User getUserByEmail(UserDetails user) {
        return repo.findByEmail(user.getUsername());
    }

    public User updateUserDetails(UserDetails user, UserDTO newUserDetails) {
//        User oldUser = repo.findByEmail(user.getUsername());
//
//        User newUser = new User(newUserDetails);
//        newUser.setEmail(oldUser.getEmail());
//        newUser.setPassword(oldUser.getPassword());
//
//        return repo.save(newUser);
        // Fetch the existing user by email
        User existingUser = repo.findByEmail(user.getUsername());

        if (existingUser == null) {
            throw new RuntimeException("User not found with email: " + user.getUsername());
        }

        // Update fields with new details
        existingUser.setFirstName(newUserDetails.getFirstName());
        existingUser.setLastName(newUserDetails.getLastName());
        existingUser.setPhoneNumber(newUserDetails.getPhoneNumber());

        // Save the updated user
        return repo.save(existingUser);
    }
}
