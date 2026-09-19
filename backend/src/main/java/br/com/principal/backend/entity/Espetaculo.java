


package br.com.principal.backend.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "espetaculo")
public class Espetaculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_espetaculo")
    private Long idEspetaculo;

    @Column(name = "nome_da_producao", nullable = false, length = 200)
    private String nomeDaProducao;

    @Column(name = "ano_realizacao")
    private Short anoRealizacao;

    @Column(name = "direcao_coreografica", length = 200)
    private String direcaoCoreografica;

    @Column(name = "estilo_danca_predominante", length = 100)
    private String estiloDancaPredominante;

    @Column(name = "local_estreia_teatro", length = 200)
    private String localEstreiaTeatro;

    @Column(name = "orcamento_fomento_origem", precision = 14, scale = 2)
    private BigDecimal orcamentoFomentoOrigem;

    @Column(name = "quantidade_bailarinos_elenco")
    private Integer quantidadeBailarinosElenco;

    @Column(name = "sinopse_ficha_tecnica_texto")
    private String sinopseFichaTecnicaTexto;

    public Espetaculo() {
    }

    public Long getIdEspetaculo() {
        return idEspetaculo;
    }

    public void setIdEspetaculo(Long idEspetaculo) {
        this.idEspetaculo = idEspetaculo;
    }

    public String getNomeDaProducao() {
        return nomeDaProducao;
    }

    public void setNomeDaProducao(String nomeDaProducao) {
        this.nomeDaProducao = nomeDaProducao;
    }

    public Short getAnoRealizacao() {
        return anoRealizacao;
    }

    public void setAnoRealizacao(Short anoRealizacao) {
        this.anoRealizacao = anoRealizacao;
    }

    public String getDirecaoCoreografica() {
        return direcaoCoreografica;
    }

    public void setDirecaoCoreografica(String direcaoCoreografica) {
        this.direcaoCoreografica = direcaoCoreografica;
    }

    public String getEstiloDancaPredominante() {
        return estiloDancaPredominante;
    }

    public void setEstiloDancaPredominante(String estiloDancaPredominante) {
        this.estiloDancaPredominante = estiloDancaPredominante;
    }

    public String getLocalEstreiaTeatro() {
        return localEstreiaTeatro;
    }

    public void setLocalEstreiaTeatro(String localEstreiaTeatro) {
        this.localEstreiaTeatro = localEstreiaTeatro;
    }

    public BigDecimal getOrcamentoFomentoOrigem() {
        return orcamentoFomentoOrigem;
    }

    public void setOrcamentoFomentoOrigem(
            BigDecimal orcamentoFomentoOrigem) {
        this.orcamentoFomentoOrigem = orcamentoFomentoOrigem;
    }

    public Integer getQuantidadeBailarinosElenco() {
        return quantidadeBailarinosElenco;
    }

    public void setQuantidadeBailarinosElenco(
            Integer quantidadeBailarinosElenco) {
        this.quantidadeBailarinosElenco =
                quantidadeBailarinosElenco;
    }

    public String getSinopseFichaTecnicaTexto() {
        return sinopseFichaTecnicaTexto;
    }

    public void setSinopseFichaTecnicaTexto(
            String sinopseFichaTecnicaTexto) {
        this.sinopseFichaTecnicaTexto =
                sinopseFichaTecnicaTexto;
    }
}