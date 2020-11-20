package com.ynov.biblio.repository;

import com.ynov.biblio.domain.Exemplaire;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Exemplaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExemplaireRepository extends JpaRepository<Exemplaire, Long> {
}
