package com.ynov.biblio.service;

import com.ynov.biblio.domain.Emplacement;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Emplacement}.
 */
public interface EmplacementService {

    /**
     * Save a emplacement.
     *
     * @param emplacement the entity to save.
     * @return the persisted entity.
     */
    Emplacement save(Emplacement emplacement);

    /**
     * Get all the emplacements.
     *
     * @return the list of entities.
     */
    List<Emplacement> findAll();


    /**
     * Get the "id" emplacement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Emplacement> findOne(Long id);

    /**
     * Delete the "id" emplacement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
