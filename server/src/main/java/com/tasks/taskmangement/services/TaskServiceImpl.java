package com.tasks.taskmangement.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tasks.taskmangement.entities.Task;
import com.tasks.taskmangement.repositories.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> findTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }


    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
