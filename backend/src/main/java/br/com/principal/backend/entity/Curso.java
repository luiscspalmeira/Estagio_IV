
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private Long idCurso;

    @Column(name = "nome_curso", nullable = false, length = 150, unique = true)
    private String nomeCurso;

    @Column(name = "modalidade_curso", length = 100)
    private String modalidadeCurso;

    @Column(name = "faixa_etaria_publico", length = 50)
    private String faixaEtariaPublico;

    @Column(name = "status_curso", nullable = false, length = 30)
    private String statusCurso = "ATIVO";

    public Curso() {
    }

    public Long getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Long idCurso) {
        this.idCurso = idCurso;
    }

    public String getNomeCurso() {
        return nomeCurso;
    }

    public void setNomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
    }

    public String getModalidadeCurso() {
        return modalidadeCurso;
    }

    public void setModalidadeCurso(String modalidadeCurso) {
        this.modalidadeCurso = modalidadeCurso;
    }

    public String getFaixaEtariaPublico() {
        return faixaEtariaPublico;
    }

    public void setFaixaEtariaPublico(String faixaEtariaPublico) {
        this.faixaEtariaPublico = faixaEtariaPublico;
    }

    public String getStatusCurso() {
        return statusCurso;
    }

    public void setStatusCurso(String statusCurso) {
        this.statusCurso = statusCurso;
    }
}

