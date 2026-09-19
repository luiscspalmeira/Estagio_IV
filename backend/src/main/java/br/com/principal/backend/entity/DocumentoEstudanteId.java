
package br.com.principal.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DocumentoEstudanteId implements Serializable {

    @Column(name = "id_documento")
    private Long idDocumento;

    @Column(name = "id_aluno")
    private Long idAluno;

    public DocumentoEstudanteId() {
    }

    public DocumentoEstudanteId(Long idDocumento, Long idAluno) {
        this.idDocumento = idDocumento;
        this.idAluno = idAluno;
    }

    public Long getIdDocumento() {
        return idDocumento;
    }

    public void setIdDocumento(Long idDocumento) {
        this.idDocumento = idDocumento;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }

        if (!(o instanceof DocumentoEstudanteId)) {
            return false;
        }

        DocumentoEstudanteId that =
                (DocumentoEstudanteId) o;

        return Objects.equals(
                    idDocumento,
                    that.idDocumento
                )
                &&
                Objects.equals(
                    idAluno,
                    that.idAluno
                );
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDocumento, idAluno);
    }
}

