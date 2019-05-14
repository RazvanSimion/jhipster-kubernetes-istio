package ro.trc.office.leave.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import ro.trc.office.leave.domain.enumeration.LeaveRequestType;

import ro.trc.office.leave.domain.enumeration.LeaveRequestStatus;

/**
 * A LeaveRequest.
 */
@Document(collection = "leave_request")
public class LeaveRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("start_date")
    private Instant startDate;

    @NotNull
    @Field("end_date")
    private Instant endDate;

    @NotNull
    @Field("creation_date")
    private Instant creationDate;

    @NotNull
    @Field("department_code")
    private String departmentCode;

    @NotNull
    @Field("employee_code")
    private String employeeCode;

    @NotNull
    @Field("working_days")
    private Long workingDays;

    @Field("description")
    private String description;

    @NotNull
    @Field("leave_type")
    private LeaveRequestType leaveType;

    @NotNull
    @Field("status")
    private LeaveRequestStatus status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public LeaveRequest startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public LeaveRequest endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public LeaveRequest creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public LeaveRequest departmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
        return this;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public LeaveRequest employeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
        return this;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public Long getWorkingDays() {
        return workingDays;
    }

    public LeaveRequest workingDays(Long workingDays) {
        this.workingDays = workingDays;
        return this;
    }

    public void setWorkingDays(Long workingDays) {
        this.workingDays = workingDays;
    }

    public String getDescription() {
        return description;
    }

    public LeaveRequest description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LeaveRequestType getLeaveType() {
        return leaveType;
    }

    public LeaveRequest leaveType(LeaveRequestType leaveType) {
        this.leaveType = leaveType;
        return this;
    }

    public void setLeaveType(LeaveRequestType leaveType) {
        this.leaveType = leaveType;
    }

    public LeaveRequestStatus getStatus() {
        return status;
    }

    public LeaveRequest status(LeaveRequestStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(LeaveRequestStatus status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LeaveRequest)) {
            return false;
        }
        return id != null && id.equals(((LeaveRequest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LeaveRequest{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", departmentCode='" + getDepartmentCode() + "'" +
            ", employeeCode='" + getEmployeeCode() + "'" +
            ", workingDays=" + getWorkingDays() +
            ", description='" + getDescription() + "'" +
            ", leaveType='" + getLeaveType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
