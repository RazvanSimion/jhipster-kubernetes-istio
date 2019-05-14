package ro.trc.office.leave.service;

import ro.trc.office.leave.domain.LeaveRequest;
import ro.trc.office.leave.repository.LeaveRequestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link LeaveRequest}.
 */
@Service
public class LeaveRequestService {

    private final Logger log = LoggerFactory.getLogger(LeaveRequestService.class);

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    /**
     * Save a leaveRequest.
     *
     * @param leaveRequest the entity to save.
     * @return the persisted entity.
     */
    public LeaveRequest save(LeaveRequest leaveRequest) {
        log.debug("Request to save LeaveRequest : {}", leaveRequest);
        return leaveRequestRepository.save(leaveRequest);
    }

    /**
     * Get all the leaveRequests.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<LeaveRequest> findAll(Pageable pageable) {
        log.debug("Request to get all LeaveRequests");
        return leaveRequestRepository.findAll(pageable);
    }


    /**
     * Get one leaveRequest by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<LeaveRequest> findOne(String id) {
        log.debug("Request to get LeaveRequest : {}", id);
        return leaveRequestRepository.findById(id);
    }

    /**
     * Delete the leaveRequest by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete LeaveRequest : {}", id);
        leaveRequestRepository.deleteById(id);
    }
}
