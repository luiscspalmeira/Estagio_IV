
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contato_emergencia")
public class ContatoEmergencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contato_emergencia")
    private Long idContatoEmergencia;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "telefone", nullable = false, length = 20)
    private String telefone;

    @Column(name = "grau_parentesco", length = 50)
    private String grauParentesco;

    @Column(name = "ordem_contato", nullable = false)
    private Short ordemContato;

    public ContatoEmergencia() {
    }

    public Long getIdContatoEmergencia() {
        return idContatoEmergencia;
    }

    public void setIdContatoEmergencia(Long idContatoEmergencia) {
        this.idContatoEmergencia = idContatoEmergencia;
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getGrauParentesco() {
        return grauParentesco;
    }

    public void setGrauParentesco(String grauParentesco) {
        this.grauParentesco = grauParentesco;
    }

    public Short getOrdemContato() {
        return ordemContato;
    }

    public void setOrdemContato(Short ordemContato) {
        this.ordemContato = ordemContato;
    }
}

