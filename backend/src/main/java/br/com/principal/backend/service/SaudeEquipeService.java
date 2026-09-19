
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.SaudeEquipe;
import br.com.principal.backend.repository.SaudeEquipeRepository;

@Service
public class SaudeEquipeService {

    private final SaudeEquipeRepository repository;

    public SaudeEquipeService(
            SaudeEquipeRepository repository) {
        this.repository = repository;
    }

    public SaudeEquipe salvar(SaudeEquipe saudeEquipe) {

        validar(saudeEquipe);

        if (repository.existsByIdColaboradorAndAnoReferencia(
                saudeEquipe.getIdColaborador(),
                saudeEquipe.getAnoReferencia())) {

            throw new IllegalArgumentException(
                    "Já existe um registro de saúde para este colaborador no ano informado."
            );
        }

        return repository.save(saudeEquipe);
    }

    public List<SaudeEquipe> listarTodos() {
        return repository.findAll();
    }

    public SaudeEquipe buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Registro de saúde da equipe não encontrado."
                        )
                );
    }

    public List<SaudeEquipe> buscarPorColaborador(
            Long idColaborador) {

        return repository.findByIdColaborador(idColaborador);
    }

    public SaudeEquipe buscarPorColaboradorEAno(
            Long idColaborador,
            Short anoReferencia) {

        return repository
                .findByIdColaboradorAndAnoReferencia(
                        idColaborador,
                        anoReferencia
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Registro de saúde não encontrado para o colaborador e ano informados."
                        )
                );
    }

    public List<SaudeEquipe> buscarPorAno(
            Short anoReferencia) {

        return repository.findByAnoReferencia(
                anoReferencia
        );
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {

            throw new IllegalArgumentException(
                    "Registro de saúde da equipe não encontrado."
            );
        }

        repository.deleteById(id);
    }

    private void validar(SaudeEquipe saudeEquipe) {

        if (saudeEquipe == null) {

            throw new IllegalArgumentException(
                    "Os dados de saúde da equipe são obrigatórios."
            );
        }

        if (saudeEquipe.getIdColaborador() == null) {

            throw new IllegalArgumentException(
                    "O id do colaborador é obrigatório."
            );
        }

        if (saudeEquipe.getAnoReferencia() == null) {

            throw new IllegalArgumentException(
                    "O ano de referência é obrigatório."
            );
        }

        short ano = saudeEquipe.getAnoReferencia();

        if (ano < 1900 || ano > 2200) {

            throw new IllegalArgumentException(
                    "O ano de referência deve estar entre 1900 e 2200."
            );
        }
    }
}

