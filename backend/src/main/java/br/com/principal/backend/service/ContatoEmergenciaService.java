
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.ContatoEmergencia;
import br.com.principal.backend.repository.ContatoEmergenciaRepository;

@Service
public class ContatoEmergenciaService {

    private final ContatoEmergenciaRepository repository;

    public ContatoEmergenciaService(
            ContatoEmergenciaRepository repository) {

        this.repository = repository;
    }

    public ContatoEmergencia salvar(
            ContatoEmergencia contato) {

        return repository.save(contato);
    }

    public List<ContatoEmergencia> listarTodos() {

        return repository.findAll();
    }

    public List<ContatoEmergencia> listarPorAluno(
            Long idAluno) {

        return repository
                .findByIdAlunoOrderByOrdemContatoAsc(idAluno);
    }

    public ContatoEmergencia buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Contato de emergência não encontrado: "
                                        + id
                        )
                );
    }

    public void excluir(Long id) {

        repository.deleteById(id);
    }
}

