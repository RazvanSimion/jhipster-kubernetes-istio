package ro.trc.office.meeting.web.rest;

import ro.trc.office.meeting.MeetingApp;
import ro.trc.office.meeting.domain.Meeting;
import ro.trc.office.meeting.domain.MeetingRoom;
import ro.trc.office.meeting.repository.MeetingRepository;
import ro.trc.office.meeting.service.MeetingService;
import ro.trc.office.meeting.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static ro.trc.office.meeting.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MeetingResource} REST controller.
 */
@SpringBootTest(classes = MeetingApp.class)
public class MeetingResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MeetingRepository meetingRepository;

    @Mock
    private MeetingRepository meetingRepositoryMock;

    @Mock
    private MeetingService meetingServiceMock;

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMeetingMockMvc;

    private Meeting meeting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeetingResource meetingResource = new MeetingResource(meetingService);
        this.restMeetingMockMvc = MockMvcBuilders.standaloneSetup(meetingResource)
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
    public static Meeting createEntity() {
        Meeting meeting = new Meeting()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        // Add required entity
        MeetingRoom meetingRoom = MeetingRoomResourceIT.createEntity();
        meetingRoom.setId("fixed-id-for-tests");
        meeting.setMeetingRoom(meetingRoom);
        return meeting;
    }

    @BeforeEach
    public void initTest() {
        meetingRepository.deleteAll();
        meeting = createEntity();
    }

    @Test
    public void createMeeting() throws Exception {
        int databaseSizeBeforeCreate = meetingRepository.findAll().size();

        // Create the Meeting
        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isCreated());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeCreate + 1);
        Meeting testMeeting = meetingList.get(meetingList.size() - 1);
        assertThat(testMeeting.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testMeeting.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMeeting.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testMeeting.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    public void createMeetingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = meetingRepository.findAll().size();

        // Create the Meeting with an existing ID
        meeting.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRepository.findAll().size();
        // set the field null
        meeting.setTitle(null);

        // Create the Meeting, which fails.

        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRepository.findAll().size();
        // set the field null
        meeting.setStartDate(null);

        // Create the Meeting, which fails.

        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = meetingRepository.findAll().size();
        // set the field null
        meeting.setEndDate(null);

        // Create the Meeting, which fails.

        restMeetingMockMvc.perform(post("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMeetings() throws Exception {
        // Initialize the database
        meetingRepository.save(meeting);

        // Get all the meetingList
        restMeetingMockMvc.perform(get("/api/meetings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(meeting.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMeetingsWithEagerRelationshipsIsEnabled() throws Exception {
        MeetingResource meetingResource = new MeetingResource(meetingServiceMock);
        when(meetingServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restMeetingMockMvc = MockMvcBuilders.standaloneSetup(meetingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMeetingMockMvc.perform(get("/api/meetings?eagerload=true"))
        .andExpect(status().isOk());

        verify(meetingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMeetingsWithEagerRelationshipsIsNotEnabled() throws Exception {
        MeetingResource meetingResource = new MeetingResource(meetingServiceMock);
            when(meetingServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restMeetingMockMvc = MockMvcBuilders.standaloneSetup(meetingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMeetingMockMvc.perform(get("/api/meetings?eagerload=true"))
        .andExpect(status().isOk());

            verify(meetingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getMeeting() throws Exception {
        // Initialize the database
        meetingRepository.save(meeting);

        // Get the meeting
        restMeetingMockMvc.perform(get("/api/meetings/{id}", meeting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(meeting.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    public void getNonExistingMeeting() throws Exception {
        // Get the meeting
        restMeetingMockMvc.perform(get("/api/meetings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMeeting() throws Exception {
        // Initialize the database
        meetingService.save(meeting);

        int databaseSizeBeforeUpdate = meetingRepository.findAll().size();

        // Update the meeting
        Meeting updatedMeeting = meetingRepository.findById(meeting.getId()).get();
        updatedMeeting
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restMeetingMockMvc.perform(put("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeeting)))
            .andExpect(status().isOk());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeUpdate);
        Meeting testMeeting = meetingList.get(meetingList.size() - 1);
        assertThat(testMeeting.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testMeeting.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMeeting.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testMeeting.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    public void updateNonExistingMeeting() throws Exception {
        int databaseSizeBeforeUpdate = meetingRepository.findAll().size();

        // Create the Meeting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeetingMockMvc.perform(put("/api/meetings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(meeting)))
            .andExpect(status().isBadRequest());

        // Validate the Meeting in the database
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMeeting() throws Exception {
        // Initialize the database
        meetingService.save(meeting);

        int databaseSizeBeforeDelete = meetingRepository.findAll().size();

        // Delete the meeting
        restMeetingMockMvc.perform(delete("/api/meetings/{id}", meeting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Meeting> meetingList = meetingRepository.findAll();
        assertThat(meetingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Meeting.class);
        Meeting meeting1 = new Meeting();
        meeting1.setId("id1");
        Meeting meeting2 = new Meeting();
        meeting2.setId(meeting1.getId());
        assertThat(meeting1).isEqualTo(meeting2);
        meeting2.setId("id2");
        assertThat(meeting1).isNotEqualTo(meeting2);
        meeting1.setId(null);
        assertThat(meeting1).isNotEqualTo(meeting2);
    }
}
