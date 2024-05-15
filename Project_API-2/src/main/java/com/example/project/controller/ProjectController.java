package com.example.project.controller;

import com.example.project.Employee;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import com.example.project.entity.ProjectEntity; 


import com.example.project.service.EmailService;
import com.example.project.service.ProjectService;



import org.springframework.beans.factory.annotation.Autowired;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/projects")
public class ProjectController {

    
    @Autowired
    private ProjectService projectService;
    @Autowired
    private EmailService emailService;
    private RestTemplate restTemplate = new RestTemplate();
    
    @GetMapping("/all")
    public ResponseEntity<List<ProjectEntity>> getAllProjects() {
        List<ProjectEntity> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
   

    @PostMapping("/projects")
    public ResponseEntity<String> createProject(
            @RequestParam("projectName") String projectName,
            @RequestParam("projectTeamMembers") List<String> projectTeamMembers,
            @RequestParam("projectTestingMembers") List<String> projectTestingMembers,
            @RequestParam("projectDescription") String projectDescription,
            @RequestParam("projectBudget") String projectBudget,
            @RequestParam("projectStartDate") String projectStartDate,
            @RequestParam("projectEndDate") String projectEndDate,
            @RequestParam("numberOfHours") String numberOfHours,
            @RequestParam("file") MultipartFile file,
            @RequestParam("ids") List<String> ids
    ) {
    	if (projectService.isProjectNameExists(projectName)) {
    	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Project Name already exists");
    	}
        try {
            // Convert the MultipartFile to bytes
            byte[] fileBytes = file.getBytes();

            // Create a new ProjectEntity object
            ProjectEntity project = new ProjectEntity();
            project.setProjectName(projectName);
            project.setProjectTeamMembers(projectTeamMembers);
            project.setProjectTestingMembers(projectTestingMembers);
            project.setProjectDescription(projectDescription);
            project.setProjectBudget(projectBudget);
            project.setProjectStartDate(projectStartDate);
            project.setProjectEndDate(projectEndDate);
            project.setNumberOfHours(numberOfHours);
            project.setProjectFile(fileBytes);

            // Save the project using the service method
            projectService.createProject(project);
            
            System.out.println(ids);

            // Build the URL with query parameters
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("http://localhost:8081/api-v2/find");
            for (String id : ids) {
                builder.queryParam("ids", id);
            }

            // Make the request using the constructed URL
            ResponseEntity<List<Employee>> responseEntity = restTemplate.exchange(
                    builder.toUriString(),
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Employee>>() {}
            );

            // Get the list of employees from the response body
            List<Employee> employees = responseEntity.getBody();
                        
            System.out.println("team members"+projectTeamMembers);
            System.out.println("team members ide"+ ids);
            

            // Process the list of employees as needed
            // For example:
            employees.forEach(employee -> {
            	System.out.println("email,"+employee.getEmail());
               emailService.sendProjectDetailsEmail(projectName, projectTeamMembers, projectTestingMembers, projectDescription, projectBudget, projectStartDate, projectEndDate,
            		   numberOfHours, fileBytes, employee.getEmail(),employee.getRole());
            });

            return new ResponseEntity<>("Project created successfully", HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to create project: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProjectEntity> getProjectById(@PathVariable("id") Long id) {
        ProjectEntity project = projectService.getProjectById(id);
        if (project != null) {
            return new ResponseEntity<>(project, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProjectEntity> updateProject(@PathVariable("id") Long id, @RequestBody ProjectEntity project) {
        // Check if the project name already exists for other projects
        boolean isExistingProject = projectService.isProjectNameExists(project.getProjectName(), id);
        if (isExistingProject) {
            // A project with the updated name already exists for other projects
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Return conflict status
        }
        
        // Proceed with updating the project
        ProjectEntity updatedProject = projectService.updateProject(id, project);
        if (updatedProject != null) {
            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable("id") Long id) {
        projectService.deleteProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}
