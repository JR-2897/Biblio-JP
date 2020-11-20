package com.ynov.biblio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ynov.biblio.web.rest.TestUtil;

public class AuteurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Auteur.class);
        Auteur auteur1 = new Auteur();
        auteur1.setId(1L);
        Auteur auteur2 = new Auteur();
        auteur2.setId(auteur1.getId());
        assertThat(auteur1).isEqualTo(auteur2);
        auteur2.setId(2L);
        assertThat(auteur1).isNotEqualTo(auteur2);
        auteur1.setId(null);
        assertThat(auteur1).isNotEqualTo(auteur2);
    }
}
