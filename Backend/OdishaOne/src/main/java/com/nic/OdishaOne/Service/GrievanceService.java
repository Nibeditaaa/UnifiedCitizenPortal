// This Java code snippet defines a repository interface `GrievanceFormRepository` that extends
// `JpaRepository` interface provided by Spring Data JPA.
package com.nic.OdishaOne.Service;

import com.nic.OdishaOne.Model.FileEntity;
import com.nic.OdishaOne.Model.FileMetadataDto;
import com.nic.OdishaOne.Model.GrievanceForm;
import com.nic.OdishaOne.Model.GrievanceFormDTO;
import com.nic.OdishaOne.Repository.FileStorageRepository;
import com.nic.OdishaOne.Repository.GrievanceFormRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GrievanceService {

    private final GrievanceFormRepository grievanceFormRepository;

    private final FileStorageRepository fileRepository;

    public Optional<GrievanceForm> findById(Long id) {
        return grievanceFormRepository.findById(id);
    }

    public GrievanceForm save(GrievanceForm grievanceForm, MultipartFile[] files) {
        // if status is not set, enforce default
        if (grievanceForm.getStatus() == null || grievanceForm.getStatus().isEmpty()) {
            grievanceForm.setStatus("Pending");
        }

        return grievanceFormRepository.save(grievanceForm);
    }

    public GrievanceService(GrievanceFormRepository grievanceFormRepository, FileStorageRepository fileRepository) {
        this.grievanceFormRepository = grievanceFormRepository;
        this.fileRepository = fileRepository;
    }

    @Transactional
    public List<GrievanceFormDTO> findAllGrievances() {
        List<GrievanceForm> allGrievances = grievanceFormRepository.findAll();
        System.out.println(allGrievances.getFirst());
        return allGrievances.stream().map(GrievanceFormDTO::new).collect(Collectors.toList());

    }

    @Transactional
    public GrievanceFormDTO findGrievance(Long id) {
        Optional<GrievanceForm> grievance = grievanceFormRepository.findById(id);
        if (grievance.isPresent()) {
            System.out.println(grievance.get());
            return new GrievanceFormDTO(grievance.get());
        }
        return null;
    }

    @Transactional
    public List<FileMetadataDto> findFilesMetaData(Long id) {
        Optional<GrievanceForm> grievance = grievanceFormRepository.findById(id);
        return grievance.map(grievanceForm -> grievanceForm.getFiles().stream().map(FileMetadataDto::new)
                .collect(Collectors.toList())).orElse(null);
    }

    @Transactional
    public Optional<FileEntity> findFileById(Long fileId) {
        return fileRepository.findById(fileId);
    }

    public long countByStatus(String status) {
        return grievanceFormRepository.countByStatus(status);
    }

    public Map<String, Long> getStatusCounts() {
        List<Object[]> rawCounts = grievanceFormRepository.countGrievancesByStatus();

        Map<String, Long> countsFromDb = new HashMap<>();
        for (Object[] row : rawCounts) {
            String status = (String) row[0];
            Long count = (Long) row[1];
            countsFromDb.put(status, count);
        }

        // Ensure all 4 statuses are included
        Map<String, Long> statusCounts = new LinkedHashMap<>();
        statusCounts.put("Pending", countsFromDb.getOrDefault("Pending", 0L));
        statusCounts.put("InProgress", countsFromDb.getOrDefault("InProgress", 0L));
        statusCounts.put("Closed", countsFromDb.getOrDefault("Closed", 0L));
        statusCounts.put("Solved", countsFromDb.getOrDefault("Solved", 0L));

        return statusCounts;
    }

    @Transactional
    public GrievanceForm saveGrievance(GrievanceForm grievanceForm, MultipartFile[] files) throws IOException {
        // Ensure status default
        if (grievanceForm.getStatus() == null || grievanceForm.getStatus().isEmpty()) {
            grievanceForm.setStatus("Pending");
        }

        // Step 1: Save grievance first to get an ID
        GrievanceForm saved = grievanceFormRepository.save(grievanceForm);

        // Step 2: If files are present, link them to the saved grievance
        if (files != null && files.length > 0) {
            List<FileEntity> fileEntities = new ArrayList<>();
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    FileEntity newFile = new FileEntity(file, saved); // link grievance with id
                    fileEntities.add(newFile);
                }
            }

            // Save all files and set them back into the grievance
            fileRepository.saveAll(fileEntities);
            saved.setFiles(fileEntities);
        }

        // Step 3: Save grievance again with files linked
        return grievanceFormRepository.save(saved);
    }

}
