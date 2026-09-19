
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.Curso;
import br.com.principal.backend.repository.CursoRepository;

@Service
public class CursoService {

    private final CursoRepository repository;

    public CursoService(CursoRepository repository) {
        this.repository = repository;
    }

    public Curso salvar(Curso curso) {

        if (curso.getNomeCurso() == null ||
                curso.getNomeCurso().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O nome do curso é obrigatório."
            );
        }

        if (curso.getStatusCurso() == null ||
                curso.getStatusCurso().trim().isEmpty()) {

            curso.setStatusCurso("ATIVO");
        }

        if (!curso.getStatusCurso().equals("ATIVO") &&
                !curso.getStatusCurso().equals("INATIVO")) {

            throw new IllegalArgumentException(
                    "O status do curso deve ser ATIVO ou INATIVO."
            );
        }

        if (curso.getIdCurso() == null &&
                repository.existsByNomeCurso(curso.getNomeCurso())) {

            throw new IllegalArgumentException(
                    "Já existe um curso cadastrado com o nome: "
                            + curso.getNomeCurso()
            );
        }

        return repository.save(curso);
    }

    public List<Curso> listarTodos() {
        return repository.findAll();
    }

    public List<Curso> listarPorStatus(String statusCurso) {
        return repository.findByStatusCurso(statusCurso);
    }

    public List<Curso> listarPorModalidade(String modalidadeCurso) {
        return repository.findByModalidadeCurso(modalidadeCurso);
    }

    public Curso buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Curso não encontrado: " + id
                        )
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

