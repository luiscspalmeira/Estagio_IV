
package br.com.principal.backend.service;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.Matricula;
import br.com.principal.backend.repository.MatriculaRepository;

@Service
public class MatriculaService {

    private final MatriculaRepository repository;

    private static final Pattern PADRAO_PERIODO =
            Pattern.compile("^[0-9]{4}\\.[12]$");

    private static final List<String> STATUS_VALIDOS = List.of(
            "ATIVA",
            "TRANCADA",
            "CONCLUIDA",
            "CANCELADA"
    );

    public MatriculaService(MatriculaRepository repository) {
        this.repository = repository;
    }

    public Matricula salvar(Matricula matricula) {

        if (matricula.getIdAluno() == null ||
                matricula.getIdAluno() <= 0) {

            throw new IllegalArgumentException(
                    "O aluno é obrigatório."
            );
        }

        if (matricula.getIdCurso() == null ||
                matricula.getIdCurso() <= 0) {

            throw new IllegalArgumentException(
                    "O curso é obrigatório."
            );
        }

        if (matricula.getAnoSemestre() == null ||
                !PADRAO_PERIODO.matcher(
                        matricula.getAnoSemestre()
                ).matches()) {

            throw new IllegalArgumentException(
                    "O ano/semestre deve estar no formato AAAA.1 ou AAAA.2."
            );
        }

        if (matricula.getStatusMatricula() == null ||
                matricula.getStatusMatricula().trim().isEmpty()) {

            matricula.setStatusMatricula("ATIVA");
        }

        if (!STATUS_VALIDOS.contains(
                matricula.getStatusMatricula())) {

            throw new IllegalArgumentException(
                    "O status da matrícula deve ser ATIVA, "
                            + "TRANCADA, CONCLUIDA ou CANCELADA."
            );
        }

        if (matricula.getEntregaTci() == null) {
            matricula.setEntregaTci(false);
        }

        if (matricula.getEntregaTcle() == null) {
            matricula.setEntregaTcle(false);
        }

        if (matricula.getIdMatricula() == null &&
                repository.existsByIdAlunoAndIdCursoAndAnoSemestre(
                        matricula.getIdAluno(),
                        matricula.getIdCurso(),
                        matricula.getAnoSemestre()
                )) {

            throw new IllegalArgumentException(
                    "Já existe uma matrícula para este aluno, "
                            + "curso e ano/semestre."
            );
        }

        return repository.save(matricula);
    }

    public List<Matricula> listarTodos() {
        return repository.findAll();
    }

    public List<Matricula> listarPorAluno(Long idAluno) {
        return repository.findByIdAluno(idAluno);
    }

    public List<Matricula> listarPorCurso(Long idCurso) {
        return repository.findByIdCurso(idCurso);
    }

    public List<Matricula> listarPorPeriodo(String anoSemestre) {
        return repository.findByAnoSemestre(anoSemestre);
    }

    public List<Matricula> listarPorStatus(String statusMatricula) {
        return repository.findByStatusMatricula(statusMatricula);
    }

    public Matricula buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Matrícula não encontrada: " + id
                        )
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

