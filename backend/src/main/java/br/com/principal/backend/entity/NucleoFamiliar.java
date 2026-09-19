
package br.com.principal.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nucleo_familiar")
public class NucleoFamiliar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_familiar")
    private Long idFamiliar;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "nome_completo", nullable = false, length = 150)
    private String nomeCompleto;

    @Column(name = "nome_social", length = 150)
    private String nomeSocial;

    @Column(name = "cpf", length = 11)
    private String cpf;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "cor_raca", length = 30)
    private String corRaca;

    @Column(name = "genero", length = 30)
    private String genero;

    @Column(name = "grau_parentesco", length = 50)
    private String grauParentesco;

    @Column(name = "telefone_contato", length = 20)
    private String telefoneContato;

    @Column(name = "email_familiar", length = 150)
    private String emailFamiliar;

    @Column(name = "grau_instrucao", length = 100)
    private String grauInstrucao;

    @Column(name = "estuda_atualmente")
    private Boolean estudaAtualmente;

    @Column(name = "escola_regular_onde_estuda", length = 200)
    private String escolaRegularOndeEstuda;

    @Column(name = "serie_ano_escola_regular", length = 50)
    private String serieAnoEscolaRegular;

    @Column(name = "profissional_ocupacao", length = 150)
    private String profissionalOcupacao;

    @Column(name = "possui_renda")
    private Boolean possuiRenda;

    @Column(name = "valor_renda_mensal", precision = 12, scale = 2)
    private BigDecimal valorRendaMensal;

    @Column(name = "numero_nis_familiar", length = 11)
    private String numeroNisFamiliar;

    @Column(name = "possui_deficiencia")
    private Boolean possuiDeficiencia;

    @Column(name = "tipo_deficiencia_laudo", length = 100)
    private String tipoDeficienciaLaudo;

    @Column(name = "alergias_doencas_cronicas")
    private String alergiasDoencasCronicas;

    @Column(name = "medicacao_controlada_eventual")
    private String medicacaoControladaEventual;

    public NucleoFamiliar() {
    }

    public Long getIdFamiliar() {
        return idFamiliar;
    }

    public void setIdFamiliar(Long idFamiliar) {
        this.idFamiliar = idFamiliar;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getNomeSocial() {
        return nomeSocial;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCorRaca() {
        return corRaca;
    }

    public void setCorRaca(String corRaca) {
        this.corRaca = corRaca;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getGrauParentesco() {
        return grauParentesco;
    }

    public void setGrauParentesco(String grauParentesco) {
        this.grauParentesco = grauParentesco;
    }

    public String getTelefoneContato() {
        return telefoneContato;
    }

    public void setTelefoneContato(String telefoneContato) {
        this.telefoneContato = telefoneContato;
    }

    public String getEmailFamiliar() {
        return emailFamiliar;
    }

    public void setEmailFamiliar(String emailFamiliar) {
        this.emailFamiliar = emailFamiliar;
    }

    public String getGrauInstrucao() {
        return grauInstrucao;
    }

    public void setGrauInstrucao(String grauInstrucao) {
        this.grauInstrucao = grauInstrucao;
    }

    public Boolean getEstudaAtualmente() {
        return estudaAtualmente;
    }

    public void setEstudaAtualmente(Boolean estudaAtualmente) {
        this.estudaAtualmente = estudaAtualmente;
    }

    public String getEscolaRegularOndeEstuda() {
        return escolaRegularOndeEstuda;
    }

    public void setEscolaRegularOndeEstuda(String escolaRegularOndeEstuda) {
        this.escolaRegularOndeEstuda = escolaRegularOndeEstuda;
    }

    public String getSerieAnoEscolaRegular() {
        return serieAnoEscolaRegular;
    }

    public void setSerieAnoEscolaRegular(String serieAnoEscolaRegular) {
        this.serieAnoEscolaRegular = serieAnoEscolaRegular;
    }

    public String getProfissionalOcupacao() {
        return profissionalOcupacao;
    }

    public void setProfissionalOcupacao(String profissionalOcupacao) {
        this.profissionalOcupacao = profissionalOcupacao;
    }

    public Boolean getPossuiRenda() {
        return possuiRenda;
    }

    public void setPossuiRenda(Boolean possuiRenda) {
        this.possuiRenda = possuiRenda;
    }

    public BigDecimal getValorRendaMensal() {
        return valorRendaMensal;
    }

    public void setValorRendaMensal(BigDecimal valorRendaMensal) {
        this.valorRendaMensal = valorRendaMensal;
    }

    public String getNumeroNisFamiliar() {
        return numeroNisFamiliar;
    }

    public void setNumeroNisFamiliar(String numeroNisFamiliar) {
        this.numeroNisFamiliar = numeroNisFamiliar;
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

    public String getAlergiasDoencasCronicas() {
        return alergiasDoencasCronicas;
    }

    public void setAlergiasDoencasCronicas(String alergiasDoencasCronicas) {
        this.alergiasDoencasCronicas = alergiasDoencasCronicas;
    }

    public String getMedicacaoControladaEventual() {
        return medicacaoControladaEventual;
    }

    public void setMedicacaoControladaEventual(String medicacaoControladaEventual) {
        this.medicacaoControladaEventual = medicacaoControladaEventual;
    }
}

