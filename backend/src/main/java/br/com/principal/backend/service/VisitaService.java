
package br.com.principal.backend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.Visita;
import br.com.principal.backend.repository.VisitaRepository;

@Service
public class VisitaService {

    private final VisitaRepository repository;

    public VisitaService(VisitaRepository repository) {
        this.repository = repository;
    }

    public Visita salvar(Visita visita) {

        if (visita == null) {
            throw new IllegalArgumentException(
                    "A visita não pode ser nula."
            );
        }

        if (visita.getNomeCompletoVisitante() == null
                || visita.getNomeCompletoVisitante().isBlank()) {

            throw new IllegalArgumentException(
                    "O nome completo do visitante é obrigatório."
            );
        }

        if (visita.getDataVisita() == null) {
            throw new IllegalArgumentException(
                    "A data da visita é obrigatória."
            );
        }

        if (visita.getHorarioEntrada() == null) {
            throw new IllegalArgumentException(
                    "O horário de entrada é obrigatório."
            );
        }

        LocalTime horarioEntrada =
                visita.getHorarioEntrada();

        LocalTime horarioSaida =
                visita.getHorarioSaida();

        if (horarioSaida != null
                && horarioSaida.isBefore(horarioEntrada)) {

            throw new IllegalArgumentException(
                    "O horário de saída não pode ser anterior "
                    + "ao horário de entrada."
            );
        }

        if (visita.getAssinouTermoSegurancaLgpd() == null) {
            visita.setAssinouTermoSegurancaLgpd(false);
        }

        try {
            return repository.save(visita);

        } catch (DataIntegrityViolationException e) {

            throw new IllegalArgumentException(
                    "Não foi possível cadastrar a visita. "
                    + "Verifique se a sala ou o colaborador "
                    + "informado existem."
            );
        }
    }

    public List<Visita> listarTodos() {
        return repository.findAll();
    }

    public Optional<Visita> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public List<Visita> listarPorData(LocalDate data) {
        return repository.findByDataVisita(data);
    }

    public List<Visita> listarPorSala(Long idSala) {
        return repository.findByIdSala(idSala);
    }

    public List<Visita> listarPorColaborador(
            Long idColaborador) {

        return repository
                .findByIdColaboradorResponsavelRecepcao(
                        idColaborador
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

