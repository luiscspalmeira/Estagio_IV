package br.com.principal.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "documento_responsavel")
public class DocumentoResponsavel {

    @EmbeddedId
    private DocumentoResponsavelId id;

    public DocumentoResponsavel() {
    }

    public DocumentoResponsavel(DocumentoResponsavelId id) {
        this.id = id;
    }

    public DocumentoResponsavelId getId() {
        return id;
    }

    public void setId(DocumentoResponsavelId id) {
        this.id = id;
    }

}
