
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "contato_emergencia_equipe",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_contato_equipe_ordem",
            columnNames = {
                "id_colaborador",
                "ordem_contato"
            }
        )
    }
)
public class ContatoEmergenciaEquipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contato")
    private Long idContato;

    @Column(name = "id_colaborador", nullable = false)
    private Long idColaborador;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "telefone", nullable = false, length = 20)
    private String telefone;

    @Column(name = "grau_parentesco", length = 50)
    private String grauParentesco;

    @Column(name = "ordem_contato", nullable = false)
    private Short ordemContato;

    public ContatoEmergenciaEquipe() {
    }

    public Long getIdContato() {
        return idContato;
    }

    public void setIdContato(Long idContato) {
        this.idContato = idContato;
    }

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
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

