package ro.trc.office.meeting.web.rest;

import ro.trc.office.meeting.MeetingApp;
import ro.trc.office.meeting.domain.MeetingRoom;
import ro.trc.office.meeting.repository.MeetingRoomRepository;
import ro.trc.office.meeting.service.MeetingRoomService;
import ro.trc.office.meeting.web.rest.errors.ExceptionTranslator;

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


import java.util.List;

import static ro.trc.office.meeting.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MeetingRoomResource} REST controller.
 */
@SpringBootTest(classes = MeetingApp.class)
public class MeetingRoomResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MeetingRoomRepository meetingRoomRepository;

    @Autowired
    private MeetingRoomService meetingRoomService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMeetingRoomMockMvc;

    private MeetingRoom meetingRoom;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeetingRoomResource meetingRoomResource = new MeetingRoomResource(meetingRoomService);
        this.restMeetingRoomMockMvc = MockMvcBuilders.standaloneSetup(meetingRoomResource)
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
    public static MeetingRoom createEntity() {
        MeetingRoom meetingRoom = new MeetingRoom()
            .code(DEFAULT_CODE)
            .location(DEFAULT_LOCATION)
            .name(DEFAULT_NAME);
        return meetingRoom;
    }

    @BeforeEach
    public void initTest() {
        meetingRoomRepository.deleteAll();
        meetingRoom = createEntity();
    }

    @Test
    public void createMeetingRoom() throws Exception {
        int databaseSizeBeforeCreate = meetingRoomRepository.findAll().size();

        // Create the MeetingRoom
        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isCreated());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeCreate + 1);
        MeetingRoom testMeetingRoom = meetingRoomList.get(meetingRoomList.size() - 1);
        assertThat(testMeetingRoom.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMeetingRoom.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testMeetingRoom.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createMeetingRoomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meetingRoomRepository.findAll().size();

        // Create the MeetingRoom with an existing ID
        meetingRoom.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRoomRepository.findAll().size();
        // set the field null
        meetingRoom.setCode(null);

        // Create the MeetingRoom, which fails.

        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRoomRepository.findAll().size();
        // set the field null
        meetingRoom.setLocation(null);

        // Create the MeetingRoom, which fails.

        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRoomRepository.findAll().size();
        // set the field null
        meetingRoom.setName(null);

        // Create the MeetingRoom, which fails.

        restMeetingRoomMockMvc.perform(post("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMeetingRooms() throws Exception {
        // Initialize the database
        meetingRoomRepository.save(meetingRoom);

        // Get all the meetingRoomList
        restMeetingRoomMockMvc.perform(get("/api/meeting-rooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meetingRoom.getId())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    public void getMeetingRoom() throws Exception {
        // Initialize the database
        meetingRoomRepository.save(meetingRoom);

        // Get the meetingRoom
        restMeetingRoomMockMvc.perform(get("/api/meeting-rooms/{id}", meetingRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meetingRoom.getId()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    public void getNonExistingMeetingRoom() throws Exception {
        // Get the meetingRoom
        restMeetingRoomMockMvc.perform(get("/api/meeting-rooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMeetingRoom() throws Exception {
        // Initialize the database
        meetingRoomService.save(meetingRoom);

        int databaseSizeBeforeUpdate = meetingRoomRepository.findAll().size();

        // Update the meetingRoom
        MeetingRoom updatedMeetingRoom = meetingRoomRepository.findById(meetingRoom.getId()).get();
        updatedMeetingRoom
            .code(UPDATED_CODE)
            .location(UPDATED_LOCATION)
            .name(UPDATED_NAME);

        restMeetingRoomMockMvc.perform(put("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeetingRoom)))
            .andExpect(status().isOk());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeUpdate);
        MeetingRoom testMeetingRoom = meetingRoomList.get(meetingRoomList.size() - 1);
        assertThat(testMeetingRoom.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMeetingRoom.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testMeetingRoom.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingMeetingRoom() throws Exception {
        int databaseSizeBeforeUpdate = meetingRoomRepository.findAll().size();

        // Create the MeetingRoom

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeetingRoomMockMvc.perform(put("/api/meeting-rooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meetingRoom)))
            .andExpect(status().isBadRequest());

        // Validate the MeetingRoom in the database
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMeetingRoom() throws Exception {
        // Initialize the database
        meetingRoomService.save(meetingRoom);

        int databaseSizeBeforeDelete = meetingRoomRepository.findAll().size();

        // Delete the meetingRoom
        restMeetingRoomMockMvc.perform(delete("/api/meeting-rooms/{id}", meetingRoom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<MeetingRoom> meetingRoomList = meetingRoomRepository.findAll();
        assertThat(meetingRoomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeetingRoom.class);
        MeetingRoom meetingRoom1 = new MeetingRoom();
        meetingRoom1.setId("id1");
        MeetingRoom meetingRoom2 = new MeetingRoom();
        meetingRoom2.setId(meetingRoom1.getId());
        assertThat(meetingRoom1).isEqualTo(meetingRoom2);
        meetingRoom2.setId("id2");
        assertThat(meetingRoom1).isNotEqualTo(meetingRoom2);
        meetingRoom1.setId(null);
        assertThat(meetingRoom1).isNotEqualTo(meetingRoom2);
    }
}
