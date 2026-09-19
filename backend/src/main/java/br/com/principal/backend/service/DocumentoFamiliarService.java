
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.DocumentoFamiliar;
import br.com.principal.backend.entity.DocumentoFamiliarId;
import br.com.principal.backend.repository.DocumentoFamiliarRepository;

@Service
public class DocumentoFamiliarService {

    private final DocumentoFamiliarRepository repository;

    public DocumentoFamiliarService(
            DocumentoFamiliarRepository repository) {

        this.repository = repository;
    }

    public DocumentoFamiliar salvar(
            DocumentoFamiliar documentoFamiliar) {

        if (documentoFamiliar.getId() == null) {

            throw new IllegalArgumentException(
                    "Os campos idDocumento e idFamiliar são obrigatórios."
            );
        }

        if (documentoFamiliar.getId().getIdDocumento() == null) {

            throw new IllegalArgumentException(
                    "O campo idDocumento é obrigatório."
            );
        }

        if (documentoFamiliar.getId().getIdFamiliar() == null) {

            throw new IllegalArgumentException(
                    "O campo idFamiliar é obrigatório."
            );
        }

        try {

            return repository.save(documentoFamiliar);

        } catch (DataIntegrityViolationException e) {

            throw new IllegalArgumentException(
                    "Não foi possível vincular o documento ao familiar."
            );
        }
    }

    public List<DocumentoFamiliar> listarTodos() {
        return repository.findAll();
    }

    public DocumentoFamiliar buscarPorId(
            DocumentoFamiliarId id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Vínculo entre documento e familiar não encontrado."
                        )
                );
    }

    public List<DocumentoFamiliar> buscarPorDocumento(
            Long idDocumento) {

        return repository.findByIdIdDocumento(
                idDocumento
        );
    }

    public List<DocumentoFamiliar> buscarPorFamiliar(
            Long idFamiliar) {

        return repository.findByIdIdFamiliar(
                idFamiliar
        );
    }

    public void excluir(
            DocumentoFamiliarId id) {

        if (!repository.existsById(id)) {

            throw new IllegalArgumentException(
                    "Vínculo entre documento e familiar não encontrado."
            );
        }

        repository.deleteById(id);
    }
}

