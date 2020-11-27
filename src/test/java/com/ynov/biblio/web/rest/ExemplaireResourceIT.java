package com.ynov.biblio.web.rest;

import com.ynov.biblio.BiblioJpApp;
import com.ynov.biblio.domain.Exemplaire;
import com.ynov.biblio.repository.ExemplaireRepository;

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
 * Integration tests for the {@link ExemplaireResource} REST controller.
 */
@SpringBootTest(classes = BiblioJpApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExemplaireResourceIT {

    private static final Boolean DEFAULT_DISPONIBILITE = false;
    private static final Boolean UPDATED_DISPONIBILITE = true;

    @Autowired
    private ExemplaireRepository exemplaireRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExemplaireMockMvc;

    private Exemplaire exemplaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exemplaire createEntity(EntityManager em) {
        Exemplaire exemplaire = new Exemplaire()
            .disponibilite(DEFAULT_DISPONIBILITE);
        return exemplaire;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exemplaire createUpdatedEntity(EntityManager em) {
        Exemplaire exemplaire = new Exemplaire()
            .disponibilite(UPDATED_DISPONIBILITE);
        return exemplaire;
    }

    @BeforeEach
    public void initTest() {
        exemplaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createExemplaire() throws Exception {
        int databaseSizeBeforeCreate = exemplaireRepository.findAll().size();
        // Create the Exemplaire
        restExemplaireMockMvc.perform(post("/api/exemplaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exemplaire)))
            .andExpect(status().isCreated());

        // Validate the Exemplaire in the database
        List<Exemplaire> exemplaireList = exemplaireRepository.findAll();
        assertThat(exemplaireList).hasSize(databaseSizeBeforeCreate + 1);
        Exemplaire testExemplaire = exemplaireList.get(exemplaireList.size() - 1);
        assertThat(testExemplaire.isDisponibilite()).isEqualTo(DEFAULT_DISPONIBILITE);
    }

    @Test
    @Transactional
    public void createExemplaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exemplaireRepository.findAll().size();

        // Create the Exemplaire with an existing ID
        exemplaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExemplaireMockMvc.perform(post("/api/exemplaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exemplaire)))
            .andExpect(status().isBadRequest());

        // Validate the Exemplaire in the database
        List<Exemplaire> exemplaireList = exemplaireRepository.findAll();
        assertThat(exemplaireList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExemplaires() throws Exception {
        // Initialize the database
        exemplaireRepository.saveAndFlush(exemplaire);

        // Get all the exemplaireList
        restExemplaireMockMvc.perform(get("/api/exemplaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exemplaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].disponibilite").value(hasItem(DEFAULT_DISPONIBILITE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getExemplaire() throws Exception {
        // Initialize the database
        exemplaireRepository.saveAndFlush(exemplaire);

        // Get the exemplaire
        restExemplaireMockMvc.perform(get("/api/exemplaires/{id}", exemplaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exemplaire.getId().intValue()))
            .andExpect(jsonPath("$.disponibilite").value(DEFAULT_DISPONIBILITE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingExemplaire() throws Exception {
        // Get the exemplaire
        restExemplaireMockMvc.perform(get("/api/exemplaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExemplaire() throws Exception {
        // Initialize the database
        exemplaireRepository.saveAndFlush(exemplaire);

        int databaseSizeBeforeUpdate = exemplaireRepository.findAll().size();

        // Update the exemplaire
        Exemplaire updatedExemplaire = exemplaireRepository.findById(exemplaire.getId()).get();
        // Disconnect from session so that the updates on updatedExemplaire are not directly saved in db
        em.detach(updatedExemplaire);
        updatedExemplaire
            .disponibilite(UPDATED_DISPONIBILITE);

        restExemplaireMockMvc.perform(put("/api/exemplaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExemplaire)))
            .andExpect(status().isOk());

        // Validate the Exemplaire in the database
        List<Exemplaire> exemplaireList = exemplaireRepository.findAll();
        assertThat(exemplaireList).hasSize(databaseSizeBeforeUpdate);
        Exemplaire testExemplaire = exemplaireList.get(exemplaireList.size() - 1);
        assertThat(testExemplaire.isDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    public void updateNonExistingExemplaire() throws Exception {
        int databaseSizeBeforeUpdate = exemplaireRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExemplaireMockMvc.perform(put("/api/exemplaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exemplaire)))
            .andExpect(status().isBadRequest());

        // Validate the Exemplaire in the database
        List<Exemplaire> exemplaireList = exemplaireRepository.findAll();
        assertThat(exemplaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExemplaire() throws Exception {
        // Initialize the database
        exemplaireRepository.saveAndFlush(exemplaire);

        int databaseSizeBeforeDelete = exemplaireRepository.findAll().size();

        // Delete the exemplaire
        restExemplaireMockMvc.perform(delete("/api/exemplaires/{id}", exemplaire.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Exemplaire> exemplaireList = exemplaireRepository.findAll();
        assertThat(exemplaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
