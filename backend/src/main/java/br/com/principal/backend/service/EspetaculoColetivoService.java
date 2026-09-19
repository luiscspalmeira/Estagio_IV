
package br.com.principal.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.EspetaculoColetivo;
import br.com.principal.backend.entity.EspetaculoColetivoId;
import br.com.principal.backend.repository.EspetaculoColetivoRepository;

@Service
public class EspetaculoColetivoService {

    private final EspetaculoColetivoRepository repository;

    public EspetaculoColetivoService(
            EspetaculoColetivoRepository repository) {

        this.repository = repository;
    }

    public EspetaculoColetivo salvar(EspetaculoColetivo relacionamento) {

        if (relacionamento == null) {
            throw new IllegalArgumentException(
                    "O relacionamento não pode ser nulo."
            );
        }

        if (relacionamento.getId() == null) {
            throw new IllegalArgumentException(
                    "Os IDs do espetáculo e do coletivo são obrigatórios."
            );
        }

        if (relacionamento.getId().getIdEspetaculo() == null) {
            throw new IllegalArgumentException(
                    "O ID do espetáculo é obrigatório."
            );
        }

        if (relacionamento.getId().getIdColetivo() == null) {
            throw new IllegalArgumentException(
                    "O ID do coletivo é obrigatório."
            );
        }

        try {
            return repository.save(relacionamento);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(
                    "Não foi possível cadastrar o relacionamento. "
                    + "Verifique se o espetáculo e o coletivo existem "
                    + "e se esse relacionamento ainda não foi cadastrado."
            );
        }
    }

    public List<EspetaculoColetivo> listarTodos() {
        return repository.findAll();
    }

    public Optional<EspetaculoColetivo> buscarPorId(
            Long idEspetaculo,
            Long idColetivo) {

        EspetaculoColetivoId id =
                new EspetaculoColetivoId(idEspetaculo, idColetivo);

        return repository.findById(id);
    }

    public List<EspetaculoColetivo> listarPorEspetaculo(
            Long idEspetaculo) {

        return repository.findByIdIdEspetaculo(idEspetaculo);
    }

    public List<EspetaculoColetivo> listarPorColetivo(
            Long idColetivo) {

        return repository.findByIdIdColetivo(idColetivo);
    }

    public void excluir(Long idEspetaculo, Long idColetivo) {

        EspetaculoColetivoId id =
                new EspetaculoColetivoId(idEspetaculo, idColetivo);

        repository.deleteById(id);
    }
}

