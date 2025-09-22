package com.nic.OdishaOne.Controller;

import com.nic.OdishaOne.Model.FileEntity;
import com.nic.OdishaOne.Model.FileMetadataDto;
import com.nic.OdishaOne.Model.GrievanceForm;
import com.nic.OdishaOne.Model.GrievanceFormDTO;
import com.nic.OdishaOne.Service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
public class GrievanceController {

    @Autowired
    GrievanceService grievanceService;

    @PostMapping("/newGrievance")
    public ResponseEntity<?> handleGrievance(@RequestPart(value = "files", required = false) MultipartFile[] files,
            @RequestPart("data") GrievanceForm data) {
        try {
            // Save grievance details and file paths to DB if needed
            GrievanceForm newGrievance = grievanceService.saveGrievance(data, files);
            return ResponseEntity.ok(newGrievance);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed.");
        }
    }

    @GetMapping("/getAllGrievances")
    public ResponseEntity<List<GrievanceFormDTO>> getAllGrievances() {
        List<GrievanceFormDTO> grievances = grievanceService.findAllGrievances();
        return ResponseEntity.ok(grievances);
    }

    @GetMapping("/getGrievance/{id}")
    public ResponseEntity<?> getAllGrievances(@PathVariable Long id) {
        GrievanceFormDTO grievances = grievanceService.findGrievance(id);
        if (grievances != null) {
            return ResponseEntity.ok(grievances);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot get grievance with id: " + id);
    }

    @GetMapping("/grievance/getFileMetaData/{id}")
    public ResponseEntity<?> listFiles(@PathVariable Long id) {
        List<FileMetadataDto> fileMetadataDtos = grievanceService.findFilesMetaData(id);
        if (fileMetadataDtos != null) {
            return new ResponseEntity<>(fileMetadataDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/grievance/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String rejectionReason) {

        Optional<GrievanceForm> grievanceOpt = grievanceService.findById(id);
        if (grievanceOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Grievance not found with id: " + id);
        }

        GrievanceForm grievance = grievanceOpt.get();
        grievance.setStatus(status);

        if ("Closed".equalsIgnoreCase(status)) {
            grievance.setRejectionReason(rejectionReason);
        }

        grievanceService.save(grievance, null); // save updated record

        return ResponseEntity.ok("Grievance status updated successfully.");
    }

    @GetMapping("/grievance/downloadFile/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable Long fileId) {
        Optional<FileEntity> fileEntityOpt = grievanceService.findFileById(fileId);

        if (fileEntityOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File not found with id: " + fileId);
        }

        FileEntity fileEntity = fileEntityOpt.get();

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + fileEntity.getFileName() + "\"")
                .header("Content-Type", fileEntity.getFileType())
                .body(fileEntity.getData()); // byte[]
    }

    @GetMapping("/grievance/statusCounts")
    public ResponseEntity<?> getStatusCounts() {
        return ResponseEntity.ok(grievanceService.getStatusCounts());
    }

    @PostMapping("/saveGrievance")
    public ResponseEntity<GrievanceForm> saveGrievance(@RequestBody GrievanceForm form) {
        if (form.getStatus() == null || form.getStatus().isEmpty()) {
            form.setStatus("Pending"); // ensure default
        }
        GrievanceForm saved = grievanceService.save(form, null); // 👈 use service, not repo
        return ResponseEntity.ok(saved);
    }

}
