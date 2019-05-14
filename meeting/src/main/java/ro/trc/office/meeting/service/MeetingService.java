package ro.trc.office.meeting.service;

import ro.trc.office.meeting.domain.Meeting;
import ro.trc.office.meeting.repository.MeetingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Meeting}.
 */
@Service
public class MeetingService {

    private final Logger log = LoggerFactory.getLogger(MeetingService.class);

    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    /**
     * Save a meeting.
     *
     * @param meeting the entity to save.
     * @return the persisted entity.
     */
    public Meeting save(Meeting meeting) {
        log.debug("Request to save Meeting : {}", meeting);
        return meetingRepository.save(meeting);
    }

    /**
     * Get all the meetings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Meeting> findAll(Pageable pageable) {
        log.debug("Request to get all Meetings");
        return meetingRepository.findAll(pageable);
    }

    /**
     * Get all the meetings with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Meeting> findAllWithEagerRelationships(Pageable pageable) {
        return meetingRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one meeting by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Meeting> findOne(String id) {
        log.debug("Request to get Meeting : {}", id);
        return meetingRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the meeting by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Meeting : {}", id);
        meetingRepository.deleteById(id);
    }
}
