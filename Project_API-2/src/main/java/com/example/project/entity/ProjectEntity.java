package com.example.project.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "project_table")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String projectName;
  
    
    @Column(nullable = false)
    private List<String> projectTeamMembers;
    
    
    @Column(nullable = false)
    private List<String> projectTestingMembers;
    
    
    private String projectDescription;
    private String projectBudget;
    private String projectStartDate;
    private String projectEndDate;
    private String numberOfHours;
    @Lob
    @Column(name = "project_file", columnDefinition = "MEDIUMBLOB")
    private byte[] projectFile;
    
    
    
//    @Lob
//    @Column(name = "file_data")
//    private byte[] fileData;


    // Constructors, getters, and setters
    
    	
    
	public ProjectEntity( String projectName, List<String> projectTeamMembers,
			List<String> projectTestingMembers, String projectDescription, String projectBudget,
			String projectStartDate, String projectEndDate, String numberOfHours, byte[] projectFile, String fileName,
			byte[] file, String filePath) {
		super();
		
		this.projectName = projectName;
		this.projectTeamMembers = projectTeamMembers;
		this.projectTestingMembers = projectTestingMembers;
		this.projectDescription = projectDescription;
		this.projectBudget = projectBudget;
		this.projectStartDate = projectStartDate;
		this.projectEndDate = projectEndDate;
		this.numberOfHours = numberOfHours;
		this.projectFile = projectFile;
		
	}
	public ProjectEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public byte[] getProjectFile() {
		return projectFile;
	}
	public void setProjectFile(byte[] projectFile) {
		this.projectFile = projectFile;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public List<String> getProjectTeamMembers() {
		return projectTeamMembers;
	}
	public void setProjectTeamMembers(List<String> projectTeamMembers) {
		this.projectTeamMembers = projectTeamMembers;
	}
	public String getProjectDescription() {
		return projectDescription;
	}
	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}
	public String getProjectBudget() {
		return projectBudget;
	}
	public void setProjectBudget(String projectBudget) {
		this.projectBudget = projectBudget;
	}
	public String getProjectStartDate() {
		return projectStartDate;
	}
	public void setProjectStartDate(String projectStartDate) {
		this.projectStartDate = projectStartDate;
	}
	public String getProjectEndDate() {
		return projectEndDate;
	}
	public void setProjectEndDate(String projectEndDate) {
		this.projectEndDate = projectEndDate;
	}
	public String getNumberOfHours() {
		return numberOfHours;
	}
	public void setNumberOfHours(String numberOfHours) {
		this.numberOfHours = numberOfHours;
	}
	public List<String> getProjectTestingMembers() {
		return projectTestingMembers;
	}
	public void setProjectTestingMembers(List<String> projectTestingMembers) {
		this.projectTestingMembers = projectTestingMembers;
	}
//	public void setUserId(Long userId) {
//		// TODO Auto-generated method stub
//		
//	}
//	public List<ProjectEntity> getProjects() {
//		// TODO Auto-generated method stub
//		return null;
//	}
    
   
//	public byte[] getFileData() {
//        return fileData;
//    }
//
//    public void setFileData(byte[] fileData) {
//        this.fileData = fileData;
//    }
//	public void setFile(byte[] fileBytes) {
//		// TODO Auto-generated method stub
//		
//	}
    
	
	


	
	

	

	
	  


	
}