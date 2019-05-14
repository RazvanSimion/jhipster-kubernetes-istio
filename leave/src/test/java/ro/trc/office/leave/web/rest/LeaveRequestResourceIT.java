package ro.trc.office.leave.web.rest;

import ro.trc.office.leave.LeaveApp;
import ro.trc.office.leave.domain.LeaveRequest;
import ro.trc.office.leave.repository.LeaveRequestRepository;
import ro.trc.office.leave.service.LeaveRequestService;
import ro.trc.office.leave.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static ro.trc.office.leave.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ro.trc.office.leave.domain.enumeration.LeaveRequestType;
import ro.trc.office.leave.domain.enumeration.LeaveRequestStatus;
/**
 * Integration tests for the {@Link LeaveRequestResource} REST controller.
 */
@SpringBootTest(classes = LeaveApp.class)
public class LeaveRequestResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DEPARTMENT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTMENT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_EMPLOYEE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYEE_CODE = "BBBBBBBBBB";

    private static final Long DEFAULT_WORKING_DAYS = 1L;
    private static final Long UPDATED_WORKING_DAYS = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LeaveRequestType DEFAULT_LEAVE_TYPE = LeaveRequestType.VACATION;
    private static final LeaveRequestType UPDATED_LEAVE_TYPE = LeaveRequestType.MEDICAL;

    private static final LeaveRequestStatus DEFAULT_STATUS = LeaveRequestStatus.COMPLETED;
    private static final LeaveRequestStatus UPDATED_STATUS = LeaveRequestStatus.PENDING;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restLeaveRequestMockMvc;

    private LeaveRequest leaveRequest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LeaveRequestResource leaveRequestResource = new LeaveRequestResource(leaveRequestService);
        this.restLeaveRequestMockMvc = MockMvcBuilders.standaloneSetup(leaveRequestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LeaveRequest createEntity() {
        LeaveRequest leaveRequest = new LeaveRequest()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .creationDate(DEFAULT_CREATION_DATE)
            .departmentCode(DEFAULT_DEPARTMENT_CODE)
            .employeeCode(DEFAULT_EMPLOYEE_CODE)
            .workingDays(DEFAULT_WORKING_DAYS)
            .description(DEFAULT_DESCRIPTION)
            .leaveType(DEFAULT_LEAVE_TYPE)
            .status(DEFAULT_STATUS);
        return leaveRequest;
    }

    @BeforeEach
    public void initTest() {
        leaveRequestRepository.deleteAll();
        leaveRequest = createEntity();
    }

    @Test
    public void createLeaveRequest() throws Exception {
        int databaseSizeBeforeCreate = leaveRequestRepository.findAll().size();

        // Create the LeaveRequest
        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isCreated());

        // Validate the LeaveRequest in the database
        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeCreate + 1);
        LeaveRequest testLeaveRequest = leaveRequestList.get(leaveRequestList.size() - 1);
        assertThat(testLeaveRequest.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testLeaveRequest.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testLeaveRequest.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testLeaveRequest.getDepartmentCode()).isEqualTo(DEFAULT_DEPARTMENT_CODE);
        assertThat(testLeaveRequest.getEmployeeCode()).isEqualTo(DEFAULT_EMPLOYEE_CODE);
        assertThat(testLeaveRequest.getWorkingDays()).isEqualTo(DEFAULT_WORKING_DAYS);
        assertThat(testLeaveRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLeaveRequest.getLeaveType()).isEqualTo(DEFAULT_LEAVE_TYPE);
        assertThat(testLeaveRequest.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    public void createLeaveRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leaveRequestRepository.findAll().size();

        // Create the LeaveRequest with an existing ID
        leaveRequest.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        // Validate the LeaveRequest in the database
        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setStartDate(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setEndDate(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setCreationDate(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDepartmentCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setDepartmentCode(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEmployeeCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setEmployeeCode(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkWorkingDaysIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setWorkingDays(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLeaveTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setLeaveType(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = leaveRequestRepository.findAll().size();
        // set the field null
        leaveRequest.setStatus(null);

        // Create the LeaveRequest, which fails.

        restLeaveRequestMockMvc.perform(post("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllLeaveRequests() throws Exception {
        // Initialize the database
        leaveRequestRepository.save(leaveRequest);

        // Get all the leaveRequestList
        restLeaveRequestMockMvc.perform(get("/api/leave-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leaveRequest.getId())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].departmentCode").value(hasItem(DEFAULT_DEPARTMENT_CODE.toString())))
            .andExpect(jsonPath("$.[*].employeeCode").value(hasItem(DEFAULT_EMPLOYEE_CODE.toString())))
            .andExpect(jsonPath("$.[*].workingDays").value(hasItem(DEFAULT_WORKING_DAYS.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].leaveType").value(hasItem(DEFAULT_LEAVE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    public void getLeaveRequest() throws Exception {
        // Initialize the database
        leaveRequestRepository.save(leaveRequest);

        // Get the leaveRequest
        restLeaveRequestMockMvc.perform(get("/api/leave-requests/{id}", leaveRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(leaveRequest.getId()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.departmentCode").value(DEFAULT_DEPARTMENT_CODE.toString()))
            .andExpect(jsonPath("$.employeeCode").value(DEFAULT_EMPLOYEE_CODE.toString()))
            .andExpect(jsonPath("$.workingDays").value(DEFAULT_WORKING_DAYS.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.leaveType").value(DEFAULT_LEAVE_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    public void getNonExistingLeaveRequest() throws Exception {
        // Get the leaveRequest
        restLeaveRequestMockMvc.perform(get("/api/leave-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLeaveRequest() throws Exception {
        // Initialize the database
        leaveRequestService.save(leaveRequest);

        int databaseSizeBeforeUpdate = leaveRequestRepository.findAll().size();

        // Update the leaveRequest
        LeaveRequest updatedLeaveRequest = leaveRequestRepository.findById(leaveRequest.getId()).get();
        updatedLeaveRequest
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .creationDate(UPDATED_CREATION_DATE)
            .departmentCode(UPDATED_DEPARTMENT_CODE)
            .employeeCode(UPDATED_EMPLOYEE_CODE)
            .workingDays(UPDATED_WORKING_DAYS)
            .description(UPDATED_DESCRIPTION)
            .leaveType(UPDATED_LEAVE_TYPE)
            .status(UPDATED_STATUS);

        restLeaveRequestMockMvc.perform(put("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLeaveRequest)))
            .andExpect(status().isOk());

        // Validate the LeaveRequest in the database
        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeUpdate);
        LeaveRequest testLeaveRequest = leaveRequestList.get(leaveRequestList.size() - 1);
        assertThat(testLeaveRequest.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testLeaveRequest.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testLeaveRequest.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testLeaveRequest.getDepartmentCode()).isEqualTo(UPDATED_DEPARTMENT_CODE);
        assertThat(testLeaveRequest.getEmployeeCode()).isEqualTo(UPDATED_EMPLOYEE_CODE);
        assertThat(testLeaveRequest.getWorkingDays()).isEqualTo(UPDATED_WORKING_DAYS);
        assertThat(testLeaveRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLeaveRequest.getLeaveType()).isEqualTo(UPDATED_LEAVE_TYPE);
        assertThat(testLeaveRequest.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    public void updateNonExistingLeaveRequest() throws Exception {
        int databaseSizeBeforeUpdate = leaveRequestRepository.findAll().size();

        // Create the LeaveRequest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLeaveRequestMockMvc.perform(put("/api/leave-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leaveRequest)))
            .andExpect(status().isBadRequest());

        // Validate the LeaveRequest in the database
        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLeaveRequest() throws Exception {
        // Initialize the database
        leaveRequestService.save(leaveRequest);

        int databaseSizeBeforeDelete = leaveRequestRepository.findAll().size();

        // Delete the leaveRequest
        restLeaveRequestMockMvc.perform(delete("/api/leave-requests/{id}", leaveRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAll();
        assertThat(leaveRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LeaveRequest.class);
        LeaveRequest leaveRequest1 = new LeaveRequest();
        leaveRequest1.setId("id1");
        LeaveRequest leaveRequest2 = new LeaveRequest();
        leaveRequest2.setId(leaveRequest1.getId());
        assertThat(leaveRequest1).isEqualTo(leaveRequest2);
        leaveRequest2.setId("id2");
        assertThat(leaveRequest1).isNotEqualTo(leaveRequest2);
        leaveRequest1.setId(null);
        assertThat(leaveRequest1).isNotEqualTo(leaveRequest2);
    }
}
