package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.DocumentoResponsavel;
import br.com.principal.backend.entity.DocumentoResponsavelId;

public interface DocumentoResponsavelRepository
        extends JpaRepository<DocumentoResponsavel, DocumentoResponsavelId> {

    List<DocumentoResponsavel> findByIdIdDocumento(Long idDocumento);

    List<DocumentoResponsavel> findByIdIdResponsavel(Long idResponsavel);

}
