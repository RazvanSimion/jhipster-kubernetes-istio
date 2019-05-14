package ro.trc.office.meeting.repository;

import ro.trc.office.meeting.domain.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Meeting entity.
 */
@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
    @Query("{}")
    Page<Meeting> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Meeting> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Meeting> findOneWithEagerRelationships(String id);

}
