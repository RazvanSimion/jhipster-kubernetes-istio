package ro.trc.office.meeting.service;

import ro.trc.office.meeting.domain.Participant;
import ro.trc.office.meeting.repository.ParticipantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Participant}.
 */
@Service
public class ParticipantService {

    private final Logger log = LoggerFactory.getLogger(ParticipantService.class);

    private final ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    /**
     * Save a participant.
     *
     * @param participant the entity to save.
     * @return the persisted entity.
     */
    public Participant save(Participant participant) {
        log.debug("Request to save Participant : {}", participant);
        return participantRepository.save(participant);
    }

    /**
     * Get all the participants.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Participant> findAll(Pageable pageable) {
        log.debug("Request to get all Participants");
        return participantRepository.findAll(pageable);
    }


    /**
     * Get one participant by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Participant> findOne(String id) {
        log.debug("Request to get Participant : {}", id);
        return participantRepository.findById(id);
    }

    /**
     * Delete the participant by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Participant : {}", id);
        participantRepository.deleteById(id);
    }
}
