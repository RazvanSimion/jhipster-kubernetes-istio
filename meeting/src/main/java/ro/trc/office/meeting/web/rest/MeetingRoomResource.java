package ro.trc.office.meeting.web.rest;

import ro.trc.office.meeting.domain.MeetingRoom;
import ro.trc.office.meeting.service.MeetingRoomService;
import ro.trc.office.meeting.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ro.trc.office.meeting.domain.MeetingRoom}.
 */
@RestController
@RequestMapping("/api")
public class MeetingRoomResource {

    private final Logger log = LoggerFactory.getLogger(MeetingRoomResource.class);

    private static final String ENTITY_NAME = "meetingMeetingRoom";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeetingRoomService meetingRoomService;

    public MeetingRoomResource(MeetingRoomService meetingRoomService) {
        this.meetingRoomService = meetingRoomService;
    }

    /**
     * {@code POST  /meeting-rooms} : Create a new meetingRoom.
     *
     * @param meetingRoom the meetingRoom to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new meetingRoom, or with status {@code 400 (Bad Request)} if the meetingRoom has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meeting-rooms")
    public ResponseEntity<MeetingRoom> createMeetingRoom(@Valid @RequestBody MeetingRoom meetingRoom) throws URISyntaxException {
        log.debug("REST request to save MeetingRoom : {}", meetingRoom);
        if (meetingRoom.getId() != null) {
            throw new BadRequestAlertException("A new meetingRoom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeetingRoom result = meetingRoomService.save(meetingRoom);
        return ResponseEntity.created(new URI("/api/meeting-rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meeting-rooms} : Updates an existing meetingRoom.
     *
     * @param meetingRoom the meetingRoom to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated meetingRoom,
     * or with status {@code 400 (Bad Request)} if the meetingRoom is not valid,
     * or with status {@code 500 (Internal Server Error)} if the meetingRoom couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meeting-rooms")
    public ResponseEntity<MeetingRoom> updateMeetingRoom(@Valid @RequestBody MeetingRoom meetingRoom) throws URISyntaxException {
        log.debug("REST request to update MeetingRoom : {}", meetingRoom);
        if (meetingRoom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeetingRoom result = meetingRoomService.save(meetingRoom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, meetingRoom.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meeting-rooms} : get all the meetingRooms.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of meetingRooms in body.
     */
    @GetMapping("/meeting-rooms")
    public ResponseEntity<List<MeetingRoom>> getAllMeetingRooms(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of MeetingRooms");
        Page<MeetingRoom> page = meetingRoomService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /meeting-rooms/:id} : get the "id" meetingRoom.
     *
     * @param id the id of the meetingRoom to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the meetingRoom, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meeting-rooms/{id}")
    public ResponseEntity<MeetingRoom> getMeetingRoom(@PathVariable String id) {
        log.debug("REST request to get MeetingRoom : {}", id);
        Optional<MeetingRoom> meetingRoom = meetingRoomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(meetingRoom);
    }

    /**
     * {@code DELETE  /meeting-rooms/:id} : delete the "id" meetingRoom.
     *
     * @param id the id of the meetingRoom to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meeting-rooms/{id}")
    public ResponseEntity<Void> deleteMeetingRoom(@PathVariable String id) {
        log.debug("REST request to delete MeetingRoom : {}", id);
        meetingRoomService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
