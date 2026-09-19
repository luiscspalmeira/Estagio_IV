package br.com.principal.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.DocumentoResponsavel;
import br.com.principal.backend.entity.DocumentoResponsavelId;
import br.com.principal.backend.repository.DocumentoResponsavelRepository;

@Service
public class DocumentoResponsavelService {

    private final DocumentoResponsavelRepository repository;

    public DocumentoResponsavelService(
            DocumentoResponsavelRepository repository) {
        this.repository = repository;
    }

    public DocumentoResponsavel salvar(DocumentoResponsavel documentoResponsavel) {

        if (documentoResponsavel == null) {
            throw new IllegalArgumentException(
                    "O documento do responsável não pode ser nulo.");
        }

        if (documentoResponsavel.getId() == null) {
            throw new IllegalArgumentException(
                    "A chave do documento do responsável é obrigatória.");
        }

        if (documentoResponsavel.getId().getIdDocumento() == null) {
            throw new IllegalArgumentException(
                    "O id_documento é obrigatório.");
        }

        if (documentoResponsavel.getId().getIdResponsavel() == null) {
            throw new IllegalArgumentException(
                    "O id_responsavel é obrigatório.");
        }

        try {
            return repository.save(documentoResponsavel);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(
                    "Não foi possível cadastrar o vínculo. " +
                            "Verifique se o documento e o responsável existem " +
                            "e se esse vínculo já não foi cadastrado.");
        }
    }

    public List<DocumentoResponsavel> listarTodos() {
        return repository.findAll();
    }

    public Optional<DocumentoResponsavel> buscarPorId(
            DocumentoResponsavelId id) {

        return repository.findById(id);
    }

    public List<DocumentoResponsavel> buscarPorDocumento(
            Long idDocumento) {

        return repository.findByIdIdDocumento(idDocumento);
    }

    public List<DocumentoResponsavel> buscarPorResponsavel(
            Long idResponsavel) {

        return repository.findByIdIdResponsavel(idResponsavel);
    }

    public void excluir(DocumentoResponsavelId id) {
        repository.deleteById(id);
    }

}
