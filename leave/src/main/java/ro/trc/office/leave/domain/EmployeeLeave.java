package ro.trc.office.leave.domain;


import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * LEAVE
 */
@ApiModel(description = "LEAVE")
@Document(collection = "employee_leave")
public class EmployeeLeave implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("employee_code")
    private String employeeCode;

    @NotNull
    @Field("total")
    private BigDecimal total;

    @NotNull
    @Field("available")
    private BigDecimal available;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public EmployeeLeave employeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
        return this;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public EmployeeLeave total(BigDecimal total) {
        this.total = total;
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getAvailable() {
        return available;
    }

    public EmployeeLeave available(BigDecimal available) {
        this.available = available;
        return this;
    }

    public void setAvailable(BigDecimal available) {
        this.available = available;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeLeave)) {
            return false;
        }
        return id != null && id.equals(((EmployeeLeave) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EmployeeLeave{" +
            "id=" + getId() +
            ", employeeCode='" + getEmployeeCode() + "'" +
            ", total=" + getTotal() +
            ", available=" + getAvailable() +
            "}";
    }
}
