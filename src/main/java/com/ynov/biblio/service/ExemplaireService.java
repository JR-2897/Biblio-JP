package com.ynov.biblio.service;

import com.ynov.biblio.domain.Exemplaire;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Exemplaire}.
 */
public interface ExemplaireService {

    /**
     * Save a exemplaire.
     *
     * @param exemplaire the entity to save.
     * @return the persisted entity.
     */
    Exemplaire save(Exemplaire exemplaire);

    /**
     * Get all the exemplaires.
     *
     * @return the list of entities.
     */
    List<Exemplaire> findAll();


    /**
     * Get the "id" exemplaire.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Exemplaire> findOne(Long id);

    /**
     * Delete the "id" exemplaire.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
