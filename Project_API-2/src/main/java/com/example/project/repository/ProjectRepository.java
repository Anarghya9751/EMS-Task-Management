



package com.example.project.repository;

import com.example.project.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
	ProjectEntity findByProjectName(String projectName);
    // You can add custom query methods if needed

	boolean existsByProjectNameAndIdNot(String projectName, Long currentProjectId);
}
