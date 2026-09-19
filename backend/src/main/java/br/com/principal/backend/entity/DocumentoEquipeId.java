package br.com.principal.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DocumentoEquipeId implements Serializable {

    @Column(name = "id_documento")
    private Long idDocumento;

    @Column(name = "id_colaborador")
    private Long idColaborador;

    public DocumentoEquipeId() {
    }

    public DocumentoEquipeId(Long idDocumento, Long idColaborador) {
        this.idDocumento = idDocumento;
        this.idColaborador = idColaborador;
    }

    public Long getIdDocumento() {
        return idDocumento;
    }

    public void setIdDocumento(Long idDocumento) {
        this.idDocumento = idDocumento;
    }

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof DocumentoEquipeId)) {
            return false;
        }

        DocumentoEquipeId that = (DocumentoEquipeId) o;

        return Objects.equals(idDocumento, that.idDocumento)
                && Objects.equals(idColaborador, that.idColaborador);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDocumento, idColaborador);
    }

}
