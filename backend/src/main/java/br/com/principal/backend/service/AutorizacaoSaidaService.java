
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.AutorizacaoSaida;
import br.com.principal.backend.repository.AutorizacaoSaidaRepository;

@Service
public class AutorizacaoSaidaService {

    private final AutorizacaoSaidaRepository repository;

    public AutorizacaoSaidaService(
            AutorizacaoSaidaRepository repository) {

        this.repository = repository;
    }

    public AutorizacaoSaida salvar(
            AutorizacaoSaida autorizacao) {

        return repository.save(autorizacao);
    }

    public List<AutorizacaoSaida> listarTodos() {

        return repository.findAll();
    }

    public List<AutorizacaoSaida> listarPorAluno(
            Long idAluno) {

        return repository.findByIdAluno(idAluno);
    }

    public AutorizacaoSaida buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Autorização de saída não encontrada: "
                                        + id
                        )
                );
    }

    public void excluir(Long id) {

        repository.deleteById(id);
    }
}

