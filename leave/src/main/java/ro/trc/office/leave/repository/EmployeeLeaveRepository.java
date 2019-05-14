package ro.trc.office.leave.repository;

import ro.trc.office.leave.domain.EmployeeLeave;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the EmployeeLeave entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeLeaveRepository extends MongoRepository<EmployeeLeave, String> {

}
