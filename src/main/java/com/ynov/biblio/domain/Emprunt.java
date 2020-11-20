package com.ynov.biblio.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Emprunt.
 */
@Entity
@Table(name = "emprunt")
public class Emprunt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_emprunt")
    private ZonedDateTime dateEmprunt;

    @Column(name = "nb_notif_retard")
    private Integer nbNotifRetard;

    @Column(name = "derniere_date_notif")
    private ZonedDateTime derniereDateNotif;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprunts", allowSetters = true)
    private Utilisateur utilisateur;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprunts", allowSetters = true)
    private Exemplaire exemplaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateEmprunt() {
        return dateEmprunt;
    }

    public Emprunt dateEmprunt(ZonedDateTime dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
        return this;
    }

    public void setDateEmprunt(ZonedDateTime dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
    }

    public Integer getNbNotifRetard() {
        return nbNotifRetard;
    }

    public Emprunt nbNotifRetard(Integer nbNotifRetard) {
        this.nbNotifRetard = nbNotifRetard;
        return this;
    }

    public void setNbNotifRetard(Integer nbNotifRetard) {
        this.nbNotifRetard = nbNotifRetard;
    }

    public ZonedDateTime getDerniereDateNotif() {
        return derniereDateNotif;
    }

    public Emprunt derniereDateNotif(ZonedDateTime derniereDateNotif) {
        this.derniereDateNotif = derniereDateNotif;
        return this;
    }

    public void setDerniereDateNotif(ZonedDateTime derniereDateNotif) {
        this.derniereDateNotif = derniereDateNotif;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Emprunt utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Exemplaire getExemplaire() {
        return exemplaire;
    }

    public Emprunt exemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
        return this;
    }

    public void setExemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Emprunt)) {
            return false;
        }
        return id != null && id.equals(((Emprunt) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Emprunt{" +
            "id=" + getId() +
            ", dateEmprunt='" + getDateEmprunt() + "'" +
            ", nbNotifRetard=" + getNbNotifRetard() +
            ", derniereDateNotif='" + getDerniereDateNotif() + "'" +
            "}";
    }
}
