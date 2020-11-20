package com.ynov.biblio.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Livre.
 */
@Entity
@Table(name = "livre")
public class Livre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "code")
    private String code;

    @ManyToMany
    @JoinTable(name = "livre_auteur",
               joinColumns = @JoinColumn(name = "livre_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "auteur_id", referencedColumnName = "id"))
    private Set<Auteur> auteurs = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "livre_theme",
               joinColumns = @JoinColumn(name = "livre_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "theme_id", referencedColumnName = "id"))
    private Set<Theme> themes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "livre_emplacement",
               joinColumns = @JoinColumn(name = "livre_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "emplacement_id", referencedColumnName = "id"))
    private Set<Emplacement> emplacements = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Livre titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public Livre description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public Livre isbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCode() {
        return code;
    }

    public Livre code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Auteur> getAuteurs() {
        return auteurs;
    }

    public Livre auteurs(Set<Auteur> auteurs) {
        this.auteurs = auteurs;
        return this;
    }

    public Livre addAuteur(Auteur auteur) {
        this.auteurs.add(auteur);
        auteur.getLivres().add(this);
        return this;
    }

    public Livre removeAuteur(Auteur auteur) {
        this.auteurs.remove(auteur);
        auteur.getLivres().remove(this);
        return this;
    }

    public void setAuteurs(Set<Auteur> auteurs) {
        this.auteurs = auteurs;
    }

    public Set<Theme> getThemes() {
        return themes;
    }

    public Livre themes(Set<Theme> themes) {
        this.themes = themes;
        return this;
    }

    public Livre addTheme(Theme theme) {
        this.themes.add(theme);
        theme.getLivres().add(this);
        return this;
    }

    public Livre removeTheme(Theme theme) {
        this.themes.remove(theme);
        theme.getLivres().remove(this);
        return this;
    }

    public void setThemes(Set<Theme> themes) {
        this.themes = themes;
    }

    public Set<Emplacement> getEmplacements() {
        return emplacements;
    }

    public Livre emplacements(Set<Emplacement> emplacements) {
        this.emplacements = emplacements;
        return this;
    }

    public Livre addEmplacement(Emplacement emplacement) {
        this.emplacements.add(emplacement);
        emplacement.getLivres().add(this);
        return this;
    }

    public Livre removeEmplacement(Emplacement emplacement) {
        this.emplacements.remove(emplacement);
        emplacement.getLivres().remove(this);
        return this;
    }

    public void setEmplacements(Set<Emplacement> emplacements) {
        this.emplacements = emplacements;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Livre)) {
            return false;
        }
        return id != null && id.equals(((Livre) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Livre{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", description='" + getDescription() + "'" +
            ", isbn='" + getIsbn() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
