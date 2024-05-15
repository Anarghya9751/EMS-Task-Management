package com.example.project.service;

import com.example.project.entity.ProjectEntity;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    ProjectEntity createProject(ProjectEntity project);

    ProjectEntity getProjectById(Long id);

    List<ProjectEntity> getAllProjects();

    ProjectEntity updateProject(Long id, ProjectEntity project);

    void deleteProject(Long id);
    public boolean isProjectNameExists(String projectName);
    public boolean isProjectNameExists(String projectName, Long currentProjectId);
}