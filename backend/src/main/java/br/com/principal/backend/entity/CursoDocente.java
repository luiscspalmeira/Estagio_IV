package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "curso_docente")
public class CursoDocente {

    @EmbeddedId
    private CursoDocenteId id;

    @Column(name = "funcao_no_curso", length = 100)
    private String funcaoNoCurso;

    public CursoDocente() {
    }

    public CursoDocente(CursoDocenteId id, String funcaoNoCurso) {
        this.id = id;
        this.funcaoNoCurso = funcaoNoCurso;
    }

    public CursoDocenteId getId() {
        return id;
    }

    public void setId(CursoDocenteId id) {
        this.id = id;
    }

    public String getFuncaoNoCurso() {
        return funcaoNoCurso;
    }

    public void setFuncaoNoCurso(String funcaoNoCurso) {
        this.funcaoNoCurso = funcaoNoCurso;
    }
}


