package com.ynov.biblio.repository;

import com.ynov.biblio.domain.Emplacement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Emplacement entity.
 */

@Repository
public interface EmplacementRepository extends JpaRepository<Emplacement, Long> {
}
