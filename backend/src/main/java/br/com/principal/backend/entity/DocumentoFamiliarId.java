
package br.com.principal.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DocumentoFamiliarId implements Serializable {

    @Column(name = "id_documento")
    private Long idDocumento;

    @Column(name = "id_familiar")
    private Long idFamiliar;

    public DocumentoFamiliarId() {
    }

    public DocumentoFamiliarId(
            Long idDocumento,
            Long idFamiliar) {

        this.idDocumento = idDocumento;
        this.idFamiliar = idFamiliar;
    }

    public Long getIdDocumento() {
        return idDocumento;
    }

    public void setIdDocumento(Long idDocumento) {
        this.idDocumento = idDocumento;
    }

    public Long getIdFamiliar() {
        return idFamiliar;
    }

    public void setIdFamiliar(Long idFamiliar) {
        this.idFamiliar = idFamiliar;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }

        if (!(o instanceof DocumentoFamiliarId)) {
            return false;
        }

        DocumentoFamiliarId that =
                (DocumentoFamiliarId) o;

        return Objects.equals(
                idDocumento,
                that.idDocumento
        )
        &&
        Objects.equals(
                idFamiliar,
                that.idFamiliar
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                idDocumento,
                idFamiliar
        );
    }
}

