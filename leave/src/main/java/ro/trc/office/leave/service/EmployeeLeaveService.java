package ro.trc.office.leave.service;

import ro.trc.office.leave.domain.EmployeeLeave;
import ro.trc.office.leave.repository.EmployeeLeaveRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link EmployeeLeave}.
 */
@Service
public class EmployeeLeaveService {

    private final Logger log = LoggerFactory.getLogger(EmployeeLeaveService.class);

    private final EmployeeLeaveRepository employeeLeaveRepository;

    public EmployeeLeaveService(EmployeeLeaveRepository employeeLeaveRepository) {
        this.employeeLeaveRepository = employeeLeaveRepository;
    }

    /**
     * Save a employeeLeave.
     *
     * @param employeeLeave the entity to save.
     * @return the persisted entity.
     */
    public EmployeeLeave save(EmployeeLeave employeeLeave) {
        log.debug("Request to save EmployeeLeave : {}", employeeLeave);
        return employeeLeaveRepository.save(employeeLeave);
    }

    /**
     * Get all the employeeLeaves.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<EmployeeLeave> findAll(Pageable pageable) {
        log.debug("Request to get all EmployeeLeaves");
        return employeeLeaveRepository.findAll(pageable);
    }


    /**
     * Get one employeeLeave by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<EmployeeLeave> findOne(String id) {
        log.debug("Request to get EmployeeLeave : {}", id);
        return employeeLeaveRepository.findById(id);
    }

    /**
     * Delete the employeeLeave by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete EmployeeLeave : {}", id);
        employeeLeaveRepository.deleteById(id);
    }
}
