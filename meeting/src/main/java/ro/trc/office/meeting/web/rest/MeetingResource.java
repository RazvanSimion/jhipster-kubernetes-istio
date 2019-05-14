package ro.trc.office.meeting.web.rest;

import ro.trc.office.meeting.domain.Meeting;
import ro.trc.office.meeting.service.MeetingService;
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
 * REST controller for managing {@link ro.trc.office.meeting.domain.Meeting}.
 */
@RestController
@RequestMapping("/api")
public class MeetingResource {

    private final Logger log = LoggerFactory.getLogger(MeetingResource.class);

    private static final String ENTITY_NAME = "meetingMeeting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeetingService meetingService;

    public MeetingResource(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    /**
     * {@code POST  /meetings} : Create a new meeting.
     *
     * @param meeting the meeting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new meeting, or with status {@code 400 (Bad Request)} if the meeting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meetings")
    public ResponseEntity<Meeting> createMeeting(@Valid @RequestBody Meeting meeting) throws URISyntaxException {
        log.debug("REST request to save Meeting : {}", meeting);
        if (meeting.getId() != null) {
            throw new BadRequestAlertException("A new meeting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Meeting result = meetingService.save(meeting);
        return ResponseEntity.created(new URI("/api/meetings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meetings} : Updates an existing meeting.
     *
     * @param meeting the meeting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated meeting,
     * or with status {@code 400 (Bad Request)} if the meeting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the meeting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meetings")
    public ResponseEntity<Meeting> updateMeeting(@Valid @RequestBody Meeting meeting) throws URISyntaxException {
        log.debug("REST request to update Meeting : {}", meeting);
        if (meeting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Meeting result = meetingService.save(meeting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, meeting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meetings} : get all the meetings.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of meetings in body.
     */
    @GetMapping("/meetings")
    public ResponseEntity<List<Meeting>> getAllMeetings(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Meetings");
        Page<Meeting> page;
        if (eagerload) {
            page = meetingService.findAllWithEagerRelationships(pageable);
        } else {
            page = meetingService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /meetings/:id} : get the "id" meeting.
     *
     * @param id the id of the meeting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the meeting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meetings/{id}")
    public ResponseEntity<Meeting> getMeeting(@PathVariable String id) {
        log.debug("REST request to get Meeting : {}", id);
        Optional<Meeting> meeting = meetingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(meeting);
    }

    /**
     * {@code DELETE  /meetings/:id} : delete the "id" meeting.
     *
     * @param id the id of the meeting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meetings/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable String id) {
        log.debug("REST request to delete Meeting : {}", id);
        meetingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
