package com.tasks.taskmangement.services;


import java.util.Optional;

import com.tasks.taskmangement.entities.User;



public interface UserService {
    User findById(Long id);
    User saveUser(User user);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    void deleteUser(User user);
}
