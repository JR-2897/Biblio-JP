package com.ynov.biblio.web.rest;

import com.ynov.biblio.domain.Exemplaire;
import com.ynov.biblio.service.ExemplaireService;
import com.ynov.biblio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ynov.biblio.domain.Exemplaire}.
 */
@RestController
@RequestMapping("/api")
public class ExemplaireResource {

    private final Logger log = LoggerFactory.getLogger(ExemplaireResource.class);

    private static final String ENTITY_NAME = "exemplaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExemplaireService exemplaireService;

    public ExemplaireResource(ExemplaireService exemplaireService) {
        this.exemplaireService = exemplaireService;
    }

    /**
     * {@code POST  /exemplaires} : Create a new exemplaire.
     *
     * @param exemplaire the exemplaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new exemplaire, or with status {@code 400 (Bad Request)} if the exemplaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/exemplaires")
    public ResponseEntity<Exemplaire> createExemplaire(@RequestBody Exemplaire exemplaire) throws URISyntaxException {
        log.debug("REST request to save Exemplaire : {}", exemplaire);
        if (exemplaire.getId() != null) {
            throw new BadRequestAlertException("A new exemplaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Exemplaire result = exemplaireService.save(exemplaire);
        return ResponseEntity.created(new URI("/api/exemplaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /exemplaires} : Updates an existing exemplaire.
     *
     * @param exemplaire the exemplaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exemplaire,
     * or with status {@code 400 (Bad Request)} if the exemplaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the exemplaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/exemplaires")
    public ResponseEntity<Exemplaire> updateExemplaire(@RequestBody Exemplaire exemplaire) throws URISyntaxException {
        log.debug("REST request to update Exemplaire : {}", exemplaire);
        if (exemplaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Exemplaire result = exemplaireService.save(exemplaire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exemplaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /exemplaires} : get all the exemplaires.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of exemplaires in body.
     */
    @GetMapping("/exemplaires")
    public List<Exemplaire> getAllExemplaires() {
        log.debug("REST request to get all Exemplaires");
        return exemplaireService.findAll();
    }

    /**
     * {@code GET  /exemplaires/:id} : get the "id" exemplaire.
     *
     * @param id the id of the exemplaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the exemplaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/exemplaires/{id}")
    public ResponseEntity<Exemplaire> getExemplaire(@PathVariable Long id) {
        log.debug("REST request to get Exemplaire : {}", id);
        Optional<Exemplaire> exemplaire = exemplaireService.findOne(id);
        return ResponseUtil.wrapOrNotFound(exemplaire);
    }

    /**
     * {@code DELETE  /exemplaires/:id} : delete the "id" exemplaire.
     *
     * @param id the id of the exemplaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/exemplaires/{id}")
    public ResponseEntity<Void> deleteExemplaire(@PathVariable Long id) {
        log.debug("REST request to delete Exemplaire : {}", id);
        exemplaireService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
