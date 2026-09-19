
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "matricula")
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    private Long idMatricula;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "id_curso", nullable = false)
    private Long idCurso;

    @Column(name = "status_antecedentes", length = 50)
    private String statusAntecedentes;

    @Column(name = "entrega_tci", nullable = false)
    private Boolean entregaTci = false;

    @Column(name = "entrega_tcle", nullable = false)
    private Boolean entregaTcle = false;

    @Column(name = "ano_semestre", nullable = false, length = 7)
    private String anoSemestre;

    @Column(name = "status_matricula", nullable = false, length = 30)
    private String statusMatricula = "ATIVA";

    public Matricula() {
    }

    public Long getIdMatricula() {
        return idMatricula;
    }

    public void setIdMatricula(Long idMatricula) {
        this.idMatricula = idMatricula;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public Long getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Long idCurso) {
        this.idCurso = idCurso;
    }

    public String getStatusAntecedentes() {
        return statusAntecedentes;
    }

    public void setStatusAntecedentes(String statusAntecedentes) {
        this.statusAntecedentes = statusAntecedentes;
    }

    public Boolean getEntregaTci() {
        return entregaTci;
    }

    public void setEntregaTci(Boolean entregaTci) {
        this.entregaTci = entregaTci;
    }

    public Boolean getEntregaTcle() {
        return entregaTcle;
    }

    public void setEntregaTcle(Boolean entregaTcle) {
        this.entregaTcle = entregaTcle;
    }

    public String getAnoSemestre() {
        return anoSemestre;
    }

    public void setAnoSemestre(String anoSemestre) {
        this.anoSemestre = anoSemestre;
    }

    public String getStatusMatricula() {
        return statusMatricula;
    }

    public void setStatusMatricula(String statusMatricula) {
        this.statusMatricula = statusMatricula;
    }
}

