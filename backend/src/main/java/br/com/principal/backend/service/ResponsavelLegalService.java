
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.ResponsavelLegal;
import br.com.principal.backend.repository.ResponsavelLegalRepository;

@Service
public class ResponsavelLegalService {

    private final ResponsavelLegalRepository repository;

    public ResponsavelLegalService(
            ResponsavelLegalRepository repository) {
        this.repository = repository;
    }

    public ResponsavelLegal salvar(
            ResponsavelLegal responsavel) {

        return repository.save(responsavel);
    }

    public List<ResponsavelLegal> listarTodos() {

        return repository.findAll();
    }

    public List<ResponsavelLegal> listarPorAluno(
            Long idAluno) {

        return repository.findByIdAluno(idAluno);
    }

    public ResponsavelLegal buscarPorId(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Responsável legal não encontrado: " + id
                        )
                );
    }

    public void excluir(Long id) {

        repository.deleteById(id);
    }
}

