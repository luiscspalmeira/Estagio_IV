
package br.com.principal.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "documento_estudante")
public class DocumentoEstudante {

    @EmbeddedId
    private DocumentoEstudanteId id;

    public DocumentoEstudante() {
    }

    public DocumentoEstudante(DocumentoEstudanteId id) {
        this.id = id;
    }

    public DocumentoEstudanteId getId() {
        return id;
    }

    public void setId(DocumentoEstudanteId id) {
        this.id = id;
    }
}

