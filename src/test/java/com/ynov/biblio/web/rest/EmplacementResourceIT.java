package com.ynov.biblio.web.rest;

import com.ynov.biblio.BiblioJpApp;
import com.ynov.biblio.domain.Emplacement;
import com.ynov.biblio.repository.EmplacementRepository;
import com.ynov.biblio.service.EmplacementService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmplacementResource} REST controller.
 */
@SpringBootTest(classes = BiblioJpApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmplacementResourceIT {

    private static final String DEFAULT_NOM_EMPLACEMENT = "AAAAAAAAAA";
    private static final String UPDATED_NOM_EMPLACEMENT = "BBBBBBBBBB";

    @Autowired
    private EmplacementRepository emplacementRepository;

    @Autowired
    private EmplacementService emplacementService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmplacementMockMvc;

    private Emplacement emplacement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emplacement createEntity(EntityManager em) {
        Emplacement emplacement = new Emplacement()
            .nomEmplacement(DEFAULT_NOM_EMPLACEMENT);
        return emplacement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emplacement createUpdatedEntity(EntityManager em) {
        Emplacement emplacement = new Emplacement()
            .nomEmplacement(UPDATED_NOM_EMPLACEMENT);
        return emplacement;
    }

    @BeforeEach
    public void initTest() {
        emplacement = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmplacement() throws Exception {
        int databaseSizeBeforeCreate = emplacementRepository.findAll().size();
        // Create the Emplacement
        restEmplacementMockMvc.perform(post("/api/emplacements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emplacement)))
            .andExpect(status().isCreated());

        // Validate the Emplacement in the database
        List<Emplacement> emplacementList = emplacementRepository.findAll();
        assertThat(emplacementList).hasSize(databaseSizeBeforeCreate + 1);
        Emplacement testEmplacement = emplacementList.get(emplacementList.size() - 1);
        assertThat(testEmplacement.getNomEmplacement()).isEqualTo(DEFAULT_NOM_EMPLACEMENT);
    }

    @Test
    @Transactional
    public void createEmplacementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emplacementRepository.findAll().size();

        // Create the Emplacement with an existing ID
        emplacement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmplacementMockMvc.perform(post("/api/emplacements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emplacement)))
            .andExpect(status().isBadRequest());

        // Validate the Emplacement in the database
        List<Emplacement> emplacementList = emplacementRepository.findAll();
        assertThat(emplacementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmplacements() throws Exception {
        // Initialize the database
        emplacementRepository.saveAndFlush(emplacement);

        // Get all the emplacementList
        restEmplacementMockMvc.perform(get("/api/emplacements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emplacement.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomEmplacement").value(hasItem(DEFAULT_NOM_EMPLACEMENT)));
    }
    
    @Test
    @Transactional
    public void getEmplacement() throws Exception {
        // Initialize the database
        emplacementRepository.saveAndFlush(emplacement);

        // Get the emplacement
        restEmplacementMockMvc.perform(get("/api/emplacements/{id}", emplacement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(emplacement.getId().intValue()))
            .andExpect(jsonPath("$.nomEmplacement").value(DEFAULT_NOM_EMPLACEMENT));
    }
    @Test
    @Transactional
    public void getNonExistingEmplacement() throws Exception {
        // Get the emplacement
        restEmplacementMockMvc.perform(get("/api/emplacements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmplacement() throws Exception {
        // Initialize the database
        emplacementService.save(emplacement);

        int databaseSizeBeforeUpdate = emplacementRepository.findAll().size();

        // Update the emplacement
        Emplacement updatedEmplacement = emplacementRepository.findById(emplacement.getId()).get();
        // Disconnect from session so that the updates on updatedEmplacement are not directly saved in db
        em.detach(updatedEmplacement);
        updatedEmplacement
            .nomEmplacement(UPDATED_NOM_EMPLACEMENT);

        restEmplacementMockMvc.perform(put("/api/emplacements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmplacement)))
            .andExpect(status().isOk());

        // Validate the Emplacement in the database
        List<Emplacement> emplacementList = emplacementRepository.findAll();
        assertThat(emplacementList).hasSize(databaseSizeBeforeUpdate);
        Emplacement testEmplacement = emplacementList.get(emplacementList.size() - 1);
        assertThat(testEmplacement.getNomEmplacement()).isEqualTo(UPDATED_NOM_EMPLACEMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmplacement() throws Exception {
        int databaseSizeBeforeUpdate = emplacementRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmplacementMockMvc.perform(put("/api/emplacements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emplacement)))
            .andExpect(status().isBadRequest());

        // Validate the Emplacement in the database
        List<Emplacement> emplacementList = emplacementRepository.findAll();
        assertThat(emplacementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmplacement() throws Exception {
        // Initialize the database
        emplacementService.save(emplacement);

        int databaseSizeBeforeDelete = emplacementRepository.findAll().size();

        // Delete the emplacement
        restEmplacementMockMvc.perform(delete("/api/emplacements/{id}", emplacement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Emplacement> emplacementList = emplacementRepository.findAll();
        assertThat(emplacementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
