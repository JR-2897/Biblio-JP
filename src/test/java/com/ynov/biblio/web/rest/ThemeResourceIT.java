package com.ynov.biblio.web.rest;

import com.ynov.biblio.BiblioJpApp;
import com.ynov.biblio.domain.Theme;
import com.ynov.biblio.repository.ThemeRepository;
import com.ynov.biblio.service.ThemeService;

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
 * Integration tests for the {@link ThemeResource} REST controller.
 */
@SpringBootTest(classes = BiblioJpApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ThemeResourceIT {

    private static final String DEFAULT_THEME = "AAAAAAAAAA";
    private static final String UPDATED_THEME = "BBBBBBBBBB";

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    private ThemeService themeService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThemeMockMvc;

    private Theme theme;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Theme createEntity(EntityManager em) {
        Theme theme = new Theme()
            .theme(DEFAULT_THEME);
        return theme;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Theme createUpdatedEntity(EntityManager em) {
        Theme theme = new Theme()
            .theme(UPDATED_THEME);
        return theme;
    }

    @BeforeEach
    public void initTest() {
        theme = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheme() throws Exception {
        int databaseSizeBeforeCreate = themeRepository.findAll().size();
        // Create the Theme
        restThemeMockMvc.perform(post("/api/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(theme)))
            .andExpect(status().isCreated());

        // Validate the Theme in the database
        List<Theme> themeList = themeRepository.findAll();
        assertThat(themeList).hasSize(databaseSizeBeforeCreate + 1);
        Theme testTheme = themeList.get(themeList.size() - 1);
        assertThat(testTheme.getTheme()).isEqualTo(DEFAULT_THEME);
    }

    @Test
    @Transactional
    public void createThemeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = themeRepository.findAll().size();

        // Create the Theme with an existing ID
        theme.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThemeMockMvc.perform(post("/api/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(theme)))
            .andExpect(status().isBadRequest());

        // Validate the Theme in the database
        List<Theme> themeList = themeRepository.findAll();
        assertThat(themeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllThemes() throws Exception {
        // Initialize the database
        themeRepository.saveAndFlush(theme);

        // Get all the themeList
        restThemeMockMvc.perform(get("/api/themes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theme.getId().intValue())))
            .andExpect(jsonPath("$.[*].theme").value(hasItem(DEFAULT_THEME)));
    }
    
    @Test
    @Transactional
    public void getTheme() throws Exception {
        // Initialize the database
        themeRepository.saveAndFlush(theme);

        // Get the theme
        restThemeMockMvc.perform(get("/api/themes/{id}", theme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(theme.getId().intValue()))
            .andExpect(jsonPath("$.theme").value(DEFAULT_THEME));
    }
    @Test
    @Transactional
    public void getNonExistingTheme() throws Exception {
        // Get the theme
        restThemeMockMvc.perform(get("/api/themes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheme() throws Exception {
        // Initialize the database
        themeService.save(theme);

        int databaseSizeBeforeUpdate = themeRepository.findAll().size();

        // Update the theme
        Theme updatedTheme = themeRepository.findById(theme.getId()).get();
        // Disconnect from session so that the updates on updatedTheme are not directly saved in db
        em.detach(updatedTheme);
        updatedTheme
            .theme(UPDATED_THEME);

        restThemeMockMvc.perform(put("/api/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheme)))
            .andExpect(status().isOk());

        // Validate the Theme in the database
        List<Theme> themeList = themeRepository.findAll();
        assertThat(themeList).hasSize(databaseSizeBeforeUpdate);
        Theme testTheme = themeList.get(themeList.size() - 1);
        assertThat(testTheme.getTheme()).isEqualTo(UPDATED_THEME);
    }

    @Test
    @Transactional
    public void updateNonExistingTheme() throws Exception {
        int databaseSizeBeforeUpdate = themeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThemeMockMvc.perform(put("/api/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(theme)))
            .andExpect(status().isBadRequest());

        // Validate the Theme in the database
        List<Theme> themeList = themeRepository.findAll();
        assertThat(themeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTheme() throws Exception {
        // Initialize the database
        themeService.save(theme);

        int databaseSizeBeforeDelete = themeRepository.findAll().size();

        // Delete the theme
        restThemeMockMvc.perform(delete("/api/themes/{id}", theme.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Theme> themeList = themeRepository.findAll();
        assertThat(themeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
