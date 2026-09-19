
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "coletivo_companhia")
public class ColetivoCompanhia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_coletivo")
    private Long idColetivo;

    @Column(
        name = "nome_do_grupo_companhia",
        nullable = false,
        length = 200
    )
    private String nomeDoGrupoCompanhia;

    @Column(name = "ano_fundacao")
    private Short anoFundacao;

    @Column(
        name = "responsavel_lideranca_nome",
        length = 150
    )
    private String responsavelLiderancaNome;

    @Column(
        name = "estilo_pesquisa_artistica",
        length = 150
    )
    private String estiloPesquisaArtistica;

    @Column(
        name = "status_atuacao_atual",
        length = 50
    )
    private String statusAtuacaoAtual;

    @Column(name = "projetos_realizados_funceb")
    private String projetosRealizadosFunceb;

    @Column(name = "contatos_representante")
    private String contatosRepresentante;

    public ColetivoCompanhia() {
    }

    public Long getIdColetivo() {
        return idColetivo;
    }

    public void setIdColetivo(Long idColetivo) {
        this.idColetivo = idColetivo;
    }

    public String getNomeDoGrupoCompanhia() {
        return nomeDoGrupoCompanhia;
    }

    public void setNomeDoGrupoCompanhia(
            String nomeDoGrupoCompanhia) {
        this.nomeDoGrupoCompanhia = nomeDoGrupoCompanhia;
    }

    public Short getAnoFundacao() {
        return anoFundacao;
    }

    public void setAnoFundacao(Short anoFundacao) {
        this.anoFundacao = anoFundacao;
    }

    public String getResponsavelLiderancaNome() {
        return responsavelLiderancaNome;
    }

    public void setResponsavelLiderancaNome(
            String responsavelLiderancaNome) {
        this.responsavelLiderancaNome =
                responsavelLiderancaNome;
    }

    public String getEstiloPesquisaArtistica() {
        return estiloPesquisaArtistica;
    }

    public void setEstiloPesquisaArtistica(
            String estiloPesquisaArtistica) {
        this.estiloPesquisaArtistica =
                estiloPesquisaArtistica;
    }

    public String getStatusAtuacaoAtual() {
        return statusAtuacaoAtual;
    }

    public void setStatusAtuacaoAtual(
            String statusAtuacaoAtual) {
        this.statusAtuacaoAtual =
                statusAtuacaoAtual;
    }

    public String getProjetosRealizadosFunceb() {
        return projetosRealizadosFunceb;
    }

    public void setProjetosRealizadosFunceb(
            String projetosRealizadosFunceb) {
        this.projetosRealizadosFunceb =
                projetosRealizadosFunceb;
    }

    public String getContatosRepresentante() {
        return contatosRepresentante;
    }

    public void setContatosRepresentante(
            String contatosRepresentante) {
        this.contatosRepresentante =
                contatosRepresentante;
    }
}
