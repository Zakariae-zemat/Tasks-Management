package com.tasks.taskmangement.services;

import java.util.List;

import com.tasks.taskmangement.entities.Task;

public interface TaskService {
    Task saveTask(Task task);
    List<Task> findTasksByUserId(Long userId);
    Task getTaskById(Long id);
    Task updateTask(Task task);
    void deleteTask(Long id);
}
