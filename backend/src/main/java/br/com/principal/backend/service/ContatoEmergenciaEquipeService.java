
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.ContatoEmergenciaEquipe;
import br.com.principal.backend.repository.ContatoEmergenciaEquipeRepository;

@Service
public class ContatoEmergenciaEquipeService {

    private final ContatoEmergenciaEquipeRepository repository;

    public ContatoEmergenciaEquipeService(
            ContatoEmergenciaEquipeRepository repository) {
        this.repository = repository;
    }

    public ContatoEmergenciaEquipe salvar(
            ContatoEmergenciaEquipe contato) {

        if (contato == null) {
            throw new IllegalArgumentException(
                    "O contato de emergência não pode ser nulo."
            );
        }

        if (contato.getIdColaborador() == null) {
            throw new IllegalArgumentException(
                    "O idColaborador é obrigatório."
            );
        }

        if (contato.getNome() == null ||
                contato.getNome().isBlank()) {
            throw new IllegalArgumentException(
                    "O nome é obrigatório."
            );
        }

        if (contato.getTelefone() == null ||
                contato.getTelefone().isBlank()) {
            throw new IllegalArgumentException(
                    "O telefone é obrigatório."
            );
        }

        if (contato.getOrdemContato() == null) {
            throw new IllegalArgumentException(
                    "A ordemContato é obrigatória."
            );
        }

        if (contato.getOrdemContato() <= 0) {
            throw new IllegalArgumentException(
                    "A ordemContato deve ser maior que zero."
            );
        }

        if (repository.existsByIdColaboradorAndOrdemContato(
                contato.getIdColaborador(),
                contato.getOrdemContato())) {

            throw new IllegalArgumentException(
                    "Já existe um contato de emergência para este colaborador com a ordem informada."
            );
        }

        return repository.save(contato);
    }

    public List<ContatoEmergenciaEquipe> listarTodos() {
        return repository.findAll();
    }

    public ContatoEmergenciaEquipe buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Contato de emergência não encontrado."
                ));
    }

    public List<ContatoEmergenciaEquipe> buscarPorColaborador(
            Long idColaborador) {

        return repository.findByIdColaborador(idColaborador);
    }

    public ContatoEmergenciaEquipe buscarPorColaboradorEOrdem(
            Long idColaborador,
            Short ordemContato) {

        return repository
                .findByIdColaboradorAndOrdemContato(
                        idColaborador,
                        ordemContato
                )
                .orElseThrow(() -> new RuntimeException(
                        "Contato de emergência não encontrado para o colaborador e ordem informados."
                ));
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Contato de emergência não encontrado."
            );
        }

        repository.deleteById(id);
    }
}

