package ro.trc.office.leave.web.rest;

import ro.trc.office.leave.domain.EmployeeLeave;
import ro.trc.office.leave.service.EmployeeLeaveService;
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
 * REST controller for managing {@link ro.trc.office.leave.domain.EmployeeLeave}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeLeaveResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeLeaveResource.class);

    private static final String ENTITY_NAME = "leaveEmployeeLeave";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeLeaveService employeeLeaveService;

    public EmployeeLeaveResource(EmployeeLeaveService employeeLeaveService) {
        this.employeeLeaveService = employeeLeaveService;
    }

    /**
     * {@code POST  /employee-leaves} : Create a new employeeLeave.
     *
     * @param employeeLeave the employeeLeave to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeLeave, or with status {@code 400 (Bad Request)} if the employeeLeave has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-leaves")
    public ResponseEntity<EmployeeLeave> createEmployeeLeave(@Valid @RequestBody EmployeeLeave employeeLeave) throws URISyntaxException {
        log.debug("REST request to save EmployeeLeave : {}", employeeLeave);
        if (employeeLeave.getId() != null) {
            throw new BadRequestAlertException("A new employeeLeave cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeLeave result = employeeLeaveService.save(employeeLeave);
        return ResponseEntity.created(new URI("/api/employee-leaves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employee-leaves} : Updates an existing employeeLeave.
     *
     * @param employeeLeave the employeeLeave to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeLeave,
     * or with status {@code 400 (Bad Request)} if the employeeLeave is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeLeave couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-leaves")
    public ResponseEntity<EmployeeLeave> updateEmployeeLeave(@Valid @RequestBody EmployeeLeave employeeLeave) throws URISyntaxException {
        log.debug("REST request to update EmployeeLeave : {}", employeeLeave);
        if (employeeLeave.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmployeeLeave result = employeeLeaveService.save(employeeLeave);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeLeave.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employee-leaves} : get all the employeeLeaves.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeLeaves in body.
     */
    @GetMapping("/employee-leaves")
    public ResponseEntity<List<EmployeeLeave>> getAllEmployeeLeaves(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of EmployeeLeaves");
        Page<EmployeeLeave> page = employeeLeaveService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employee-leaves/:id} : get the "id" employeeLeave.
     *
     * @param id the id of the employeeLeave to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeLeave, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-leaves/{id}")
    public ResponseEntity<EmployeeLeave> getEmployeeLeave(@PathVariable String id) {
        log.debug("REST request to get EmployeeLeave : {}", id);
        Optional<EmployeeLeave> employeeLeave = employeeLeaveService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employeeLeave);
    }

    /**
     * {@code DELETE  /employee-leaves/:id} : delete the "id" employeeLeave.
     *
     * @param id the id of the employeeLeave to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-leaves/{id}")
    public ResponseEntity<Void> deleteEmployeeLeave(@PathVariable String id) {
        log.debug("REST request to delete EmployeeLeave : {}", id);
        employeeLeaveService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
