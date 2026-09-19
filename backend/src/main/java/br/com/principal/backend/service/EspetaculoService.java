
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.Espetaculo;
import br.com.principal.backend.repository.EspetaculoRepository;

@Service
public class EspetaculoService {

    private final EspetaculoRepository repository;

    public EspetaculoService(
            EspetaculoRepository repository) {
        this.repository = repository;
    }

    public Espetaculo salvar(Espetaculo espetaculo) {

        if (espetaculo == null) {
            throw new IllegalArgumentException(
                    "O espetáculo não pode ser nulo."
            );
        }

        if (espetaculo.getNomeDaProducao() == null ||
                espetaculo.getNomeDaProducao().isBlank()) {

            throw new IllegalArgumentException(
                    "O nome da produção é obrigatório."
            );
        }

        if (espetaculo.getAnoRealizacao() != null &&
                (espetaculo.getAnoRealizacao() < 1900 ||
                 espetaculo.getAnoRealizacao() > 2200)) {

            throw new IllegalArgumentException(
                    "O ano de realização deve estar entre 1900 e 2200."
            );
        }

        if (espetaculo.getOrcamentoFomentoOrigem() != null &&
                espetaculo.getOrcamentoFomentoOrigem()
                        .signum() < 0) {

            throw new IllegalArgumentException(
                    "O orçamento não pode ser negativo."
            );
        }

        if (espetaculo.getQuantidadeBailarinosElenco() != null &&
                espetaculo.getQuantidadeBailarinosElenco() < 0) {

            throw new IllegalArgumentException(
                    "A quantidade de bailarinos não pode ser negativa."
            );
        }

        return repository.save(espetaculo);
    }

    public List<Espetaculo> listarTodos() {
        return repository.findAll();
    }

    public Espetaculo buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Espetáculo não encontrado."
                ));
    }

    public List<Espetaculo> buscarPorNome(
            String nomeDaProducao) {

        return repository
                .findByNomeDaProducaoContainingIgnoreCase(
                        nomeDaProducao
                );
    }

    public List<Espetaculo> buscarPorAno(
            Short anoRealizacao) {

        return repository.findByAnoRealizacao(
                anoRealizacao
        );
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Espetáculo não encontrado."
            );
        }

        repository.deleteById(id);
    }
}