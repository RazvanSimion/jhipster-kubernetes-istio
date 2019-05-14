package ro.trc.office.meeting.service;

import ro.trc.office.meeting.domain.MeetingRoom;
import ro.trc.office.meeting.repository.MeetingRoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link MeetingRoom}.
 */
@Service
public class MeetingRoomService {

    private final Logger log = LoggerFactory.getLogger(MeetingRoomService.class);

    private final MeetingRoomRepository meetingRoomRepository;

    public MeetingRoomService(MeetingRoomRepository meetingRoomRepository) {
        this.meetingRoomRepository = meetingRoomRepository;
    }

    /**
     * Save a meetingRoom.
     *
     * @param meetingRoom the entity to save.
     * @return the persisted entity.
     */
    public MeetingRoom save(MeetingRoom meetingRoom) {
        log.debug("Request to save MeetingRoom : {}", meetingRoom);
        return meetingRoomRepository.save(meetingRoom);
    }

    /**
     * Get all the meetingRooms.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<MeetingRoom> findAll(Pageable pageable) {
        log.debug("Request to get all MeetingRooms");
        return meetingRoomRepository.findAll(pageable);
    }


    /**
     * Get one meetingRoom by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<MeetingRoom> findOne(String id) {
        log.debug("Request to get MeetingRoom : {}", id);
        return meetingRoomRepository.findById(id);
    }

    /**
     * Delete the meetingRoom by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete MeetingRoom : {}", id);
        meetingRoomRepository.deleteById(id);
    }
}
