package com.nic.OdishaOne.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class GrievanceForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String addressLine1;

    private String addressLine2;

    private String landmark;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private Integer pinCode;

    @Column(nullable = false)
    private String grievanceType;

    @Column(nullable = false)
    private String subType1;

    @Column(nullable = false)
    private String subType2;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String status = "Pending";

    @OneToMany(mappedBy = "grievanceForm", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FileEntity> files;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getPinCode() {
        return pinCode;
    }

    public void setPinCode(Integer pinCode) {
        this.pinCode = pinCode;
    }

    public String getGrievanceType() {
        return grievanceType;
    }

    public void setGrievanceType(String grievanceType) {
        this.grievanceType = grievanceType;
    }

    public String getSubType1() {
        return subType1;
    }

    public void setSubType1(String subType1) {
        this.subType1 = subType1;
    }

    public String getSubType2() {
        return subType2;
    }

    public void setSubType2(String subType2) {
        this.subType2 = subType2;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<FileEntity> getFiles() {
        return files;
    }

    public void setFiles(List<FileEntity> files) {
        this.files = files;
    }

    @Column(length = 1000)
    private String rejectionReason;

    // getters and setters for new fields
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    @Override
    public String toString() {
        return "GrievanceForm{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", addressLine1='" + addressLine1 + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", landmark='" + landmark + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", pinCode=" + pinCode +
                ", grievanceType='" + grievanceType + '\'' +
                ", subType1='" + subType1 + '\'' +
                ", subType2='" + subType2 + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", id=" + id +
                '}';
    }
}
