package com.example.todo.controller;

import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    
    @Autowired
    private TaskRepository taskRepository;
    
    // 모든 태스크 조회
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@RequestParam(required = false) String userId) {
        List<Task> tasks;
        if (userId != null && !userId.isEmpty()) {
            tasks = taskRepository.findByUserId(userId);
        } else {
            tasks = taskRepository.findAll();
        }
        return ResponseEntity.ok(tasks);
    }
    
    // 태스크 생성
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getUserId() == null || task.getUserId().isEmpty()) {
            task.setUserId("USER_10");
        }
        if (task.getDone() == null) {
            task.setDone(false);
        }
        
        // text가 null이면 에러 반환
        if (task.getText() == null || task.getText().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }
    
    // 태스크 수정
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            if (taskDetails.getText() != null) {
                task.setText(taskDetails.getText());
            }
            if (taskDetails.getDone() != null) {
                task.setDone(taskDetails.getDone());
            }
            Task updatedTask = taskRepository.save(task);
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // 태스크 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


