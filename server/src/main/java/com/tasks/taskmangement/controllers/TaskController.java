package com.tasks.taskmangement.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasks.taskmangement.DTO.TaskDTO;
import com.tasks.taskmangement.entities.Task;
import com.tasks.taskmangement.services.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.saveTask(task));
    }

    @GetMapping("/{userId}")
    public List<TaskDTO> getUserTasks(@PathVariable Long userId) {
        List<Task> tasks = taskService.findTasksByUserId(userId);
        return tasks.stream().map(TaskDTO::new).collect(Collectors.toList());
    }


    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task existingTask = taskService.getTaskById(id);
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        if (updatedTask.getTitle() != null) existingTask.setTitle(updatedTask.getTitle());
        if (updatedTask.getDescription() != null) existingTask.setDescription(updatedTask.getDescription());
        if (updatedTask.getPriority() != null) existingTask.setPriority(updatedTask.getPriority());
        if (updatedTask.getStatus() != null) existingTask.setStatus(updatedTask.getStatus());
        if (updatedTask.getDueDate() != null) existingTask.setDueDate(updatedTask.getDueDate());

        Task savedTask = taskService.updateTask(existingTask);

        // Convert to DTO before returning
        TaskDTO taskDTO = new TaskDTO(savedTask);
        return ResponseEntity.ok(taskDTO);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}

