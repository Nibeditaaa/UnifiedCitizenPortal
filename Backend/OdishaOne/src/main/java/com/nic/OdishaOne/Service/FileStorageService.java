package com.nic.OdishaOne.Service;

import com.nic.OdishaOne.Model.FileEntity;
import com.nic.OdishaOne.Repository.FileStorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@Service
public class FileStorageService {

    @Autowired
    private final FileStorageRepository fileStorageRepository;

    public FileStorageService(FileStorageRepository fileStorageRepository) {
        this.fileStorageRepository = fileStorageRepository;
    }

    public FileEntity storeFile(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setData(file.getBytes());
        return fileStorageRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(Long fileId) {
        return fileStorageRepository.findById(fileId);
    }
}
