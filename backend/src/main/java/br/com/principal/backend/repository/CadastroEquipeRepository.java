
package br.com.principal.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.CadastroEquipe;

public interface CadastroEquipeRepository
        extends JpaRepository<CadastroEquipe, Long> {

    Optional<CadastroEquipe> findByCpf(String cpf);

    List<CadastroEquipe> findByNomeCompletoContainingIgnoreCase(
            String nomeCompleto
    );

    List<CadastroEquipe> findByFuncaoEspecifica(
            String funcaoEspecifica
    );

    List<CadastroEquipe> findByStatusContract(
            String statusContract
    );

    boolean existsByCpf(String cpf);
}



