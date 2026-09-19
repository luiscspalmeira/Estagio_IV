
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.ColetivoCompanhia;
import br.com.principal.backend.repository.ColetivoCompanhiaRepository;

@Service
public class ColetivoCompanhiaService {

    private final ColetivoCompanhiaRepository repository;

    public ColetivoCompanhiaService(
            ColetivoCompanhiaRepository repository) {
        this.repository = repository;
    }

    public ColetivoCompanhia salvar(
            ColetivoCompanhia coletivo) {

        if (coletivo == null) {
            throw new IllegalArgumentException(
                    "O coletivo/companhia não pode ser nulo."
            );
        }

        if (coletivo.getNomeDoGrupoCompanhia() == null ||
                coletivo.getNomeDoGrupoCompanhia().isBlank()) {

            throw new IllegalArgumentException(
                    "O nome do grupo/companhia é obrigatório."
            );
        }

        if (coletivo.getAnoFundacao() != null &&
                (coletivo.getAnoFundacao() < 1800 ||
                 coletivo.getAnoFundacao() > 2200)) {

            throw new IllegalArgumentException(
                    "O ano de fundação deve estar entre 1800 e 2200."
            );
        }

        try {
            return repository.save(coletivo);

        } catch (DataIntegrityViolationException e) {

            throw new IllegalArgumentException(
                    "Já existe um coletivo/companhia com esse nome."
            );
        }
    }

    public List<ColetivoCompanhia> listarTodos() {
        return repository.findAll();
    }

    public ColetivoCompanhia buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Coletivo/companhia não encontrado."
                ));
    }

    public List<ColetivoCompanhia> buscarPorNome(
            String nomeDoGrupoCompanhia) {

        return repository
                .findByNomeDoGrupoCompanhiaContainingIgnoreCase(
                        nomeDoGrupoCompanhia
                );
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Coletivo/companhia não encontrado."
            );
        }

        repository.deleteById(id);
    }
}