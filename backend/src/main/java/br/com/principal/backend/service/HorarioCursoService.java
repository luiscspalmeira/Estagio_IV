
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.HorarioCurso;
import br.com.principal.backend.repository.HorarioCursoRepository;

@Service
public class HorarioCursoService {

    private final HorarioCursoRepository repository;

    public HorarioCursoService(HorarioCursoRepository repository) {
        this.repository = repository;
    }

    public HorarioCurso salvar(HorarioCurso horario) {

        if (horario.getIdCurso() == null ||
                horario.getIdCurso() <= 0) {

            throw new IllegalArgumentException(
                    "O curso é obrigatório."
            );
        }

        if (horario.getIdSala() == null ||
                horario.getIdSala() <= 0) {

            throw new IllegalArgumentException(
                    "A sala é obrigatória."
            );
        }

        if (horario.getDiaSemana() == null ||
                horario.getDiaSemana() < 1 ||
                horario.getDiaSemana() > 7) {

            throw new IllegalArgumentException(
                    "O dia da semana deve estar entre 1 e 7."
            );
        }

        if (horario.getHoraInicio() == null) {

            throw new IllegalArgumentException(
                    "A hora de início é obrigatória."
            );
        }

        if (horario.getHoraFim() == null) {

            throw new IllegalArgumentException(
                    "A hora de término é obrigatória."
            );
        }

        if (!horario.getHoraFim().isAfter(
                horario.getHoraInicio())) {

            throw new IllegalArgumentException(
                    "A hora de término deve ser posterior à hora de início."
            );
        }

        if (horario.getIdHorario() == null &&
                repository
                        .existsByIdCursoAndDiaSemanaAndHoraInicioAndHoraFim(
                                horario.getIdCurso(),
                                horario.getDiaSemana(),
                                horario.getHoraInicio(),
                                horario.getHoraFim()
                        )) {

            throw new IllegalArgumentException(
                    "Já existe um horário cadastrado para este curso, "
                    + "dia e período."
            );
        }

        return repository.save(horario);
    }

    public List<HorarioCurso> listarTodos() {
        return repository.findAll();
    }

    public List<HorarioCurso> listarPorCurso(Long idCurso) {
        return repository.findByIdCurso(idCurso);
    }

    public List<HorarioCurso> listarPorSala(Long idSala) {
        return repository.findByIdSala(idSala);
    }

    public List<HorarioCurso> listarPorDia(Short diaSemana) {
        return repository.findByDiaSemana(diaSemana);
    }

    public HorarioCurso buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Horário do curso não encontrado: " + id
                        )
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

