
package com.tasks.taskmangement.DTO;
import java.time.LocalDate;

import com.tasks.taskmangement.entities.Task;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private String priority;
    private String status;
    private LocalDate dueDate;
    private Long userId;

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.priority = task.getPriority();
        this.status = task.getStatus();
        this.dueDate = task.getDueDate();
        this.userId = task.getUser().getId();
    }

    // Getters and setters
}
