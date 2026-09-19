
package br.com.principal.backend.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "saude_biometria")
public class SaudeBiometria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_registro_saude")
    private Long idRegistroSaude;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "semestre_ano", nullable = false, length = 7)
    private String semestreAno;

    @Column(name = "possui_deficiencia")
    private Boolean possuiDeficiencia;

    @Column(name = "tipo_deficiencia_laudo", length = 100)
    private String tipoDeficienciaLaudo;

    @Column(name = "laudo_medico_link")
    private String laudoMedicoLink;

    @Column(name = "relatorio_tecnico_link")
    private String relatorioTecnicoLink;

    @Column(name = "alergias")
    private String alergias;

    @Column(name = "alergias_doc_link")
    private String alergiasDocLink;

    @Column(name = "alimentacao_restricao")
    private Boolean alimentacaoRestricao;

    @Column(name = "alimentacao_restricao_descricao")
    private String alimentacaoRestricaoDescricao;

    @Column(name = "alimentacao_seletividade")
    private Boolean alimentacaoSeletividade;

    @Column(name = "alimentacao_seletividade_detalhes")
    private String alimentacaoSeletividadeDetalhes;

    @Column(name = "alimentacao_laudo_nutricional_link")
    private String alimentacaoLaudoNutricionalLink;

    @Column(name = "doencas_cronicas")
    private String doencasCronicas;

    @Column(name = "doencas_cronicas_doc_link")
    private String doencasCronicasDocLink;

    @Column(name = "medicacao_controlada")
    private String medicacaoControlada;

    @Column(name = "medicacao_controlada_doc_link")
    private String medicacaoControladaDocLink;

    @Column(name = "medicacao_eventual")
    private String medicacaoEventual;

    @Column(name = "medicacao_eventual_doc_link")
    private String medicacaoEventualDocLink;

    @Column(name = "liberacao_medica_atividade")
    private Boolean liberacaoMedicaAtividade;

    @Column(name = "numero_sus", length = 20)
    private String numeroSus;

    @Column(name = "vacina_digital_status", length = 50)
    private String vacinaDigitalStatus;

    @Column(name = "vacina_codigo_validacao_govbr", length = 100)
    private String vacinaCodigoValidacaoGovbr;

    @Column(name = "vacina_pdf_conectesus_link")
    private String vacinaPdfConectesusLink;

    @Column(name = "peso_kg", precision = 5, scale = 2)
    private BigDecimal pesoKg;

    @Column(name = "altura_metros", precision = 4, scale = 2)
    private BigDecimal alturaMetros;

    @Column(name = "tamanho_calcado_sapatilha", length = 20)
    private String tamanhoCalcadoSapatilha;

    public SaudeBiometria() {
    }

    public Long getIdRegistroSaude() {
        return idRegistroSaude;
    }

    public void setIdRegistroSaude(Long idRegistroSaude) {
        this.idRegistroSaude = idRegistroSaude;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public String getSemestreAno() {
        return semestreAno;
    }

    public void setSemestreAno(String semestreAno) {
        this.semestreAno = semestreAno;
    }

    public Boolean getPossuiDeficiencia() {
        return possuiDeficiencia;
    }

    public void setPossuiDeficiencia(Boolean possuiDeficiencia) {
        this.possuiDeficiencia = possuiDeficiencia;
    }

    public String getTipoDeficienciaLaudo() {
        return tipoDeficienciaLaudo;
    }

    public void setTipoDeficienciaLaudo(String tipoDeficienciaLaudo) {
        this.tipoDeficienciaLaudo = tipoDeficienciaLaudo;
    }

    public String getLaudoMedicoLink() {
        return laudoMedicoLink;
    }

    public void setLaudoMedicoLink(String laudoMedicoLink) {
        this.laudoMedicoLink = laudoMedicoLink;
    }

    public String getRelatorioTecnicoLink() {
        return relatorioTecnicoLink;
    }

    public void setRelatorioTecnicoLink(String relatorioTecnicoLink) {
        this.relatorioTecnicoLink = relatorioTecnicoLink;
    }

    public String getAlergias() {
        return alergias;
    }

    public void setAlergias(String alergias) {
        this.alergias = alergias;
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

    public Boolean getAlimentacaoSeletividade() {
        return alimentacaoSeletividade;
    }

    public void setAlimentacaoSeletividade(
            Boolean alimentacaoSeletividade) {
        this.alimentacaoSeletividade =
                alimentacaoSeletividade;
    }

    public String getAlimentacaoSeletividadeDetalhes() {
        return alimentacaoSeletividadeDetalhes;
    }

    public void setAlimentacaoSeletividadeDetalhes(
            String alimentacaoSeletividadeDetalhes) {
        this.alimentacaoSeletividadeDetalhes =
                alimentacaoSeletividadeDetalhes;
    }

    public String getAlimentacaoLaudoNutricionalLink() {
        return alimentacaoLaudoNutricionalLink;
    }

    public void setAlimentacaoLaudoNutricionalLink(
            String alimentacaoLaudoNutricionalLink) {
        this.alimentacaoLaudoNutricionalLink =
                alimentacaoLaudoNutricionalLink;
    }

    public String getDoencasCronicas() {
        return doencasCronicas;
    }

    public void setDoencasCronicas(String doencasCronicas) {
        this.doencasCronicas = doencasCronicas;
    }

    public String getDoencasCronicasDocLink() {
        return doencasCronicasDocLink;
    }

    public void setDoencasCronicasDocLink(
            String doencasCronicasDocLink) {
        this.doencasCronicasDocLink =
                doencasCronicasDocLink;
    }

    public String getMedicacaoControlada() {
        return medicacaoControlada;
    }

    public void setMedicacaoControlada(String medicacaoControlada) {
        this.medicacaoControlada = medicacaoControlada;
    }

    public String getMedicacaoControladaDocLink() {
        return medicacaoControladaDocLink;
    }

    public void setMedicacaoControladaDocLink(
            String medicacaoControladaDocLink) {
        this.medicacaoControladaDocLink =
                medicacaoControladaDocLink;
    }

    public String getMedicacaoEventual() {
        return medicacaoEventual;
    }

    public void setMedicacaoEventual(String medicacaoEventual) {
        this.medicacaoEventual = medicacaoEventual;
    }

    public String getMedicacaoEventualDocLink() {
        return medicacaoEventualDocLink;
    }

    public void setMedicacaoEventualDocLink(
            String medicacaoEventualDocLink) {
        this.medicacaoEventualDocLink =
                medicacaoEventualDocLink;
    }

    public Boolean getLiberacaoMedicaAtividade() {
        return liberacaoMedicaAtividade;
    }

    public void setLiberacaoMedicaAtividade(
            Boolean liberacaoMedicaAtividade) {
        this.liberacaoMedicaAtividade =
                liberacaoMedicaAtividade;
    }

    public String getNumeroSus() {
        return numeroSus;
    }

    public void setNumeroSus(String numeroSus) {
        this.numeroSus = numeroSus;
    }

    public String getVacinaDigitalStatus() {
        return vacinaDigitalStatus;
    }

    public void setVacinaDigitalStatus(String vacinaDigitalStatus) {
        this.vacinaDigitalStatus =
                vacinaDigitalStatus;
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

    public BigDecimal getPesoKg() {
        return pesoKg;
    }

    public void setPesoKg(BigDecimal pesoKg) {
        this.pesoKg = pesoKg;
    }

    public BigDecimal getAlturaMetros() {
        return alturaMetros;
    }

    public void setAlturaMetros(BigDecimal alturaMetros) {
        this.alturaMetros = alturaMetros;
    }

    public String getTamanhoCalcadoSapatilha() {
        return tamanhoCalcadoSapatilha;
    }

    public void setTamanhoCalcadoSapatilha(
            String tamanhoCalcadoSapatilha) {
        this.tamanhoCalcadoSapatilha =
                tamanhoCalcadoSapatilha;
    }
}

