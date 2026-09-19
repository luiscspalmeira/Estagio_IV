
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.CursoDocente;
import br.com.principal.backend.entity.CursoDocenteId;
import br.com.principal.backend.repository.CursoDocenteRepository;

@Service
public class CursoDocenteService {

    private final CursoDocenteRepository repository;

    public CursoDocenteService(CursoDocenteRepository repository) {
        this.repository = repository;
    }

    public CursoDocente salvar(CursoDocente cursoDocente) {

        validar(cursoDocente);

        if (repository.existsById(cursoDocente.getId())) {
            throw new IllegalArgumentException(
                    "Este docente já está vinculado a este curso."
            );
        }

        return repository.save(cursoDocente);
    }

    public List<CursoDocente> listarTodos() {
        return repository.findAll();
    }

    public CursoDocente buscarPorId(CursoDocenteId id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Relação curso-docente não encontrada."
                        )
                );
    }

    public List<CursoDocente> buscarPorCurso(Long idCurso) {
        return repository.findByIdIdCurso(idCurso);
    }

    public List<CursoDocente> buscarPorColaborador(Long idColaborador) {
        return repository.findByIdIdColaborador(idColaborador);
    }

    public void excluir(CursoDocenteId id) {

        if (!repository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Relação curso-docente não encontrada."
            );
        }

        repository.deleteById(id);
    }

    private void validar(CursoDocente cursoDocente) {

        if (cursoDocente == null) {
            throw new IllegalArgumentException(
                    "Os dados da relação curso-docente são obrigatórios."
            );
        }

        if (cursoDocente.getId() == null) {
            throw new IllegalArgumentException(
                    "A identificação do curso e do colaborador é obrigatória."
            );
        }

        if (cursoDocente.getId().getIdCurso() == null) {
            throw new IllegalArgumentException(
                    "O id do curso é obrigatório."
            );
        }

        if (cursoDocente.getId().getIdColaborador() == null) {
            throw new IllegalArgumentException(
                    "O id do colaborador é obrigatório."
            );
        }
    }
}

