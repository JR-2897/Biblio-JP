package com.ynov.biblio.repository;

import com.ynov.biblio.domain.Livre;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Livre entity.
 */
@Repository
public interface LivreRepository extends JpaRepository<Livre, Long> {

    @Query(value = "select distinct livre from Livre livre left join fetch livre.auteurs left join fetch livre.themes left join fetch livre.emplacements",
        countQuery = "select count(distinct livre) from Livre livre")
    Page<Livre> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct livre from Livre livre left join fetch livre.auteurs left join fetch livre.themes left join fetch livre.emplacements")
    List<Livre> findAllWithEagerRelationships();

    @Query("select livre from Livre livre left join fetch livre.auteurs left join fetch livre.themes left join fetch livre.emplacements where livre.id =:id")
    Optional<Livre> findOneWithEagerRelationships(@Param("id") Long id);
}
