
package br.com.principal.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.Documento;
import br.com.principal.backend.repository.DocumentoRepository;

@Service
public class DocumentoService {

    private final DocumentoRepository repository;

    public DocumentoService(DocumentoRepository repository) {
        this.repository = repository;
    }

    public Documento salvar(Documento documento) {

        if (documento.getTipoDocumento() == null
                || documento.getTipoDocumento().isBlank()) {

            throw new IllegalArgumentException(
                    "O campo tipoDocumento é obrigatório."
            );
        }

        if (documento.getLinkArquivo() == null
                || documento.getLinkArquivo().isBlank()) {

            throw new IllegalArgumentException(
                    "O campo linkArquivo é obrigatório."
            );
        }

        try {
            return repository.save(documento);

        } catch (DataIntegrityViolationException e) {

            throw new IllegalArgumentException(
                    "Não foi possível cadastrar o documento."
            );
        }
    }

    public List<Documento> listarTodos() {
        return repository.findAll();
    }

    public Documento buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Documento não encontrado."
                        )
                );
    }

    public List<Documento> buscarPorTipo(String tipoDocumento) {
        return repository.findByTipoDocumento(tipoDocumento);
    }

    public List<Documento> buscarPorDataValidade(
            LocalDate dataValidade) {

        return repository.findByDataValidade(dataValidade);
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Documento não encontrado."
            );
        }

        repository.deleteById(id);
    }
}

