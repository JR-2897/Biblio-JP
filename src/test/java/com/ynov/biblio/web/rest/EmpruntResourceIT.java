package com.ynov.biblio.web.rest;

import com.ynov.biblio.BiblioJpApp;
import com.ynov.biblio.domain.Emprunt;
import com.ynov.biblio.repository.EmpruntRepository;
import com.ynov.biblio.service.EmpruntService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.ynov.biblio.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmpruntResource} REST controller.
 */
@SpringBootTest(classes = BiblioJpApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmpruntResourceIT {

    private static final ZonedDateTime DEFAULT_DATE_EMPRUNT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_EMPRUNT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_NB_NOTIF_RETARD = 1;
    private static final Integer UPDATED_NB_NOTIF_RETARD = 2;

    private static final ZonedDateTime DEFAULT_DERNIERE_DATE_NOTIF = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DERNIERE_DATE_NOTIF = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private EmpruntRepository empruntRepository;

    @Autowired
    private EmpruntService empruntService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmpruntMockMvc;

    private Emprunt emprunt;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emprunt createEntity(EntityManager em) {
        Emprunt emprunt = new Emprunt()
            .dateEmprunt(DEFAULT_DATE_EMPRUNT)
            .nbNotifRetard(DEFAULT_NB_NOTIF_RETARD)
            .derniereDateNotif(DEFAULT_DERNIERE_DATE_NOTIF);
        return emprunt;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emprunt createUpdatedEntity(EntityManager em) {
        Emprunt emprunt = new Emprunt()
            .dateEmprunt(UPDATED_DATE_EMPRUNT)
            .nbNotifRetard(UPDATED_NB_NOTIF_RETARD)
            .derniereDateNotif(UPDATED_DERNIERE_DATE_NOTIF);
        return emprunt;
    }

    @BeforeEach
    public void initTest() {
        emprunt = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmprunt() throws Exception {
        int databaseSizeBeforeCreate = empruntRepository.findAll().size();
        // Create the Emprunt
        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isCreated());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeCreate + 1);
        Emprunt testEmprunt = empruntList.get(empruntList.size() - 1);
        assertThat(testEmprunt.getDateEmprunt()).isEqualTo(DEFAULT_DATE_EMPRUNT);
        assertThat(testEmprunt.getNbNotifRetard()).isEqualTo(DEFAULT_NB_NOTIF_RETARD);
        assertThat(testEmprunt.getDerniereDateNotif()).isEqualTo(DEFAULT_DERNIERE_DATE_NOTIF);
    }

    @Test
    @Transactional
    public void createEmpruntWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empruntRepository.findAll().size();

        // Create the Emprunt with an existing ID
        emprunt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isBadRequest());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmprunts() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        // Get all the empruntList
        restEmpruntMockMvc.perform(get("/api/emprunts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emprunt.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEmprunt").value(hasItem(sameInstant(DEFAULT_DATE_EMPRUNT))))
            .andExpect(jsonPath("$.[*].nbNotifRetard").value(hasItem(DEFAULT_NB_NOTIF_RETARD)))
            .andExpect(jsonPath("$.[*].derniereDateNotif").value(hasItem(sameInstant(DEFAULT_DERNIERE_DATE_NOTIF))));
    }
    
    @Test
    @Transactional
    public void getEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        // Get the emprunt
        restEmpruntMockMvc.perform(get("/api/emprunts/{id}", emprunt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(emprunt.getId().intValue()))
            .andExpect(jsonPath("$.dateEmprunt").value(sameInstant(DEFAULT_DATE_EMPRUNT)))
            .andExpect(jsonPath("$.nbNotifRetard").value(DEFAULT_NB_NOTIF_RETARD))
            .andExpect(jsonPath("$.derniereDateNotif").value(sameInstant(DEFAULT_DERNIERE_DATE_NOTIF)));
    }
    @Test
    @Transactional
    public void getNonExistingEmprunt() throws Exception {
        // Get the emprunt
        restEmpruntMockMvc.perform(get("/api/emprunts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmprunt() throws Exception {
        // Initialize the database
        empruntService.save(emprunt);

        int databaseSizeBeforeUpdate = empruntRepository.findAll().size();

        // Update the emprunt
        Emprunt updatedEmprunt = empruntRepository.findById(emprunt.getId()).get();
        // Disconnect from session so that the updates on updatedEmprunt are not directly saved in db
        em.detach(updatedEmprunt);
        updatedEmprunt
            .dateEmprunt(UPDATED_DATE_EMPRUNT)
            .nbNotifRetard(UPDATED_NB_NOTIF_RETARD)
            .derniereDateNotif(UPDATED_DERNIERE_DATE_NOTIF);

        restEmpruntMockMvc.perform(put("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmprunt)))
            .andExpect(status().isOk());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeUpdate);
        Emprunt testEmprunt = empruntList.get(empruntList.size() - 1);
        assertThat(testEmprunt.getDateEmprunt()).isEqualTo(UPDATED_DATE_EMPRUNT);
        assertThat(testEmprunt.getNbNotifRetard()).isEqualTo(UPDATED_NB_NOTIF_RETARD);
        assertThat(testEmprunt.getDerniereDateNotif()).isEqualTo(UPDATED_DERNIERE_DATE_NOTIF);
    }

    @Test
    @Transactional
    public void updateNonExistingEmprunt() throws Exception {
        int databaseSizeBeforeUpdate = empruntRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpruntMockMvc.perform(put("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isBadRequest());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmprunt() throws Exception {
        // Initialize the database
        empruntService.save(emprunt);

        int databaseSizeBeforeDelete = empruntRepository.findAll().size();

        // Delete the emprunt
        restEmpruntMockMvc.perform(delete("/api/emprunts/{id}", emprunt.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
