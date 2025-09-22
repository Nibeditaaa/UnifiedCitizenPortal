package com.nic.OdishaOne.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Announcements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private LocalDate date_posted;
    private String body;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate_posted() {
        return date_posted;
    }

    public void setDate_posted(LocalDate date_posted) {
        this.date_posted = date_posted;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return "Announcements{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date_posted=" + date_posted +
                ", body='" + body + '\'' +
                '}';
    }
}
