
package br.com.principal.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class EspetaculoColetivoId implements Serializable {

    @Column(name = "id_espetaculo", nullable = false)
    private Long idEspetaculo;

    @Column(name = "id_coletivo", nullable = false)
    private Long idColetivo;

    public EspetaculoColetivoId() {
    }

    public EspetaculoColetivoId(Long idEspetaculo, Long idColetivo) {
        this.idEspetaculo = idEspetaculo;
        this.idColetivo = idColetivo;
    }

    public Long getIdEspetaculo() {
        return idEspetaculo;
    }

    public void setIdEspetaculo(Long idEspetaculo) {
        this.idEspetaculo = idEspetaculo;
    }

    public Long getIdColetivo() {
        return idColetivo;
    }

    public void setIdColetivo(Long idColetivo) {
        this.idColetivo = idColetivo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof EspetaculoColetivoId)) {
            return false;
        }

        EspetaculoColetivoId that = (EspetaculoColetivoId) o;

        return Objects.equals(idEspetaculo, that.idEspetaculo)
                && Objects.equals(idColetivo, that.idColetivo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idEspetaculo, idColetivo);
    }
}

