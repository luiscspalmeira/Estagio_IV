
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.AcompanhanteAutorizado;
import br.com.principal.backend.repository.AcompanhanteAutorizadoRepository;

@Service
public class AcompanhanteAutorizadoService {

    private final AcompanhanteAutorizadoRepository repository;

    public AcompanhanteAutorizadoService(
            AcompanhanteAutorizadoRepository repository) {

        this.repository = repository;
    }

    public AcompanhanteAutorizado salvar(
            AcompanhanteAutorizado acompanhante) {

        return repository.save(acompanhante);
    }

    public List<AcompanhanteAutorizado> listarTodos() {

        return repository.findAll();
    }

    public List<AcompanhanteAutorizado> listarPorAluno(
            Long idAluno) {

        return repository.findByIdAluno(idAluno);
    }

    public AcompanhanteAutorizado buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Acompanhante autorizado não encontrado: "
                                        + id
                        )
                );
    }

    public void excluir(Long id) {

        repository.deleteById(id);
    }
}

