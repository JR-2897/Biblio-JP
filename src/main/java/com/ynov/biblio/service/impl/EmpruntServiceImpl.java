package com.ynov.biblio.service.impl;

import com.ynov.biblio.service.EmpruntService;
import com.ynov.biblio.domain.Emprunt;
import com.ynov.biblio.repository.EmpruntRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Emprunt}.
 */
@Service
@Transactional
public class EmpruntServiceImpl implements EmpruntService {

    private final Logger log = LoggerFactory.getLogger(EmpruntServiceImpl.class);

    private final EmpruntRepository empruntRepository;

    public EmpruntServiceImpl(EmpruntRepository empruntRepository) {
        this.empruntRepository = empruntRepository;
    }

    @Override
    public Emprunt save(Emprunt emprunt) {
        log.debug("Request to save Emprunt : {}", emprunt);
        return empruntRepository.save(emprunt);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Emprunt> findAll(Pageable pageable) {
        log.debug("Request to get all Emprunts");
        return empruntRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Emprunt> findOne(Long id) {
        log.debug("Request to get Emprunt : {}", id);
        return empruntRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Emprunt : {}", id);
        empruntRepository.deleteById(id);
    }
}
