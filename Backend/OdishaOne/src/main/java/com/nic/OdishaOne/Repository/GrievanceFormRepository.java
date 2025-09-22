package com.nic.OdishaOne.Repository;

import com.nic.OdishaOne.Model.GrievanceForm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GrievanceFormRepository extends JpaRepository<GrievanceForm, Long> {
    GrievanceForm findByEmail(String Email);

    long countByStatus(String status);
    // List<GrievanceFormDTO> findAllProjectedBy();

    @Query("SELECT g.status, COUNT(g) FROM GrievanceForm g GROUP BY g.status")
    List<Object[]> countGrievancesByStatus();
}
