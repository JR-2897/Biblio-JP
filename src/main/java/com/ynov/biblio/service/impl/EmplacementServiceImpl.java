package com.ynov.biblio.service.impl;

import com.ynov.biblio.service.EmplacementService;
import com.ynov.biblio.domain.Emplacement;
import com.ynov.biblio.repository.EmplacementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Emplacement}.
 */
@Service
@Transactional
public class EmplacementServiceImpl implements EmplacementService {

    private final Logger log = LoggerFactory.getLogger(EmplacementServiceImpl.class);

    private final EmplacementRepository emplacementRepository;

    public EmplacementServiceImpl(EmplacementRepository emplacementRepository) {
        this.emplacementRepository = emplacementRepository;
    }

    @Override
    public Emplacement save(Emplacement emplacement) {
        log.debug("Request to save Emplacement : {}", emplacement);
        return emplacementRepository.save(emplacement);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Emplacement> findAll() {
        log.debug("Request to get all Emplacements");
        return emplacementRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Emplacement> findOne(Long id) {
        log.debug("Request to get Emplacement : {}", id);
        return emplacementRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Emplacement : {}", id);
        emplacementRepository.deleteById(id);
    }
}
