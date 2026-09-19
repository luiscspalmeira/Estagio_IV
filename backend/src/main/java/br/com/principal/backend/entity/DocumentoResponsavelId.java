package br.com.principal.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DocumentoResponsavelId implements Serializable {

    @Column(name = "id_documento")
    private Long idDocumento;

    @Column(name = "id_responsavel")
    private Long idResponsavel;

    public DocumentoResponsavelId() {
    }

    public DocumentoResponsavelId(Long idDocumento, Long idResponsavel) {
        this.idDocumento = idDocumento;
        this.idResponsavel = idResponsavel;
    }

    public Long getIdDocumento() {
        return idDocumento;
    }

    public void setIdDocumento(Long idDocumento) {
        this.idDocumento = idDocumento;
    }

    public Long getIdResponsavel() {
        return idResponsavel;
    }

    public void setIdResponsavel(Long idResponsavel) {
        this.idResponsavel = idResponsavel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof DocumentoResponsavelId)) {
            return false;
        }

        DocumentoResponsavelId that = (DocumentoResponsavelId) o;

        return Objects.equals(idDocumento, that.idDocumento)
                && Objects.equals(idResponsavel, that.idResponsavel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDocumento, idResponsavel);
    }

}
