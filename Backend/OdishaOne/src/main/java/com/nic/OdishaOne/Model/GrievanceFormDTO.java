package com.nic.OdishaOne.Model;

public class GrievanceFormDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String landmark;
    private String city;
    private String state;
    private Integer pinCode;
    private String grievanceType;
    private String subType1;
    private String subType2;
    private String description;
    private String status;
    private Integer numberOfFiles;
    private String rejectionReason;

    public GrievanceFormDTO(GrievanceForm g) {
        this.id = g.getId();
        this.fullName = g.getFullName();
        this.email = g.getEmail();
        this.phone = g.getPhone();
        this.addressLine1 = g.getAddressLine1();
        this.addressLine2 = g.getAddressLine2();
        this.landmark = g.getLandmark();
        this.city = g.getCity();
        this.state = g.getState();
        this.pinCode = g.getPinCode();
        this.grievanceType = g.getGrievanceType();
        this.subType1 = g.getSubType1();
        this.subType2 = g.getSubType2();
        this.description = g.getDescription();
        this.status = g.getStatus();
        this.numberOfFiles = (g.getFiles() == null) ? 0 : g.getFiles().size();
        this.rejectionReason = g.getRejectionReason();
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public String getLandmark() {
        return landmark;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public Integer getPinCode() {
        return pinCode;
    }

    public String getGrievanceType() {
        return grievanceType;
    }

    public String getSubType1() {
        return subType1;
    }

    public String getSubType2() {
        return subType2;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public Integer getNumberOfFiles() {
        return numberOfFiles;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }
}
