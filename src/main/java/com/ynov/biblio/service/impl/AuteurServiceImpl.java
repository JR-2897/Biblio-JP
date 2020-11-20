package com.ynov.biblio.service.impl;

import com.ynov.biblio.service.AuteurService;
import com.ynov.biblio.domain.Auteur;
import com.ynov.biblio.repository.AuteurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Auteur}.
 */
@Service
@Transactional
public class AuteurServiceImpl implements AuteurService {

    private final Logger log = LoggerFactory.getLogger(AuteurServiceImpl.class);

    private final AuteurRepository auteurRepository;

    public AuteurServiceImpl(AuteurRepository auteurRepository) {
        this.auteurRepository = auteurRepository;
    }

    @Override
    public Auteur save(Auteur auteur) {
        log.debug("Request to save Auteur : {}", auteur);
        return auteurRepository.save(auteur);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Auteur> findAll() {
        log.debug("Request to get all Auteurs");
        return auteurRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Auteur> findOne(Long id) {
        log.debug("Request to get Auteur : {}", id);
        return auteurRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Auteur : {}", id);
        auteurRepository.deleteById(id);
    }
}
