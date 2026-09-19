
package br.com.principal.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "certificacao_equipe")
public class CertificacaoEquipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_certificado")
    private Long idCertificado;

    @Column(name = "id_colaborador", nullable = false)
    private Long idColaborador;

    @Column(name = "nome_treinamento", nullable = false, length = 200)
    private String nomeTreinamento;

    @Column(name = "data_conclusao", nullable = false)
    private LocalDate dataConclusao;

    @Column(name = "validade_meses")
    private Integer validadeMeses;

    @Column(name = "status_certificacao", length = 30)
    private String statusCertificacao;

    @Column(name = "link_certificado_pdf")
    private String linkCertificadoPdf;

    public CertificacaoEquipe() {
    }

    public Long getIdCertificado() {
        return idCertificado;
    }

    public void setIdCertificado(Long idCertificado) {
        this.idCertificado = idCertificado;
    }

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
    }

    public String getNomeTreinamento() {
        return nomeTreinamento;
    }

    public void setNomeTreinamento(String nomeTreinamento) {
        this.nomeTreinamento = nomeTreinamento;
    }

    public LocalDate getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDate dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public Integer getValidadeMeses() {
        return validadeMeses;
    }

    public void setValidadeMeses(Integer validadeMeses) {
        this.validadeMeses = validadeMeses;
    }

    public String getStatusCertificacao() {
        return statusCertificacao;
    }

    public void setStatusCertificacao(String statusCertificacao) {
        this.statusCertificacao = statusCertificacao;
    }

    public String getLinkCertificadoPdf() {
        return linkCertificadoPdf;
    }

    public void setLinkCertificadoPdf(String linkCertificadoPdf) {
        this.linkCertificadoPdf = linkCertificadoPdf;
    }
}

