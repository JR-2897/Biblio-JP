package com.ynov.biblio.web.rest;

import com.ynov.biblio.BiblioJpApp;
import com.ynov.biblio.config.TestSecurityConfiguration;
import com.ynov.biblio.domain.Livre;
import com.ynov.biblio.repository.LivreRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LivreResource} REST controller.
 */
@SpringBootTest(classes = { BiblioJpApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class LivreResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ISBN = "AAAAAAAAAA";
    private static final String UPDATED_ISBN = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private LivreRepository livreRepository;

    @Mock
    private LivreRepository livreRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLivreMockMvc;

    private Livre livre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Livre createEntity(EntityManager em) {
        Livre livre = new Livre()
            .titre(DEFAULT_TITRE)
            .description(DEFAULT_DESCRIPTION)
            .isbn(DEFAULT_ISBN)
            .code(DEFAULT_CODE);
        return livre;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Livre createUpdatedEntity(EntityManager em) {
        Livre livre = new Livre()
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION)
            .isbn(UPDATED_ISBN)
            .code(UPDATED_CODE);
        return livre;
    }

    @BeforeEach
    public void initTest() {
        livre = createEntity(em);
    }

    @Test
    @Transactional
    public void createLivre() throws Exception {
        int databaseSizeBeforeCreate = livreRepository.findAll().size();
        // Create the Livre
        restLivreMockMvc.perform(post("/api/livres").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livre)))
            .andExpect(status().isCreated());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeCreate + 1);
        Livre testLivre = livreList.get(livreList.size() - 1);
        assertThat(testLivre.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testLivre.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLivre.getIsbn()).isEqualTo(DEFAULT_ISBN);
        assertThat(testLivre.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createLivreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = livreRepository.findAll().size();

        // Create the Livre with an existing ID
        livre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLivreMockMvc.perform(post("/api/livres").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livre)))
            .andExpect(status().isBadRequest());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLivres() throws Exception {
        // Initialize the database
        livreRepository.saveAndFlush(livre);

        // Get all the livreList
        restLivreMockMvc.perform(get("/api/livres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(livre.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].isbn").value(hasItem(DEFAULT_ISBN)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllLivresWithEagerRelationshipsIsEnabled() throws Exception {
        when(livreRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restLivreMockMvc.perform(get("/api/livres?eagerload=true"))
            .andExpect(status().isOk());

        verify(livreRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllLivresWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(livreRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restLivreMockMvc.perform(get("/api/livres?eagerload=true"))
            .andExpect(status().isOk());

        verify(livreRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getLivre() throws Exception {
        // Initialize the database
        livreRepository.saveAndFlush(livre);

        // Get the livre
        restLivreMockMvc.perform(get("/api/livres/{id}", livre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(livre.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.isbn").value(DEFAULT_ISBN))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }
    @Test
    @Transactional
    public void getNonExistingLivre() throws Exception {
        // Get the livre
        restLivreMockMvc.perform(get("/api/livres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLivre() throws Exception {
        // Initialize the database
        livreRepository.saveAndFlush(livre);

        int databaseSizeBeforeUpdate = livreRepository.findAll().size();

        // Update the livre
        Livre updatedLivre = livreRepository.findById(livre.getId()).get();
        // Disconnect from session so that the updates on updatedLivre are not directly saved in db
        em.detach(updatedLivre);
        updatedLivre
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION)
            .isbn(UPDATED_ISBN)
            .code(UPDATED_CODE);

        restLivreMockMvc.perform(put("/api/livres").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLivre)))
            .andExpect(status().isOk());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeUpdate);
        Livre testLivre = livreList.get(livreList.size() - 1);
        assertThat(testLivre.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testLivre.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLivre.getIsbn()).isEqualTo(UPDATED_ISBN);
        assertThat(testLivre.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingLivre() throws Exception {
        int databaseSizeBeforeUpdate = livreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLivreMockMvc.perform(put("/api/livres").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livre)))
            .andExpect(status().isBadRequest());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLivre() throws Exception {
        // Initialize the database
        livreRepository.saveAndFlush(livre);

        int databaseSizeBeforeDelete = livreRepository.findAll().size();

        // Delete the livre
        restLivreMockMvc.perform(delete("/api/livres/{id}", livre.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
