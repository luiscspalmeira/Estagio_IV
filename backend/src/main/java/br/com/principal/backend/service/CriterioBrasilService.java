
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.CriterioBrasil;
import br.com.principal.backend.repository.CriterioBrasilRepository;

@Service
public class CriterioBrasilService {

    private final CriterioBrasilRepository repository;

    public CriterioBrasilService(CriterioBrasilRepository repository) {
        this.repository = repository;
    }

    public CriterioBrasil salvar(CriterioBrasil criterio) {
        return repository.save(criterio);
    }

    public List<CriterioBrasil> listarTodos() {
        return repository.findAll();
    }

    public List<CriterioBrasil> listarPorAluno(Long idAluno) {
        return repository.findByIdAluno(idAluno);
    }

    public List<CriterioBrasil> listarPorPeriodo(
            String anoSemestreReferencia
    ) {
        return repository.findByAnoSemestreReferencia(
                anoSemestreReferencia
        );
    }

    public CriterioBrasil buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Critério Brasil não encontrado: " + id
                        )
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

