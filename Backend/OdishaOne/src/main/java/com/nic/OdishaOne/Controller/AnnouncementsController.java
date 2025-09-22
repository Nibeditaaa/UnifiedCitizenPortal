package com.nic.OdishaOne.Controller;

import com.nic.OdishaOne.Model.Announcements;
import com.nic.OdishaOne.Service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AnnouncementsController {

    @Autowired
    AnnouncementService announcementService;

    @GetMapping("/getAnnouncement")
    public ResponseEntity<?> getAnnouncements(){
        return new ResponseEntity<>(announcementService.getAllAnnouncements(), HttpStatus.OK);
    }

    @PostMapping("/addAnnouncement")
    public ResponseEntity<?> addAnnouncements(@RequestBody Announcements a){
        return new ResponseEntity<>(announcementService.addAnnouncement(a),HttpStatus.CREATED);
    }

    @PutMapping("/updateAnnouncement")
    public ResponseEntity<?> updateAnnouncements(@RequestBody Announcements a){
        return new ResponseEntity<>(announcementService.updateAnnouncement(a),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/deleteAnnouncement/{id}")
    public ResponseEntity<?> deleteAnnouncements(@PathVariable int id){
        announcementService.deleteAnnouncement(id);
        return new ResponseEntity<>("Announcement is deleted",HttpStatus.ACCEPTED);
    }
}
