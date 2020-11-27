package com.ynov.biblio.web.rest;

import com.ynov.biblio.domain.Emplacement;
import com.ynov.biblio.repository.EmplacementRepository;
import com.ynov.biblio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ynov.biblio.domain.Emplacement}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmplacementResource {

    private final Logger log = LoggerFactory.getLogger(EmplacementResource.class);

    private static final String ENTITY_NAME = "emplacement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmplacementRepository emplacementRepository;

    public EmplacementResource(EmplacementRepository emplacementRepository) {
        this.emplacementRepository = emplacementRepository;
    }

    /**
     * {@code POST  /emplacements} : Create a new emplacement.
     *
     * @param emplacement the emplacement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new emplacement, or with status {@code 400 (Bad Request)} if the emplacement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/emplacements")
    public ResponseEntity<Emplacement> createEmplacement(@RequestBody Emplacement emplacement) throws URISyntaxException {
        log.debug("REST request to save Emplacement : {}", emplacement);
        if (emplacement.getId() != null) {
            throw new BadRequestAlertException("A new emplacement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Emplacement result = emplacementRepository.save(emplacement);
        return ResponseEntity.created(new URI("/api/emplacements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /emplacements} : Updates an existing emplacement.
     *
     * @param emplacement the emplacement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emplacement,
     * or with status {@code 400 (Bad Request)} if the emplacement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the emplacement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/emplacements")
    public ResponseEntity<Emplacement> updateEmplacement(@RequestBody Emplacement emplacement) throws URISyntaxException {
        log.debug("REST request to update Emplacement : {}", emplacement);
        if (emplacement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Emplacement result = emplacementRepository.save(emplacement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, emplacement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /emplacements} : get all the emplacements.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of emplacements in body.
     */
    @GetMapping("/emplacements")
    public List<Emplacement> getAllEmplacements() {
        log.debug("REST request to get all Emplacements");
        return emplacementRepository.findAll();
    }

    /**
     * {@code GET  /emplacements/:id} : get the "id" emplacement.
     *
     * @param id the id of the emplacement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the emplacement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/emplacements/{id}")
    public ResponseEntity<Emplacement> getEmplacement(@PathVariable Long id) {
        log.debug("REST request to get Emplacement : {}", id);
        Optional<Emplacement> emplacement = emplacementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(emplacement);
    }

    /**
     * {@code DELETE  /emplacements/:id} : delete the "id" emplacement.
     *
     * @param id the id of the emplacement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/emplacements/{id}")
    public ResponseEntity<Void> deleteEmplacement(@PathVariable Long id) {
        log.debug("REST request to delete Emplacement : {}", id);
        emplacementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
