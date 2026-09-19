package br.com.principal.backend.repository;

import br.com.principal.backend.entity.CadastroEstudante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CadastroEstudanteRepository
        extends JpaRepository<CadastroEstudante, Long> {

}
