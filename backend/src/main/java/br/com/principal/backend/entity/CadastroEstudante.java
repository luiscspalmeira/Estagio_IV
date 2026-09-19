package br.com.principal.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "cadastro_estudante")
public class CadastroEstudante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aluno")
    private Long idAluno;

    @Column(name = "nome_completo", nullable = false, length = 150)
    private String nomeCompleto;

    @Column(name = "nome_social", length = 150)
    private String nomeSocial;

    @Column(name = "cpf", length = 11, unique = true)
    private String cpf;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "local_nascimento_naturalidade", length = 150)
    private String localNascimentoNaturalidade;

    @Column(name = "cor_raca", length = 30)
    private String corRaca;

    @Column(name = "genero", length = 30)
    private String genero;

    @Column(name = "cep", length = 8)
    private String cep;

    @Column(name = "endereco_completo", length = 250)
    private String enderecoCompleto;

    @Column(name = "cidade_onde_reside", length = 100)
    private String cidadeOndeReside;

    @Column(name = "escola_regular_onde_estuda", length = 200)
    private String escolaRegularOndeEstuda;

    @Column(name = "serie_ano_escola_regular", length = 50)
    private String serieAnoEscolaRegular;

    @Column(name = "cadastro_unico")
    private Boolean cadastroUnico;

    @Column(name = "numero_nis", length = 11, unique = true)
    private String numeroNis;

    @Column(name = "telefone_estudante", length = 20)
    private String telefoneEstudante;

    @Column(name = "email_estudante", length = 150)
    private String emailEstudante;

    @Column(name = "total_pessoas_nucleo_familiar")
    private Short totalPessoasNucleoFamiliar;

    @Column(name = "criado_em", nullable = false)
    private OffsetDateTime criadoEm;

    @Column(name = "atualizado_em", nullable = false)
    private OffsetDateTime atualizadoEm;

    public CadastroEstudante() {
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

    public String getLocalNascimentoNaturalidade() {
        return localNascimentoNaturalidade;
    }

    public void setLocalNascimentoNaturalidade(String localNascimentoNaturalidade) {
        this.localNascimentoNaturalidade = localNascimentoNaturalidade;
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

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEnderecoCompleto() {
        return enderecoCompleto;
    }

    public void setEnderecoCompleto(String enderecoCompleto) {
        this.enderecoCompleto = enderecoCompleto;
    }

    public String getCidadeOndeReside() {
        return cidadeOndeReside;
    }

    public void setCidadeOndeReside(String cidadeOndeReside) {
        this.cidadeOndeReside = cidadeOndeReside;
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

    public Boolean getCadastroUnico() {
        return cadastroUnico;
    }

    public void setCadastroUnico(Boolean cadastroUnico) {
        this.cadastroUnico = cadastroUnico;
    }

    public String getNumeroNis() {
        return numeroNis;
    }

    public void setNumeroNis(String numeroNis) {
        this.numeroNis = numeroNis;
    }

    public String getTelefoneEstudante() {
        return telefoneEstudante;
    }

    public void setTelefoneEstudante(String telefoneEstudante) {
        this.telefoneEstudante = telefoneEstudante;
    }

    public String getEmailEstudante() {
        return emailEstudante;
    }

    public void setEmailEstudante(String emailEstudante) {
        this.emailEstudante = emailEstudante;
    }

    public Short getTotalPessoasNucleoFamiliar() {
        return totalPessoasNucleoFamiliar;
    }

    public void setTotalPessoasNucleoFamiliar(Short totalPessoasNucleoFamiliar) {
        this.totalPessoasNucleoFamiliar = totalPessoasNucleoFamiliar;
    }

    public OffsetDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(OffsetDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public OffsetDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(OffsetDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }

    @PrePersist
    protected void antesDeInserir() {
        OffsetDateTime agora = OffsetDateTime.now();

        if (criadoEm == null) {
            criadoEm = agora;
        }

        if (atualizadoEm == null) {
            atualizadoEm = agora;
        }
    }

}
