package ro.trc.office.leave.web.rest;

import ro.trc.office.leave.domain.LeaveRequest;
import ro.trc.office.leave.service.LeaveRequestService;
import ro.trc.office.leave.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link ro.trc.office.leave.domain.LeaveRequest}.
 */
@RestController
@RequestMapping("/api")
public class LeaveRequestResource {

    private final Logger log = LoggerFactory.getLogger(LeaveRequestResource.class);

    private static final String ENTITY_NAME = "leaveLeaveRequest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestResource(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    /**
     * {@code POST  /leave-requests} : Create a new leaveRequest.
     *
     * @param leaveRequest the leaveRequest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new leaveRequest, or with status {@code 400 (Bad Request)} if the leaveRequest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/leave-requests")
    public ResponseEntity<LeaveRequest> createLeaveRequest(@Valid @RequestBody LeaveRequest leaveRequest) throws URISyntaxException {
        log.debug("REST request to save LeaveRequest : {}", leaveRequest);
        if (leaveRequest.getId() != null) {
            throw new BadRequestAlertException("A new leaveRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LeaveRequest result = leaveRequestService.save(leaveRequest);
        return ResponseEntity.created(new URI("/api/leave-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /leave-requests} : Updates an existing leaveRequest.
     *
     * @param leaveRequest the leaveRequest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated leaveRequest,
     * or with status {@code 400 (Bad Request)} if the leaveRequest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the leaveRequest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/leave-requests")
    public ResponseEntity<LeaveRequest> updateLeaveRequest(@Valid @RequestBody LeaveRequest leaveRequest) throws URISyntaxException {
        log.debug("REST request to update LeaveRequest : {}", leaveRequest);
        if (leaveRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LeaveRequest result = leaveRequestService.save(leaveRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, leaveRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /leave-requests} : get all the leaveRequests.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of leaveRequests in body.
     */
    @GetMapping("/leave-requests")
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of LeaveRequests");
        Page<LeaveRequest> page = leaveRequestService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /leave-requests/:id} : get the "id" leaveRequest.
     *
     * @param id the id of the leaveRequest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the leaveRequest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/leave-requests/{id}")
    public ResponseEntity<LeaveRequest> getLeaveRequest(@PathVariable String id) {
        log.debug("REST request to get LeaveRequest : {}", id);
        Optional<LeaveRequest> leaveRequest = leaveRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(leaveRequest);
    }

    /**
     * {@code DELETE  /leave-requests/:id} : delete the "id" leaveRequest.
     *
     * @param id the id of the leaveRequest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/leave-requests/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable String id) {
        log.debug("REST request to delete LeaveRequest : {}", id);
        leaveRequestService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
