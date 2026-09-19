
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "acompanhante_autorizado")
public class AcompanhanteAutorizado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_acompanhante")
    private Long idAcompanhante;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "rg", length = 30)
    private String rg;

    @Column(name = "observacao")
    private String observacao;

    public AcompanhanteAutorizado() {
    }

    public Long getIdAcompanhante() {
        return idAcompanhante;
    }

    public void setIdAcompanhante(Long idAcompanhante) {
        this.idAcompanhante = idAcompanhante;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}


