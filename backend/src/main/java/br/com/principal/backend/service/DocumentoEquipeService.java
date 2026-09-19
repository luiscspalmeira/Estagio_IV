package br.com.principal.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.DocumentoEquipe;
import br.com.principal.backend.entity.DocumentoEquipeId;
import br.com.principal.backend.repository.DocumentoEquipeRepository;

@Service
public class DocumentoEquipeService {

    private final DocumentoEquipeRepository repository;

    public DocumentoEquipeService(
            DocumentoEquipeRepository repository) {
        this.repository = repository;
    }

    public DocumentoEquipe salvar(DocumentoEquipe documentoEquipe) {

        if (documentoEquipe == null) {
            throw new IllegalArgumentException(
                    "O documento da equipe não pode ser nulo.");
        }

        if (documentoEquipe.getId() == null) {
            throw new IllegalArgumentException(
                    "A chave do documento da equipe é obrigatória.");
        }

        if (documentoEquipe.getId().getIdDocumento() == null) {
            throw new IllegalArgumentException(
                    "O id_documento é obrigatório.");
        }

        if (documentoEquipe.getId().getIdColaborador() == null) {
            throw new IllegalArgumentException(
                    "O id_colaborador é obrigatório.");
        }

        DocumentoEquipeId id = documentoEquipe.getId();

        // Verifica se o vínculo já existe
        if (repository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Este documento já está vinculado a este colaborador.");
        }

        try {
            return repository.save(documentoEquipe);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(
                    "Não foi possível cadastrar o vínculo. " +
                            "Verifique se o documento e o colaborador existem.");
        }
    }

    public List<DocumentoEquipe> listarTodos() {
        return repository.findAll();
    }

    public Optional<DocumentoEquipe> buscarPorId(
            DocumentoEquipeId id) {

        return repository.findById(id);
    }

    public List<DocumentoEquipe> buscarPorDocumento(
            Long idDocumento) {

        return repository.findByIdIdDocumento(idDocumento);
    }

    public List<DocumentoEquipe> buscarPorColaborador(
            Long idColaborador) {

        return repository.findByIdIdColaborador(idColaborador);
    }

    public void excluir(DocumentoEquipeId id) {
        repository.deleteById(id);
    }

}
