package com.tasks.taskmangement.services;


import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tasks.taskmangement.entities.User;
import com.tasks.taskmangement.repositories.UserRepository;



@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String usename) {
        return userRepository.findByUsername(usename);
    }

    @Override
    public void deleteUser(User user) {
        try {
            userRepository.delete(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
