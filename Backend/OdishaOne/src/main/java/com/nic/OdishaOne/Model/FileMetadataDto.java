package com.nic.OdishaOne.Model;

public class FileMetadataDto {
    private Long id;
    private String fileName;
    private String fileType;
    private long fileSize;

    public FileMetadataDto(FileEntity f) {
        this.id = f.getId();
        this.fileName = f.getFileName();
        this.fileType = f.getFileType();
        this.fileSize = f.getFileSize();
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public long getFileSize() {
        return fileSize;
    }
}
