package com.ynov.biblio.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Emplacement.
 */
@Entity
@Table(name = "emplacement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Emplacement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_emplacement")
    private String nomEmplacement;

    @ManyToMany(mappedBy = "emplacements")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Livre> livres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomEmplacement() {
        return nomEmplacement;
    }

    public Emplacement nomEmplacement(String nomEmplacement) {
        this.nomEmplacement = nomEmplacement;
        return this;
    }

    public void setNomEmplacement(String nomEmplacement) {
        this.nomEmplacement = nomEmplacement;
    }

    public Set<Livre> getLivres() {
        return livres;
    }

    public Emplacement livres(Set<Livre> livres) {
        this.livres = livres;
        return this;
    }

    public Emplacement addLivre(Livre livre) {
        this.livres.add(livre);
        livre.getEmplacements().add(this);
        return this;
    }

    public Emplacement removeLivre(Livre livre) {
        this.livres.remove(livre);
        livre.getEmplacements().remove(this);
        return this;
    }

    public void setLivres(Set<Livre> livres) {
        this.livres = livres;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Emplacement)) {
            return false;
        }
        return id != null && id.equals(((Emplacement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Emplacement{" +
            "id=" + getId() +
            ", nomEmplacement='" + getNomEmplacement() + "'" +
            "}";
    }
}
