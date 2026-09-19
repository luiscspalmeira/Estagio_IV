package br.com.principal.backend.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "documento_equipe")
public class DocumentoEquipe {

    @EmbeddedId
    private DocumentoEquipeId id;

    public DocumentoEquipe() {
    }

    public DocumentoEquipe(DocumentoEquipeId id) {
        this.id = id;
    }

    public DocumentoEquipeId getId() {
        return id;
    }

    public void setId(DocumentoEquipeId id) {
        this.id = id;
    }

}
