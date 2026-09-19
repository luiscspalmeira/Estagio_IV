
package br.com.principal.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.AvaliacaoMultidisciplinar;
import br.com.principal.backend.repository.AvaliacaoMultidisciplinarRepository;

@Service
public class AvaliacaoMultidisciplinarService {

    private final AvaliacaoMultidisciplinarRepository repository;

    public AvaliacaoMultidisciplinarService(
            AvaliacaoMultidisciplinarRepository repository) {
        this.repository = repository;
    }

    public AvaliacaoMultidisciplinar salvar(
            AvaliacaoMultidisciplinar avaliacao) {

        return repository.save(avaliacao);
    }

    public List<AvaliacaoMultidisciplinar> listarTodos() {

        return repository.findAll();
    }

    public List<AvaliacaoMultidisciplinar> listarPorAluno(
            Long idAluno) {

        return repository.findByIdAluno(idAluno);
    }

    public List<AvaliacaoMultidisciplinar> listarPorColaborador(
            Long idColaborador) {

        return repository.findByIdColaborador(idColaborador);
    }

    public List<AvaliacaoMultidisciplinar> listarPorData(
            LocalDate dataAvaliacao) {

        return repository.findByDataAvaliacao(dataAvaliacao);
    }

    public AvaliacaoMultidisciplinar buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Avaliação multidisciplinar não encontrada: "
                                        + id));
    }

    public void excluir(Long id) {

        repository.deleteById(id);
    }
}

