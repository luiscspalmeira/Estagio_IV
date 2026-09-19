
package br.com.principal.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sala")
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sala")
    private Long idSala;

    @Column(name = "nome_da_oficina_estilo", nullable = false, length = 150, unique = true)
    private String nomeDaOficinaEstilo;

    @Column(name = "capacidade_maxima_alunos", nullable = false)
    private Short capacidadeMaximaAlunos;

    @Column(name = "horario_manha", length = 100)
    private String horarioManha;

    @Column(name = "horario_tarde", length = 100)
    private String horarioTarde;

    @Column(name = "horario_noite", length = 100)
    private String horarioNoite;

    @Column(name = "tipo_de_piso", length = 100)
    private String tipoDePiso;

    @Column(name = "possui_espelhos")
    private Boolean possuiEspelhos;

    @Column(name = "possui_barras_fixas")
    private Boolean possuiBarrasFixas;

    @Column(name = "extintor_carga_tipo", length = 100)
    private String extintorCargaTipo;

    @Column(name = "extintor_data_vencimento")
    private LocalDate extintorDataVencimento;

    @Column(name = "rota_emergencia_sinalizada")
    private Boolean rotaEmergenciaSinalizada;

    @Column(name = "capacidade_saida_emergencia")
    private Short capacidadeSaidaEmergencia;

    @Column(name = "possui_mapa_seguranca_visivel")
    private Boolean possuiMapaSegurancaVisivel;

    @Column(name = "localizacao_kit_primeiros_socorros", length = 200)
    private String localizacaoKitPrimeirosSocorros;

    @Column(name = "bebedouro_proximo")
    private Boolean bebedouroProximo;

    @Column(name = "bebedouro_filtro_data_troca")
    private LocalDate bebedouroFiltroDataTroca;

    @Column(name = "banheiro_proximo_tipo", length = 100)
    private String banheiroProximoTipo;

    @Column(name = "cantina_proxima")
    private Boolean cantinaProxima;

    @Column(name = "manutencao_predial_periodicidade", length = 100)
    private String manutencaoPredialPeriodicidade;

    @Column(name = "manutencao_ultima_data")
    private LocalDate manutencaoUltimaData;

    @Column(name = "manutencao_proxima_data")
    private LocalDate manutencaoProximaData;

    @Column(name = "manutencao_perfil_tecnico_responsavel", length = 150)
    private String manutencaoPerfilTecnicoResponsavel;

    @Column(name = "estado_conservacao", length = 50)
    private String estadoConservacao;

    @Column(name = "observacoes")
    private String observacoes;

    public Sala() {
    }

    public Long getIdSala() {
        return idSala;
    }

    public void setIdSala(Long idSala) {
        this.idSala = idSala;
    }

    public String getNomeDaOficinaEstilo() {
        return nomeDaOficinaEstilo;
    }

    public void setNomeDaOficinaEstilo(String nomeDaOficinaEstilo) {
        this.nomeDaOficinaEstilo = nomeDaOficinaEstilo;
    }

    public Short getCapacidadeMaximaAlunos() {
        return capacidadeMaximaAlunos;
    }

    public void setCapacidadeMaximaAlunos(Short capacidadeMaximaAlunos) {
        this.capacidadeMaximaAlunos = capacidadeMaximaAlunos;
    }

    public String getHorarioManha() {
        return horarioManha;
    }

    public void setHorarioManha(String horarioManha) {
        this.horarioManha = horarioManha;
    }

    public String getHorarioTarde() {
        return horarioTarde;
    }

    public void setHorarioTarde(String horarioTarde) {
        this.horarioTarde = horarioTarde;
    }

    public String getHorarioNoite() {
        return horarioNoite;
    }

    public void setHorarioNoite(String horarioNoite) {
        this.horarioNoite = horarioNoite;
    }

    public String getTipoDePiso() {
        return tipoDePiso;
    }

    public void setTipoDePiso(String tipoDePiso) {
        this.tipoDePiso = tipoDePiso;
    }

    public Boolean getPossuiEspelhos() {
        return possuiEspelhos;
    }

    public void setPossuiEspelhos(Boolean possuiEspelhos) {
        this.possuiEspelhos = possuiEspelhos;
    }

    public Boolean getPossuiBarrasFixas() {
        return possuiBarrasFixas;
    }

    public void setPossuiBarrasFixas(Boolean possuiBarrasFixas) {
        this.possuiBarrasFixas = possuiBarrasFixas;
    }

    public String getExtintorCargaTipo() {
        return extintorCargaTipo;
    }

    public void setExtintorCargaTipo(String extintorCargaTipo) {
        this.extintorCargaTipo = extintorCargaTipo;
    }

    public LocalDate getExtintorDataVencimento() {
        return extintorDataVencimento;
    }

    public void setExtintorDataVencimento(LocalDate extintorDataVencimento) {
        this.extintorDataVencimento = extintorDataVencimento;
    }

    public Boolean getRotaEmergenciaSinalizada() {
        return rotaEmergenciaSinalizada;
    }

    public void setRotaEmergenciaSinalizada(Boolean rotaEmergenciaSinalizada) {
        this.rotaEmergenciaSinalizada = rotaEmergenciaSinalizada;
    }

    public Short getCapacidadeSaidaEmergencia() {
        return capacidadeSaidaEmergencia;
    }

    public void setCapacidadeSaidaEmergencia(Short capacidadeSaidaEmergencia) {
        this.capacidadeSaidaEmergencia = capacidadeSaidaEmergencia;
    }

    public Boolean getPossuiMapaSegurancaVisivel() {
        return possuiMapaSegurancaVisivel;
    }

    public void setPossuiMapaSegurancaVisivel(Boolean possuiMapaSegurancaVisivel) {
        this.possuiMapaSegurancaVisivel = possuiMapaSegurancaVisivel;
    }

    public String getLocalizacaoKitPrimeirosSocorros() {
        return localizacaoKitPrimeirosSocorros;
    }

    public void setLocalizacaoKitPrimeirosSocorros(String localizacaoKitPrimeirosSocorros) {
        this.localizacaoKitPrimeirosSocorros = localizacaoKitPrimeirosSocorros;
    }

    public Boolean getBebedouroProximo() {
        return bebedouroProximo;
    }

    public void setBebedouroProximo(Boolean bebedouroProximo) {
        this.bebedouroProximo = bebedouroProximo;
    }

    public LocalDate getBebedouroFiltroDataTroca() {
        return bebedouroFiltroDataTroca;
    }

    public void setBebedouroFiltroDataTroca(LocalDate bebedouroFiltroDataTroca) {
        this.bebedouroFiltroDataTroca = bebedouroFiltroDataTroca;
    }

    public String getBanheiroProximoTipo() {
        return banheiroProximoTipo;
    }

    public void setBanheiroProximoTipo(String banheiroProximoTipo) {
        this.banheiroProximoTipo = banheiroProximoTipo;
    }

    public Boolean getCantinaProxima() {
        return cantinaProxima;
    }

    public void setCantinaProxima(Boolean cantinaProxima) {
        this.cantinaProxima = cantinaProxima;
    }

    public String getManutencaoPredialPeriodicidade() {
        return manutencaoPredialPeriodicidade;
    }

    public void setManutencaoPredialPeriodicidade(String manutencaoPredialPeriodicidade) {
        this.manutencaoPredialPeriodicidade = manutencaoPredialPeriodicidade;
    }

    public LocalDate getManutencaoUltimaData() {
        return manutencaoUltimaData;
    }

    public void setManutencaoUltimaData(LocalDate manutencaoUltimaData) {
        this.manutencaoUltimaData = manutencaoUltimaData;
    }

    public LocalDate getManutencaoProximaData() {
        return manutencaoProximaData;
    }

    public void setManutencaoProximaData(LocalDate manutencaoProximaData) {
        this.manutencaoProximaData = manutencaoProximaData;
    }

    public String getManutencaoPerfilTecnicoResponsavel() {
        return manutencaoPerfilTecnicoResponsavel;
    }

    public void setManutencaoPerfilTecnicoResponsavel(String manutencaoPerfilTecnicoResponsavel) {
        this.manutencaoPerfilTecnicoResponsavel = manutencaoPerfilTecnicoResponsavel;
    }

    public String getEstadoConservacao() {
        return estadoConservacao;
    }

    public void setEstadoConservacao(String estadoConservacao) {
        this.estadoConservacao = estadoConservacao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}

