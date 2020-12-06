package com.ynov.biblio.repository;

import com.ynov.biblio.domain.Emprunt;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Emprunt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {
}
