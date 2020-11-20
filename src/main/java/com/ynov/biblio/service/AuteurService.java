package com.ynov.biblio.service;

import com.ynov.biblio.domain.Auteur;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Auteur}.
 */
public interface AuteurService {

    /**
     * Save a auteur.
     *
     * @param auteur the entity to save.
     * @return the persisted entity.
     */
    Auteur save(Auteur auteur);

    /**
     * Get all the auteurs.
     *
     * @return the list of entities.
     */
    List<Auteur> findAll();


    /**
     * Get the "id" auteur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Auteur> findOne(Long id);

    /**
     * Delete the "id" auteur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
