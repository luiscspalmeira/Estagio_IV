package br.com.principal.backend.service;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.DocumentoEstudante;
import br.com.principal.backend.entity.DocumentoEstudanteId;
import br.com.principal.backend.repository.DocumentoEstudanteRepository;

@Service
public class DocumentoEstudanteService {

    private final DocumentoEstudanteRepository repository;

    public DocumentoEstudanteService(
            DocumentoEstudanteRepository repository) {

        this.repository = repository;
    }

    public DocumentoEstudante salvar(
            DocumentoEstudante documentoEstudante) {

        if (documentoEstudante.getId() == null) {

            throw new IllegalArgumentException(
                    "Os campos idDocumento e idAluno são obrigatórios."
            );
        }

        if (documentoEstudante.getId().getIdDocumento() == null) {

            throw new IllegalArgumentException(
                    "O campo idDocumento é obrigatório."
            );
        }

        if (documentoEstudante.getId().getIdAluno() == null) {

            throw new IllegalArgumentException(
                    "O campo idAluno é obrigatório."
            );
        }

        try {

            return repository.save(documentoEstudante);

        } catch (DataIntegrityViolationException e) {

            throw new IllegalArgumentException(
                    "Não foi possível vincular o documento ao estudante."
            );
        }
    }

    public List<DocumentoEstudante> listarTodos() {
        return repository.findAll();
    }

    public DocumentoEstudante buscarPorId(
            DocumentoEstudanteId id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Vínculo entre documento e estudante não encontrado."
                        )
                );
    }

    public List<DocumentoEstudante> buscarPorDocumento(
            Long idDocumento) {

        return repository.findByIdIdDocumento(idDocumento);
    }

    public List<DocumentoEstudante> buscarPorAluno(
            Long idAluno) {

        return repository.findByIdIdAluno(idAluno);
    }

    public void excluir(
            DocumentoEstudanteId id) {

        if (!repository.existsById(id)) {

            throw new IllegalArgumentException(
                    "Vínculo entre documento e estudante não encontrado."
            );
        }

        repository.deleteById(id);
    }
}