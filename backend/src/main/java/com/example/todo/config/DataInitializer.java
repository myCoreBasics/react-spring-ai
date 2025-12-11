package com.example.todo.config;

import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @PostConstruct
    public void init() {
        // 데이터가 없으면 초기 데이터 생성
        if (taskRepository.count() == 0) {
            Task[] initialTasks = {
                new Task(null, "React 기본 문법 익히기", false, "USER_10"),
                new Task(null, "React 컴포넌트 구조 잡기", false, "USER_10"),
                new Task(null, "DB 스키마 정의", false, "USER_10"),
                new Task(null, "AI 기반 영수증 OCR 구매 물품 관리 시스템 실습 프로젝트", false, "USER_10"),
                new Task(null, "API 명세서 작성", false, "USER_10")
            };
            
            for (Task task : initialTasks) {
                taskRepository.save(task);
            }
        }
    }
}

