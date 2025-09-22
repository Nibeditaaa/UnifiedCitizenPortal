package com.nic.OdishaOne.Model;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Entity
@Table(name = "files")
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] fileData;

    private String fileName;
    private String fileType;
    private long fileSize;

    @Lob
    @Column(name = "data")
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "grievance_form_id", nullable = false)
    private GrievanceForm grievanceForm;

    public FileEntity() {
    }

    public FileEntity(MultipartFile file, GrievanceForm grievanceForm) throws IOException {
        this.setFileName(file.getOriginalFilename());
        this.setFileType(file.getContentType());
        this.setFileSize(file.getSize());
        this.setData(file.getBytes());
        this.setGrievanceForm(grievanceForm);
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public GrievanceForm getGrievanceForm() {
        return grievanceForm;
    }

    public void setGrievanceForm(GrievanceForm grievanceForm) {
        this.grievanceForm = grievanceForm;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "FileEntity{" +
                "id=" + id +
                ", fileName='" + fileName + '\'' +
                ", fileType='" + fileType + '\'' +
                ", fileSize=" + fileSize +
                ", grievanceForm=" + grievanceForm +
                '}';
    }
}
