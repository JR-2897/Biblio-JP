package com.ynov.biblio.repository;

import com.ynov.biblio.domain.Utilisateur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Utilisateur entity.
 */

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
