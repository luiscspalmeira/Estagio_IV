package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.HistoricoEstudante;
import br.com.principal.backend.repository.HistoricoEstudanteRepository;

@Service
public class HistoricoEstudanteService {
    private final HistoricoEstudanteRepository repository;

    public HistoricoEstudanteService(HistoricoEstudanteRepository repository) {
        this.repository = repository;
    }

    public HistoricoEstudante salvar(HistoricoEstudante historico) {
        return repository.save(historico);
    }

    public List<HistoricoEstudante> listarTodos() {
        return repository.findAll();
    }

    public List<HistoricoEstudante> listarPorAluno(Long idAluno) {
        return repository.findByIdAluno(idAluno);
    }

    public HistoricoEstudante buscarPorId(Long id) { return repository.findById(id) .orElseThrow(() -> new RuntimeException( "Histórico do estudante não encontrado: " + id ));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}