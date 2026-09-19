
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "espetaculo_coletivo")
public class EspetaculoColetivo {

    @EmbeddedId
    private EspetaculoColetivoId id;

    @Column(name = "funcao_participacao", length = 100)
    private String funcaoParticipacao;

    @Column(name = "observacao")
    private String observacao;

    public EspetaculoColetivo() {
    }

    public EspetaculoColetivo(
            EspetaculoColetivoId id,
            String funcaoParticipacao,
            String observacao) {

        this.id = id;
        this.funcaoParticipacao = funcaoParticipacao;
        this.observacao = observacao;
    }

    public EspetaculoColetivoId getId() {
        return id;
    }

    public void setId(EspetaculoColetivoId id) {
        this.id = id;
    }

    public String getFuncaoParticipacao() {
        return funcaoParticipacao;
    }

    public void setFuncaoParticipacao(String funcaoParticipacao) {
        this.funcaoParticipacao = funcaoParticipacao;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}

