
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "historico_estudante")
public class HistoricoEstudante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historico")
    private Long idHistorico;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "ano_ingresso")
    private Short anoIngresso;

    @Column(name = "ano_conclusao_desligamento")
    private Short anoConclusaoDesligamento;

    @Column(name = "modalidade_formacao", length = 100)
    private String modalidadeFormacao;

    @Column(name = "historico_evolucao_premios")
    private String historicoEvolucaoPremios;

    @Column(name = "destino_profissional_atual")
    private String destinoProfissionalAtual;

    @Column(name = "link_pasta_arquivo_historico")
    private String linkPastaArquivoHistorico;

    public HistoricoEstudante() {
    }

    public Long getIdHistorico() {
        return idHistorico;
    }

    public void setIdHistorico(Long idHistorico) {
        this.idHistorico = idHistorico;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public Short getAnoIngresso() {
        return anoIngresso;
    }

    public void setAnoIngresso(Short anoIngresso) {
        this.anoIngresso = anoIngresso;
    }

    public Short getAnoConclusaoDesligamento() {
        return anoConclusaoDesligamento;
    }

    public void setAnoConclusaoDesligamento(Short anoConclusaoDesligamento) {
        this.anoConclusaoDesligamento = anoConclusaoDesligamento;
    }

    public String getModalidadeFormacao() {
        return modalidadeFormacao;
    }

    public void setModalidadeFormacao(String modalidadeFormacao) {
        this.modalidadeFormacao = modalidadeFormacao;
    }

    public String getHistoricoEvolucaoPremios() {
        return historicoEvolucaoPremios;
    }

    public void setHistoricoEvolucaoPremios(String historicoEvolucaoPremios) {
        this.historicoEvolucaoPremios = historicoEvolucaoPremios;
    }

    public String getDestinoProfissionalAtual() {
        return destinoProfissionalAtual;
    }

    public void setDestinoProfissionalAtual(String destinoProfissionalAtual) {
        this.destinoProfissionalAtual = destinoProfissionalAtual;
    }

    public String getLinkPastaArquivoHistorico() {
        return linkPastaArquivoHistorico;
    }

    public void setLinkPastaArquivoHistorico(String linkPastaArquivoHistorico) {
        this.linkPastaArquivoHistorico = linkPastaArquivoHistorico;
    }
}
