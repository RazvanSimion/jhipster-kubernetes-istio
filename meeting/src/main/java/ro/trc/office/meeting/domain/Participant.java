package ro.trc.office.meeting.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Participant.
 */
@Document(collection = "participant")
public class Participant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("email")
    private String email;

    @DBRef
    @Field("meetings")
    @JsonIgnore
    private Set<Meeting> meetings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Participant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Meeting> getMeetings() {
        return meetings;
    }

    public Participant meetings(Set<Meeting> meetings) {
        this.meetings = meetings;
        return this;
    }

    public Participant addMeeting(Meeting meeting) {
        this.meetings.add(meeting);
        meeting.getParticipants().add(this);
        return this;
    }

    public Participant removeMeeting(Meeting meeting) {
        this.meetings.remove(meeting);
        meeting.getParticipants().remove(this);
        return this;
    }

    public void setMeetings(Set<Meeting> meetings) {
        this.meetings = meetings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Participant)) {
            return false;
        }
        return id != null && id.equals(((Participant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Participant{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
