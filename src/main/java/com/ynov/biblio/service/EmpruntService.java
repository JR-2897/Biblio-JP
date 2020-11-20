package com.ynov.biblio.service;

import com.ynov.biblio.domain.Emprunt;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Emprunt}.
 */
public interface EmpruntService {

    /**
     * Save a emprunt.
     *
     * @param emprunt the entity to save.
     * @return the persisted entity.
     */
    Emprunt save(Emprunt emprunt);

    /**
     * Get all the emprunts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Emprunt> findAll(Pageable pageable);


    /**
     * Get the "id" emprunt.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Emprunt> findOne(Long id);

    /**
     * Delete the "id" emprunt.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
