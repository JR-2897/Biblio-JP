package com.ynov.biblio.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Theme.
 */
@Entity
@Table(name = "theme")
public class Theme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "theme")
    private String theme;

    @ManyToMany(mappedBy = "themes")
    @JsonIgnore
    private Set<Livre> livres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public Theme theme(String theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Set<Livre> getLivres() {
        return livres;
    }

    public Theme livres(Set<Livre> livres) {
        this.livres = livres;
        return this;
    }

    public Theme addLivre(Livre livre) {
        this.livres.add(livre);
        livre.getThemes().add(this);
        return this;
    }

    public Theme removeLivre(Livre livre) {
        this.livres.remove(livre);
        livre.getThemes().remove(this);
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
        if (!(o instanceof Theme)) {
            return false;
        }
        return id != null && id.equals(((Theme) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Theme{" +
            "id=" + getId() +
            ", theme='" + getTheme() + "'" +
            "}";
    }
}
