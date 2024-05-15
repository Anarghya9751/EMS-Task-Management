package com.example.project.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendProjectDetailsEmail(String projectName, List<String> projectTeamMembers, List<String> projectTestingMembers, String projectDescription, String projectBudget, String projectStartDate,
            String projectEndDate, String numberOfHours, byte[] projectFile, String employeeEmails, String role) {
MimeMessage message = emailSender.createMimeMessage();
MimeMessageHelper helper;
try {
helper = new MimeMessageHelper(message, true);

helper.setTo(employeeEmails);
helper.setSubject("New Project Created: " + projectName);

// HTML content for email body
StringBuilder htmlContentBuilder = new StringBuilder();
htmlContentBuilder.append("<html><body>");
htmlContentBuilder.append("<h2>Project Details</h2>");
htmlContentBuilder.append("<p><strong>Project Name:</strong> ").append(projectName).append("</p>");
htmlContentBuilder.append("<p><strong>Project Description:</strong> ").append(projectDescription).append("</p>");
htmlContentBuilder.append("<p><strong>Project Budget:</strong> ").append(projectBudget).append("</p>");
htmlContentBuilder.append("<p><strong>Project Start Date:</strong> ").append(projectStartDate).append("</p>");
htmlContentBuilder.append("<p><strong>Project End Date:</strong> ").append(projectEndDate).append("</p>");
htmlContentBuilder.append("<p><strong>Number of Hours:</strong> ").append(numberOfHours).append("</p>");

// Highlight project manager's name if their role is "manager"
if ("manager".equalsIgnoreCase(role)) {
htmlContentBuilder.append("<h3>Project Manager</h3>");
htmlContentBuilder.append("<p><strong>").append(String.join("</strong>, <strong>", projectTeamMembers)).append("</strong></p>");
} else {
htmlContentBuilder.append("<h3>Project Team Members</h3>");
htmlContentBuilder.append("<p>").append(String.join(", ", projectTeamMembers)).append("</p>");
}

// Include project testing members
htmlContentBuilder.append("<h3>Project Testing Members</h3>");
htmlContentBuilder.append("<p>").append(String.join(", ", projectTestingMembers)).append("</p>");

htmlContentBuilder.append("</body></html>");

// Set email body as HTML content
helper.setText(htmlContentBuilder.toString(), true);

// Attach project file as PDF
if (projectFile != null && projectFile.length > 0) {
helper.addAttachment("ProjectFile.pdf", new ByteArrayResource(projectFile), "application/pdf");
}

emailSender.send(message);
} catch (MessagingException e) {
e.printStackTrace();
// Handle exception
}
}

}

