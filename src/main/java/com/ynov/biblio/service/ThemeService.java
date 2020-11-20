package com.ynov.biblio.service;

import com.ynov.biblio.domain.Theme;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Theme}.
 */
public interface ThemeService {

    /**
     * Save a theme.
     *
     * @param theme the entity to save.
     * @return the persisted entity.
     */
    Theme save(Theme theme);

    /**
     * Get all the themes.
     *
     * @return the list of entities.
     */
    List<Theme> findAll();


    /**
     * Get the "id" theme.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Theme> findOne(Long id);

    /**
     * Delete the "id" theme.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
