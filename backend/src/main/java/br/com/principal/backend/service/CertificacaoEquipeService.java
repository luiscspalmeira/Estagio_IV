
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.CertificacaoEquipe;
import br.com.principal.backend.repository.CertificacaoEquipeRepository;

@Service
public class CertificacaoEquipeService {

    private final CertificacaoEquipeRepository repository;

    public CertificacaoEquipeService(
            CertificacaoEquipeRepository repository) {
        this.repository = repository;
    }

    public CertificacaoEquipe salvar(
            CertificacaoEquipe certificacao) {

        if (certificacao == null) {
            throw new IllegalArgumentException(
                    "A certificação não pode ser nula."
            );
        }

        if (certificacao.getIdColaborador() == null) {
            throw new IllegalArgumentException(
                    "O idColaborador é obrigatório."
            );
        }

        if (certificacao.getNomeTreinamento() == null ||
                certificacao.getNomeTreinamento().isBlank()) {
            throw new IllegalArgumentException(
                    "O nome do treinamento é obrigatório."
            );
        }

        if (certificacao.getDataConclusao() == null) {
            throw new IllegalArgumentException(
                    "A data de conclusão é obrigatória."
            );
        }

        if (certificacao.getValidadeMeses() != null &&
                certificacao.getValidadeMeses() <= 0) {
            throw new IllegalArgumentException(
                    "A validade em meses deve ser maior que zero."
            );
        }

        return repository.save(certificacao);
    }

    public List<CertificacaoEquipe> listarTodos() {
        return repository.findAll();
    }

    public CertificacaoEquipe buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Certificação não encontrada."
                ));
    }

    public List<CertificacaoEquipe> buscarPorColaborador(
            Long idColaborador) {

        return repository.findByIdColaborador(idColaborador);
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Certificação não encontrada."
            );
        }

        repository.deleteById(id);
    }
}

