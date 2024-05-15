



package com.example.project.repository;

import com.example.project.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<ProjectEntity, Long> {
    // You can define custom query methods here if needed
}

