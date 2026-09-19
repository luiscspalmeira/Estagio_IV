
package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "criterio_brasil")
public class CriterioBrasil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_socioeconomico")
    private Long idSocioeconomico;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "ano_semestre_referencia", nullable = false, length = 7)
    private String anoSemestreReferencia;

    @Column(name = "quantidade_banheiros")
    private Short quantidadeBanheiros;

    @Column(name = "quantidade_empregados_domesticos")
    private Short quantidadeEmpregadosDomesticos;

    @Column(name = "quantidade_automoveis")
    private Short quantidadeAutomoveis;

    @Column(name = "quantidade_microcomputadores")
    private Short quantidadeMicrocomputadores;

    @Column(name = "quantidade_lava_loucas")
    private Short quantidadeLavaLoucas;

    @Column(name = "quantidade_geladeiras")
    private Short quantidadeGeladeiras;

    @Column(name = "quantidade_freezers")
    private Short quantidadeFreezers;

    @Column(name = "quantidade_lava_roupas")
    private Short quantidadeLavaRoupas;

    @Column(name = "secadora_roupas")
    private Boolean secadoraRoupas;

    @Column(name = "microondas")
    private Boolean microondas;

    @Column(name = "motocicletas")
    private Short motocicletas;

    @Column(name = "secadora_lavar_conjunta")
    private Boolean secadoraLavarConjunta;

    @Column(name = "agua_encanada")
    private Boolean aguaEncanada;

    @Column(name = "rua_asfaltada")
    private Boolean ruaAsfaltada;

    @Column(name = "grau_instrucao_chefe_familia", length = 100)
    private String grauInstrucaoChefeFamilia;

    @Column(name = "total_pontos_abep")
    private Short totalPontosAbep;

    @Column(name = "classe_economica_final", length = 20)
    private String classeEconomicaFinal;

    public CriterioBrasil() {
    }

    public Long getIdSocioeconomico() {
        return idSocioeconomico;
    }

    public void setIdSocioeconomico(Long idSocioeconomico) {
        this.idSocioeconomico = idSocioeconomico;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public String getAnoSemestreReferencia() {
        return anoSemestreReferencia;
    }

    public void setAnoSemestreReferencia(String anoSemestreReferencia) {
        this.anoSemestreReferencia = anoSemestreReferencia;
    }

    public Short getQuantidadeBanheiros() {
        return quantidadeBanheiros;
    }

    public void setQuantidadeBanheiros(Short quantidadeBanheiros) {
        this.quantidadeBanheiros = quantidadeBanheiros;
    }

    public Short getQuantidadeEmpregadosDomesticos() {
        return quantidadeEmpregadosDomesticos;
    }

    public void setQuantidadeEmpregadosDomesticos(Short quantidadeEmpregadosDomesticos) {
        this.quantidadeEmpregadosDomesticos = quantidadeEmpregadosDomesticos;
    }

    public Short getQuantidadeAutomoveis() {
        return quantidadeAutomoveis;
    }

    public void setQuantidadeAutomoveis(Short quantidadeAutomoveis) {
        this.quantidadeAutomoveis = quantidadeAutomoveis;
    }

    public Short getQuantidadeMicrocomputadores() {
        return quantidadeMicrocomputadores;
    }

    public void setQuantidadeMicrocomputadores(Short quantidadeMicrocomputadores) {
        this.quantidadeMicrocomputadores = quantidadeMicrocomputadores;
    }

    public Short getQuantidadeLavaLoucas() {
        return quantidadeLavaLoucas;
    }

    public void setQuantidadeLavaLoucas(Short quantidadeLavaLoucas) {
        this.quantidadeLavaLoucas = quantidadeLavaLoucas;
    }

    public Short getQuantidadeGeladeiras() {
        return quantidadeGeladeiras;
    }

    public void setQuantidadeGeladeiras(Short quantidadeGeladeiras) {
        this.quantidadeGeladeiras = quantidadeGeladeiras;
    }

    public Short getQuantidadeFreezers() {
        return quantidadeFreezers;
    }

    public void setQuantidadeFreezers(Short quantidadeFreezers) {
        this.quantidadeFreezers = quantidadeFreezers;
    }

    public Short getQuantidadeLavaRoupas() {
        return quantidadeLavaRoupas;
    }

    public void setQuantidadeLavaRoupas(Short quantidadeLavaRoupas) {
        this.quantidadeLavaRoupas = quantidadeLavaRoupas;
    }

    public Boolean getSecadoraRoupas() {
        return secadoraRoupas;
    }

    public void setSecadoraRoupas(Boolean secadoraRoupas) {
        this.secadoraRoupas = secadoraRoupas;
    }

    public Boolean getMicroondas() {
        return microondas;
    }

    public void setMicroondas(Boolean microondas) {
        this.microondas = microondas;
    }

    public Short getMotocicletas() {
        return motocicletas;
    }

    public void setMotocicletas(Short motocicletas) {
        this.motocicletas = motocicletas;
    }

    public Boolean getSecadoraLavarConjunta() {
        return secadoraLavarConjunta;
    }

    public void setSecadoraLavarConjunta(Boolean secadoraLavarConjunta) {
        this.secadoraLavarConjunta = secadoraLavarConjunta;
    }

    public Boolean getAguaEncanada() {
        return aguaEncanada;
    }

    public void setAguaEncanada(Boolean aguaEncanada) {
        this.aguaEncanada = aguaEncanada;
    }

    public Boolean getRuaAsfaltada() {
        return ruaAsfaltada;
    }

    public void setRuaAsfaltada(Boolean ruaAsfaltada) {
        this.ruaAsfaltada = ruaAsfaltada;
    }

    public String getGrauInstrucaoChefeFamilia() {
        return grauInstrucaoChefeFamilia;
    }

    public void setGrauInstrucaoChefeFamilia(String grauInstrucaoChefeFamilia) {
        this.grauInstrucaoChefeFamilia = grauInstrucaoChefeFamilia;
    }

    public Short getTotalPontosAbep() {
        return totalPontosAbep;
    }

    public void setTotalPontosAbep(Short totalPontosAbep) {
        this.totalPontosAbep = totalPontosAbep;
    }

    public String getClasseEconomicaFinal() {
        return classeEconomicaFinal;
    }

    public void setClasseEconomicaFinal(String classeEconomicaFinal) {
        this.classeEconomicaFinal = classeEconomicaFinal;
    }
}

