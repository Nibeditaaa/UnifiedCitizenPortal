package com.nic.OdishaOne.Repository;

import com.nic.OdishaOne.Model.Announcements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepo extends JpaRepository<Announcements, Integer> {
}
