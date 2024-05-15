package com.example.project.service;

import com.example.project.entity.ProjectEntity;

import com.example.project.repository.ProjectRepository;

import jakarta.persistence.EntityNotFoundException;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public ProjectEntity createProject(ProjectEntity project) {
        return projectRepository.save(project);
    }

    @Override
    public ProjectEntity getProjectById(Long id) {
        Optional<ProjectEntity> optionalProject = projectRepository.findById(id);
        return optionalProject.orElse(null);
    }

    @Override
    public List<ProjectEntity> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public ProjectEntity updateProject(Long id, ProjectEntity project) {
        Optional<ProjectEntity> existingProjectOptional = projectRepository.findById(id);
        if (existingProjectOptional.isPresent()) {
            ProjectEntity existingProject = existingProjectOptional.get();
            
            // Update project fields if they are not null in the incoming project object
            if (project.getProjectName() != null) {
                existingProject.setProjectName(project.getProjectName());
            }
            if (project.getProjectTeamMembers() != null) {
                existingProject.setProjectTeamMembers(project.getProjectTeamMembers());
            }
            if (project.getProjectTestingMembers() != null) {
                existingProject.setProjectTestingMembers(project.getProjectTestingMembers());
            }
            if (project.getProjectDescription() != null) {
                existingProject.setProjectDescription(project.getProjectDescription());
            }
            if (project.getProjectBudget() != null) {
                existingProject.setProjectBudget(project.getProjectBudget());
            }
            if (project.getProjectStartDate() != null) {
                existingProject.setProjectStartDate(project.getProjectStartDate());
            }
            if (project.getProjectEndDate() != null) {
                existingProject.setProjectEndDate(project.getProjectEndDate());
            }
            if (project.getNumberOfHours() != null) {
                existingProject.setNumberOfHours(project.getNumberOfHours());
            }
            
            // Update projectFile if it's null
            if (project.getProjectFile() == null) {
                project.setProjectFile(existingProject.getProjectFile());
            }
            
            existingProject.setId(id); // Set the ID for the updated project
            return projectRepository.save(existingProject);
        } else {
            return null; // Return null if project with given ID is not found
        }
    }


    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    @Override
    public boolean isProjectNameExists(String projectName) {
    	ProjectEntity existingProject = projectRepository.findByProjectName(projectName);
        return existingProject != null;
    }
    public boolean isProjectNameExists(String projectName, Long currentProjectId) {
        // Check if any project with the given name exists except the current project
        return projectRepository.existsByProjectNameAndIdNot(projectName, currentProjectId);
    }

}
