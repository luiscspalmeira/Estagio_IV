
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.CadastroEquipe;
import br.com.principal.backend.repository.CadastroEquipeRepository;

@Service
public class CadastroEquipeService {

    private final CadastroEquipeRepository repository;

    public CadastroEquipeService(
            CadastroEquipeRepository repository
    ) {
        this.repository = repository;
    }

    public CadastroEquipe salvar(CadastroEquipe equipe) {

        validar(equipe);

        if (equipe.getStatusContract() == null
                || equipe.getStatusContract().isBlank()) {

            equipe.setStatusContract("ATIVO");
        }

        if (repository.existsByCpf(equipe.getCpf())) {

            throw new IllegalArgumentException(
                    "Já existe um colaborador cadastrado com este CPF."
            );
        }

        return repository.save(equipe);
    }

    public List<CadastroEquipe> listarTodos() {

        return repository.findAll();
    }

    public CadastroEquipe buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Colaborador não encontrado."
                        )
                );
    }

    public List<CadastroEquipe> buscarPorNome(
            String nome
    ) {

        return repository
                .findByNomeCompletoContainingIgnoreCase(nome);
    }

    public List<CadastroEquipe> buscarPorFuncao(
            String funcao
    ) {

        return repository
                .findByFuncaoEspecifica(funcao);
    }

    public List<CadastroEquipe> buscarPorStatus(
            String status
    ) {

        validarStatus(status);

        return repository
                .findByStatusContract(status);
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {

            throw new IllegalArgumentException(
                    "Colaborador não encontrado."
            );
        }

        repository.deleteById(id);
    }

    private void validar(CadastroEquipe equipe) {

        if (equipe == null) {

            throw new IllegalArgumentException(
                    "Os dados do colaborador são obrigatórios."
            );
        }

        if (equipe.getNomeCompleto() == null
                || equipe.getNomeCompleto().isBlank()) {

            throw new IllegalArgumentException(
                    "O nome completo é obrigatório."
            );
        }

        if (equipe.getCpf() == null
                || !equipe.getCpf().matches("\\d{11}")) {

            throw new IllegalArgumentException(
                    "O CPF deve conter exatamente 11 dígitos."
            );
        }

        if (equipe.getCep() != null
                && !equipe.getCep().isBlank()
                && !equipe.getCep().matches("\\d{8}")) {

            throw new IllegalArgumentException(
                    "O CEP deve conter exatamente 8 dígitos."
            );
        }

        if (equipe.getDataInicioVinculo() != null
                && equipe.getDataFimPrevista() != null
                && equipe.getDataFimPrevista()
                        .isBefore(equipe.getDataInicioVinculo())) {

            throw new IllegalArgumentException(
                    "A data fim prevista não pode ser anterior à data de início do vínculo."
            );
        }

        if (equipe.getStatusContract() != null
                && !equipe.getStatusContract().isBlank()) {

            validarStatus(equipe.getStatusContract());
        }
    }

    private void validarStatus(String status) {

        if (!status.equals("ATIVO")
                && !status.equals("INATIVO")
                && !status.equals("ENCERRADO")
                && !status.equals("AFASTADO")) {

            throw new IllegalArgumentException(
                    "Status inválido. Valores permitidos: ATIVO, INATIVO, ENCERRADO ou AFASTADO."
            );
        }
    }
}

