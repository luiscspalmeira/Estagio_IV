
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.NucleoFamiliar;
import br.com.principal.backend.repository.NucleoFamiliarRepository;

@Service
public class NucleoFamiliarService {

    private final NucleoFamiliarRepository repository;

    public NucleoFamiliarService(NucleoFamiliarRepository repository) {
        this.repository = repository;
    }

    public NucleoFamiliar salvar(NucleoFamiliar familiar) {
        return repository.save(familiar);
    }

    public List<NucleoFamiliar> listarTodos() {
        return repository.findAll();
    }

    public List<NucleoFamiliar> listarPorAluno(Long idAluno) {
        return repository.findByIdAluno(idAluno);
    }

    public NucleoFamiliar buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Familiar não encontrado: " + id
                        )
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

