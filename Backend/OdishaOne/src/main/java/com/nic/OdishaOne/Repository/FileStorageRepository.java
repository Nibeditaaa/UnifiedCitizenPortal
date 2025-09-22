package com.nic.OdishaOne.Repository;

import com.nic.OdishaOne.Model.FileEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileStorageRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByGrievanceForm_Id(Long grievanceId);
}
