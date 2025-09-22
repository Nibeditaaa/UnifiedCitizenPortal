package com.nic.OdishaOne.Service;

import com.nic.OdishaOne.Model.Announcements;
import com.nic.OdishaOne.Repository.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    AnnouncementRepo repo;

    public List<Announcements> getAllAnnouncements() {
        return repo.findAll();
    }

    public Announcements addAnnouncement(Announcements a){
        a.setDate_posted(LocalDate.now());
        return repo.save(a);
    }

    public Announcements updateAnnouncement(Announcements a){
        a.setDate_posted(LocalDate.now());
        return repo.save(a);
    }

    public void deleteAnnouncement(int id){
        repo.deleteById(id);
    }
}
