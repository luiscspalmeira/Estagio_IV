package br.com.principal.backend.entity;



import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "saude_equipe",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_saude_equipe_ano",
            columnNames = {
                "id_colaborador",
                "ano_referencia"
            }
        )
    }
)
public class SaudeEquipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_saude_equipe")
    private Long idSaudeEquipe;

    @Column(name = "id_colaborador", nullable = false)
    private Long idColaborador;

    @Column(name = "ano_referencia", nullable = false)
    private Short anoReferencia;

    @Column(name = "apresentou_atestado_saude_ocupacional")
    private Boolean apresentouAtestadoSaudeOcupacional;

    @Column(name = "data_validade_atestado")
    private LocalDate dataValidadeAtestado;

    @Column(name = "possui_deficiencia_pcd")
    private Boolean possuiDeficienciaPcd;

    @Column(name = "tipo_deficiencia_laudo", length = 100)
    private String tipoDeficienciaLaudo;

    @Column(name = "laudo_medico_pcd_link")
    private String laudoMedicoPcdLink;

    @Column(name = "alergias_graves")
    private String alergiasGraves;

    @Column(name = "alergias_doc_link")
    private String alergiasDocLink;

    @Column(name = "alimentacao_restricao")
    private Boolean alimentacaoRestricao;

    @Column(name = "alimentacao_restricao_descricao")
    private String alimentacaoRestricaoDescricao;

    @Column(name = "alimentacao_choque_anafilatico_alerta")
    private Boolean alimentacaoChoqueAnafilaticoAlerta;

    @Column(name = "doencas_cronicas_restricoes")
    private String doencasCronicasRestricoes;

    @Column(name = "doencas_cronicas_doc_link")
    private String doencasCronicasDocLink;

    @Column(name = "medicacao_uso_continuo")
    private String medicacaoUsoContinuo;

    @Column(name = "receita_medicacao_link")
    private String receitaMedicacaoLink;

    @Column(name = "vacina_digital_status", length = 50)
    private String vacinaDigitalStatus;

    @Column(name = "vacina_codigo_validacao_govbr", length = 100)
    private String vacinaCodigoValidacaoGovbr;

    @Column(name = "vacina_pdf_conectesus_link")
    private String vacinaPdfConectesusLink;

    @Column(name = "restricao_fisica_para_aula_pratica")
    private Boolean restricaoFisicaParaAulaPratica;

    @Column(name = "parecer_restricao_descricao")
    private String parecerRestricaoDescricao;

    public SaudeEquipe() {
    }

    public Long getIdSaudeEquipe() {
        return idSaudeEquipe;
    }

    public void setIdSaudeEquipe(Long idSaudeEquipe) {
        this.idSaudeEquipe = idSaudeEquipe;
    }

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
    }

    public Short getAnoReferencia() {
        return anoReferencia;
    }

    public void setAnoReferencia(Short anoReferencia) {
        this.anoReferencia = anoReferencia;
    }

    public Boolean getApresentouAtestadoSaudeOcupacional() {
        return apresentouAtestadoSaudeOcupacional;
    }

    public void setApresentouAtestadoSaudeOcupacional(
            Boolean apresentouAtestadoSaudeOcupacional) {
        this.apresentouAtestadoSaudeOcupacional =
                apresentouAtestadoSaudeOcupacional;
    }

    public LocalDate getDataValidadeAtestado() {
        return dataValidadeAtestado;
    }

    public void setDataValidadeAtestado(LocalDate dataValidadeAtestado) {
        this.dataValidadeAtestado = dataValidadeAtestado;
    }

    public Boolean getPossuiDeficienciaPcd() {
        return possuiDeficienciaPcd;
    }

    public void setPossuiDeficienciaPcd(Boolean possuiDeficienciaPcd) {
        this.possuiDeficienciaPcd = possuiDeficienciaPcd;
    }

    public String getTipoDeficienciaLaudo() {
        return tipoDeficienciaLaudo;
    }

    public void setTipoDeficienciaLaudo(String tipoDeficienciaLaudo) {
        this.tipoDeficienciaLaudo = tipoDeficienciaLaudo;
    }

    public String getLaudoMedicoPcdLink() {
        return laudoMedicoPcdLink;
    }

    public void setLaudoMedicoPcdLink(String laudoMedicoPcdLink) {
        this.laudoMedicoPcdLink = laudoMedicoPcdLink;
    }

    public String getAlergiasGraves() {
        return alergiasGraves;
    }

    public void setAlergiasGraves(String alergiasGraves) {
        this.alergiasGraves = alergiasGraves;
    }

    public String getAlergiasDocLink() {
        return alergiasDocLink;
    }

    public void setAlergiasDocLink(String alergiasDocLink) {
        this.alergiasDocLink = alergiasDocLink;
    }

    public Boolean getAlimentacaoRestricao() {
        return alimentacaoRestricao;
    }

    public void setAlimentacaoRestricao(Boolean alimentacaoRestricao) {
        this.alimentacaoRestricao = alimentacaoRestricao;
    }

    public String getAlimentacaoRestricaoDescricao() {
        return alimentacaoRestricaoDescricao;
    }

    public void setAlimentacaoRestricaoDescricao(
            String alimentacaoRestricaoDescricao) {
        this.alimentacaoRestricaoDescricao =
                alimentacaoRestricaoDescricao;
    }

    public Boolean getAlimentacaoChoqueAnafilaticoAlerta() {
        return alimentacaoChoqueAnafilaticoAlerta;
    }

    public void setAlimentacaoChoqueAnafilaticoAlerta(
            Boolean alimentacaoChoqueAnafilaticoAlerta) {
        this.alimentacaoChoqueAnafilaticoAlerta =
                alimentacaoChoqueAnafilaticoAlerta;
    }

    public String getDoencasCronicasRestricoes() {
        return doencasCronicasRestricoes;
    }

    public void setDoencasCronicasRestricoes(
            String doencasCronicasRestricoes) {
        this.doencasCronicasRestricoes =
                doencasCronicasRestricoes;
    }

    public String getDoencasCronicasDocLink() {
        return doencasCronicasDocLink;
    }

    public void setDoencasCronicasDocLink(
            String doencasCronicasDocLink) {
        this.doencasCronicasDocLink = doencasCronicasDocLink;
    }

    public String getMedicacaoUsoContinuo() {
        return medicacaoUsoContinuo;
    }

    public void setMedicacaoUsoContinuo(String medicacaoUsoContinuo) {
        this.medicacaoUsoContinuo = medicacaoUsoContinuo;
    }

    public String getReceitaMedicacaoLink() {
        return receitaMedicacaoLink;
    }

    public void setReceitaMedicacaoLink(String receitaMedicacaoLink) {
        this.receitaMedicacaoLink = receitaMedicacaoLink;
    }

    public String getVacinaDigitalStatus() {
        return vacinaDigitalStatus;
    }

    public void setVacinaDigitalStatus(String vacinaDigitalStatus) {
        this.vacinaDigitalStatus = vacinaDigitalStatus;
    }

    public String getVacinaCodigoValidacaoGovbr() {
        return vacinaCodigoValidacaoGovbr;
    }

    public void setVacinaCodigoValidacaoGovbr(
            String vacinaCodigoValidacaoGovbr) {
        this.vacinaCodigoValidacaoGovbr =
                vacinaCodigoValidacaoGovbr;
    }

    public String getVacinaPdfConectesusLink() {
        return vacinaPdfConectesusLink;
    }

    public void setVacinaPdfConectesusLink(
            String vacinaPdfConectesusLink) {
        this.vacinaPdfConectesusLink =
                vacinaPdfConectesusLink;
    }

    public Boolean getRestricaoFisicaParaAulaPratica() {
        return restricaoFisicaParaAulaPratica;
    }

    public void setRestricaoFisicaParaAulaPratica(
            Boolean restricaoFisicaParaAulaPratica) {
        this.restricaoFisicaParaAulaPratica =
                restricaoFisicaParaAulaPratica;
    }

    public String getParecerRestricaoDescricao() {
        return parecerRestricaoDescricao;
    }

    public void setParecerRestricaoDescricao(
            String parecerRestricaoDescricao) {
        this.parecerRestricaoDescricao =
                parecerRestricaoDescricao;
    }
}


