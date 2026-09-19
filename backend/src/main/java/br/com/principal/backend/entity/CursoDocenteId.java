package br.com.principal.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class CursoDocenteId implements Serializable {

    @Column(name = "id_curso")
    private Long idCurso;

    @Column(name = "id_colaborador")
    private Long idColaborador;

    public CursoDocenteId() {
    }

    public CursoDocenteId(Long idCurso, Long idColaborador) {
        this.idCurso = idCurso;
        this.idColaborador = idColaborador;
    }

    public Long getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Long idCurso) {
        this.idCurso = idCurso;
    }

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof CursoDocenteId)) {
            return false;
        }

        CursoDocenteId that = (CursoDocenteId) o;

        return Objects.equals(idCurso, that.idCurso)
                && Objects.equals(idColaborador, that.idColaborador);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCurso, idColaborador);
    }
}

