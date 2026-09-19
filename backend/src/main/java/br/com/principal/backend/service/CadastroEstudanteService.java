
package br.com.principal.backend.service;

import br.com.principal.backend.entity.CadastroEstudante;
import br.com.principal.backend.repository.CadastroEstudanteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CadastroEstudanteService {

    private final CadastroEstudanteRepository repository;

    public CadastroEstudanteService(CadastroEstudanteRepository repository) {
        this.repository = repository;
    }

    public CadastroEstudante salvar(CadastroEstudante estudante) {
        return repository.save(estudante);
    }

    public List<CadastroEstudante> listarTodos() {
        return repository.findAll();
    }

    public CadastroEstudante buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Estudante não encontrado: " + id)
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
