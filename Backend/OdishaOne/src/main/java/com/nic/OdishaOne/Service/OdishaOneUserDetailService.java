package com.nic.OdishaOne.Service;

import com.nic.OdishaOne.Model.User;
import com.nic.OdishaOne.Model.UserPrincipal;
import com.nic.OdishaOne.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class OdishaOneUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepo repo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try{
            User user = repo.findByEmail(email);
            if (user == null){
                System.out.println("User Not Found");
                throw new UsernameNotFoundException("User Not Found !!!");
            } else{
                System.out.println(user);
                return new UserPrincipal(user);
            }
        } catch(Exception e){
            System.out.println("**********ERROR**********");
            System.out.println(e.getMessage());
        }
        return null;
    }
}
