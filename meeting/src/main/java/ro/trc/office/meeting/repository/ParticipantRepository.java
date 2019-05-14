package ro.trc.office.meeting.repository;

import ro.trc.office.meeting.domain.Participant;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Participant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipantRepository extends MongoRepository<Participant, String> {

}
