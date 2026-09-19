
package br.com.principal.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "documento_familiar")
public class DocumentoFamiliar {

    @EmbeddedId
    private DocumentoFamiliarId id;

    public DocumentoFamiliar() {
    }

    public DocumentoFamiliar(
            DocumentoFamiliarId id) {

        this.id = id;
    }

    public DocumentoFamiliarId getId() {
        return id;
    }

    public void setId(DocumentoFamiliarId id) {
        this.id = id;
    }
}

