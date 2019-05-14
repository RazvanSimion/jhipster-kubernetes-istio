package ro.trc.office.leave.web.rest;

import ro.trc.office.leave.LeaveApp;
import ro.trc.office.leave.domain.EmployeeLeave;
import ro.trc.office.leave.repository.EmployeeLeaveRepository;
import ro.trc.office.leave.service.EmployeeLeaveService;
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


import java.math.BigDecimal;
import java.util.List;

import static ro.trc.office.leave.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link EmployeeLeaveResource} REST controller.
 */
@SpringBootTest(classes = LeaveApp.class)
public class EmployeeLeaveResourceIT {

    private static final String DEFAULT_EMPLOYEE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYEE_CODE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL = new BigDecimal(2);

    private static final BigDecimal DEFAULT_AVAILABLE = new BigDecimal(1);
    private static final BigDecimal UPDATED_AVAILABLE = new BigDecimal(2);

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private EmployeeLeaveService employeeLeaveService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restEmployeeLeaveMockMvc;

    private EmployeeLeave employeeLeave;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeLeaveResource employeeLeaveResource = new EmployeeLeaveResource(employeeLeaveService);
        this.restEmployeeLeaveMockMvc = MockMvcBuilders.standaloneSetup(employeeLeaveResource)
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
    public static EmployeeLeave createEntity() {
        EmployeeLeave employeeLeave = new EmployeeLeave()
            .employeeCode(DEFAULT_EMPLOYEE_CODE)
            .total(DEFAULT_TOTAL)
            .available(DEFAULT_AVAILABLE);
        return employeeLeave;
    }

    @BeforeEach
    public void initTest() {
        employeeLeaveRepository.deleteAll();
        employeeLeave = createEntity();
    }

    @Test
    public void createEmployeeLeave() throws Exception {
        int databaseSizeBeforeCreate = employeeLeaveRepository.findAll().size();

        // Create the EmployeeLeave
        restEmployeeLeaveMockMvc.perform(post("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeLeave)))
            .andExpect(status().isCreated());

        // Validate the EmployeeLeave in the database
        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeLeave testEmployeeLeave = employeeLeaveList.get(employeeLeaveList.size() - 1);
        assertThat(testEmployeeLeave.getEmployeeCode()).isEqualTo(DEFAULT_EMPLOYEE_CODE);
        assertThat(testEmployeeLeave.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testEmployeeLeave.getAvailable()).isEqualTo(DEFAULT_AVAILABLE);
    }

    @Test
    public void createEmployeeLeaveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeLeaveRepository.findAll().size();

        // Create the EmployeeLeave with an existing ID
        employeeLeave.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeLeaveMockMvc.perform(post("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeLeave)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeave in the database
        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkEmployeeCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeLeaveRepository.findAll().size();
        // set the field null
        employeeLeave.setEmployeeCode(null);

        // Create the EmployeeLeave, which fails.

        restEmployeeLeaveMockMvc.perform(post("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeLeave)))
            .andExpect(status().isBadRequest());

        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeLeaveRepository.findAll().size();
        // set the field null
        employeeLeave.setTotal(null);

        // Create the EmployeeLeave, which fails.

        restEmployeeLeaveMockMvc.perform(post("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeLeave)))
            .andExpect(status().isBadRequest());

        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAvailableIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeLeaveRepository.findAll().size();
        // set the field null
        employeeLeave.setAvailable(null);

        // Create the EmployeeLeave, which fails.

        restEmployeeLeaveMockMvc.perform(post("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeLeave)))
            .andExpect(status().isBadRequest());

        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllEmployeeLeaves() throws Exception {
        // Initialize the database
        employeeLeaveRepository.save(employeeLeave);

        // Get all the employeeLeaveList
        restEmployeeLeaveMockMvc.perform(get("/api/employee-leaves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeLeave.getId())))
            .andExpect(jsonPath("$.[*].employeeCode").value(hasItem(DEFAULT_EMPLOYEE_CODE.toString())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].available").value(hasItem(DEFAULT_AVAILABLE.intValue())));
    }
    
    @Test
    public void getEmployeeLeave() throws Exception {
        // Initialize the database
        employeeLeaveRepository.save(employeeLeave);

        // Get the employeeLeave
        restEmployeeLeaveMockMvc.perform(get("/api/employee-leaves/{id}", employeeLeave.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeLeave.getId()))
            .andExpect(jsonPath("$.employeeCode").value(DEFAULT_EMPLOYEE_CODE.toString()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()))
            .andExpect(jsonPath("$.available").value(DEFAULT_AVAILABLE.intValue()));
    }

    @Test
    public void getNonExistingEmployeeLeave() throws Exception {
        // Get the employeeLeave
        restEmployeeLeaveMockMvc.perform(get("/api/employee-leaves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEmployeeLeave() throws Exception {
        // Initialize the database
        employeeLeaveService.save(employeeLeave);

        int databaseSizeBeforeUpdate = employeeLeaveRepository.findAll().size();

        // Update the employeeLeave
        EmployeeLeave updatedEmployeeLeave = employeeLeaveRepository.findById(employeeLeave.getId()).get();
        updatedEmployeeLeave
            .employeeCode(UPDATED_EMPLOYEE_CODE)
            .total(UPDATED_TOTAL)
            .available(UPDATED_AVAILABLE);

        restEmployeeLeaveMockMvc.perform(put("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeeLeave)))
            .andExpect(status().isOk());

        // Validate the EmployeeLeave in the database
        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeUpdate);
        EmployeeLeave testEmployeeLeave = employeeLeaveList.get(employeeLeaveList.size() - 1);
        assertThat(testEmployeeLeave.getEmployeeCode()).isEqualTo(UPDATED_EMPLOYEE_CODE);
        assertThat(testEmployeeLeave.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testEmployeeLeave.getAvailable()).isEqualTo(UPDATED_AVAILABLE);
    }

    @Test
    public void updateNonExistingEmployeeLeave() throws Exception {
        int databaseSizeBeforeUpdate = employeeLeaveRepository.findAll().size();

        // Create the EmployeeLeave

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeLeaveMockMvc.perform(put("/api/employee-leaves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeLeave)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeLeave in the database
        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEmployeeLeave() throws Exception {
        // Initialize the database
        employeeLeaveService.save(employeeLeave);

        int databaseSizeBeforeDelete = employeeLeaveRepository.findAll().size();

        // Delete the employeeLeave
        restEmployeeLeaveMockMvc.perform(delete("/api/employee-leaves/{id}", employeeLeave.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<EmployeeLeave> employeeLeaveList = employeeLeaveRepository.findAll();
        assertThat(employeeLeaveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeLeave.class);
        EmployeeLeave employeeLeave1 = new EmployeeLeave();
        employeeLeave1.setId("id1");
        EmployeeLeave employeeLeave2 = new EmployeeLeave();
        employeeLeave2.setId(employeeLeave1.getId());
        assertThat(employeeLeave1).isEqualTo(employeeLeave2);
        employeeLeave2.setId("id2");
        assertThat(employeeLeave1).isNotEqualTo(employeeLeave2);
        employeeLeave1.setId(null);
        assertThat(employeeLeave1).isNotEqualTo(employeeLeave2);
    }
}
