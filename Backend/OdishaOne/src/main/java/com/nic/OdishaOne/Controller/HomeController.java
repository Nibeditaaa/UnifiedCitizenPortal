package com.nic.OdishaOne.Controller;

import com.nic.OdishaOne.Model.User;
import com.nic.OdishaOne.Model.UserDTO;
import com.nic.OdishaOne.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class HomeController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public String greet(){
        return "Hello World! Welcome to Odisha One";
    }

    @GetMapping("/secret")
    public String getSecret(){
        return "This is my secret";
    }

    @GetMapping("/userProfile")
    public UserDTO getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        return new UserDTO(userService.getUserByEmail(userDetails)); // Returns user details as JSON
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUserDetails(@AuthenticationPrincipal UserDetails userDetails,@RequestBody UserDTO newUserDetails) {
       try{
           User updatedUser = userService.updateUserDetails(userDetails, newUserDetails);
           return new ResponseEntity<>(new UserDTO(updatedUser), HttpStatus.ACCEPTED);
       } catch (Exception e){
           return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       }
    }

    @RequestMapping("/**")
    public ResponseEntity<String> handleUnknownRequests(HttpServletRequest request) {
        String path = request.getRequestURI();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("The endpoint '" + path + "' doesn't exist.");
    }
}
