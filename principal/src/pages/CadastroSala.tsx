
import { type FormEvent, useState } from "react";
import "./CadastroSala.css";

interface SalaFormData {
  nomeDaOficinaEstilo: string;
  capacidadeMaximaAlunos: string;
  horarioManha: string;
  horarioTarde: string;
  horarioNoite: string;
  tipoDePiso: string;
  possuiEspelhos: string;
  possuiBarrasFixas: string;
  extintorCargaTipo: string;
  extintorDataVencimento: string;
  rotaEmergenciaSinalizada: string;
  capacidadeSaidaEmergencia: string;
  possuiMapaSegurancaVisivel: string;
  localizacaoKitPrimeirosSocorros: string;
  bebedouroProximo: string;
  bebedouroFiltroDataTroca: string;
  banheiroProximoTipo: string;
  cantinaProxima: string;
  manutencaoPredialPeriodicidade: string;
  manutencaoUltimaData: string;
  manutencaoProximaData: string;
  manutencaoPerfilTecnicoResponsavel: string;
  estadoConservacao: string;
  observacoes: string;
}

const estadoInicial: SalaFormData = {
  nomeDaOficinaEstilo: "",
  capacidadeMaximaAlunos: "",
  horarioManha: "",
  horarioTarde: "",
  horarioNoite: "",
  tipoDePiso: "",
  possuiEspelhos: "",
  possuiBarrasFixas: "",
  extintorCargaTipo: "",
  extintorDataVencimento: "",
  rotaEmergenciaSinalizada: "",
  capacidadeSaidaEmergencia: "",
  possuiMapaSegurancaVisivel: "",
  localizacaoKitPrimeirosSocorros: "",
  bebedouroProximo: "",
  bebedouroFiltroDataTroca: "",
  banheiroProximoTipo: "",
  cantinaProxima: "",
  manutencaoPredialPeriodicidade: "",
  manutencaoUltimaData: "",
  manutencaoProximaData: "",
  manutencaoPerfilTecnicoResponsavel: "",
  estadoConservacao: "",
  observacoes: "",
};

function CadastroSala() {
  const [formData, setFormData] = useState<SalaFormData>(estadoInicial);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value,
    }));
  };

  const converterBooleano = (valor: string): boolean | null => {
    if (valor === "") {
      return null;
    }

    return valor === "true";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!formData.nomeDaOficinaEstilo.trim()) {
      setErro("Informe o nome da oficina ou estilo.");
      return;
    }

    const capacidade = Number(formData.capacidadeMaximaAlunos);

    if (
      !formData.capacidadeMaximaAlunos ||
      !Number.isInteger(capacidade) ||
      capacidade <= 0
    ) {
      setErro("A capacidade máxima de alunos deve ser maior que zero.");
      return;
    }

    let capacidadeSaida: number | null = null;

    if (formData.capacidadeSaidaEmergencia !== "") {
      capacidadeSaida = Number(formData.capacidadeSaidaEmergencia);

      if (
        !Number.isInteger(capacidadeSaida) ||
        capacidadeSaida <= 0
      ) {
        setErro(
          "A capacidade da saída de emergência deve ser maior que zero."
        );
        return;
      }
    }

    if (
      formData.manutencaoUltimaData &&
      formData.manutencaoProximaData &&
      formData.manutencaoProximaData <
        formData.manutencaoUltimaData
    ) {
      setErro(
        "A próxima data de manutenção não pode ser anterior à última data de manutenção."
      );
      return;
    }

    const dadosParaEnviar = {
      nomeDaOficinaEstilo: formData.nomeDaOficinaEstilo.trim(),
      capacidadeMaximaAlunos: capacidade,

      horarioManha: formData.horarioManha || null,
      horarioTarde: formData.horarioTarde || null,
      horarioNoite: formData.horarioNoite || null,

      tipoDePiso: formData.tipoDePiso || null,

      possuiEspelhos: converterBooleano(formData.possuiEspelhos),
      possuiBarrasFixas: converterBooleano(formData.possuiBarrasFixas),

      extintorCargaTipo: formData.extintorCargaTipo || null,
      extintorDataVencimento:
        formData.extintorDataVencimento || null,

      rotaEmergenciaSinalizada: converterBooleano(
        formData.rotaEmergenciaSinalizada
      ),

      capacidadeSaidaEmergencia: capacidadeSaida,

      possuiMapaSegurancaVisivel: converterBooleano(
        formData.possuiMapaSegurancaVisivel
      ),

      localizacaoKitPrimeirosSocorros:
        formData.localizacaoKitPrimeirosSocorros || null,

      bebedouroProximo: converterBooleano(
        formData.bebedouroProximo
      ),

      bebedouroFiltroDataTroca:
        formData.bebedouroFiltroDataTroca || null,

      banheiroProximoTipo:
        formData.banheiroProximoTipo || null,

      cantinaProxima: converterBooleano(
        formData.cantinaProxima
      ),

      manutencaoPredialPeriodicidade:
        formData.manutencaoPredialPeriodicidade || null,

      manutencaoUltimaData:
        formData.manutencaoUltimaData || null,

      manutencaoProximaData:
        formData.manutencaoProximaData || null,

      manutencaoPerfilTecnicoResponsavel:
        formData.manutencaoPerfilTecnicoResponsavel || null,

      estadoConservacao:
        formData.estadoConservacao || null,

      observacoes:
        formData.observacoes || null,
    };

    try {
      setSalvando(true);

      const response = await fetch(
        "http://localhost:8080/salas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnviar),
        }
      );

      if (!response.ok) {
        const mensagemErro = await response.text();

        throw new Error(
          mensagemErro || "Não foi possível cadastrar a sala."
        );
      }

      const salaSalva = await response.json();

      setMensagem(
        `Sala cadastrada com sucesso! ID: ${salaSalva.idSala}`
      );

      setFormData(estadoInicial);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro inesperado ao cadastrar a sala.");
      }
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="cadastro-sala-container">
      <div className="cadastro-sala-card">
        <header className="cadastro-sala-header">
          <h1>Cadastro de Sala</h1>

          <p>
            Cadastre as informações da sala, oficina ou estilo,
            incluindo capacidade, infraestrutura, segurança e
            manutenção.
          </p>
        </header>

        {mensagem && (
          <div
            className="mensagem sucesso"
            role="status"
            aria-live="polite"
          >
            {mensagem}
          </div>
        )}

        {erro && (
          <div
            className="mensagem erro"
            role="alert"
            aria-live="assertive"
          >
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* IDENTIFICAÇÃO */}
          <section className="form-section">
            <h2>Identificação da sala</h2>

            <div className="form-grid">
              <div className="form-group form-group-full">
                <label htmlFor="nomeDaOficinaEstilo">
                  Nome da oficina ou estilo{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="nomeDaOficinaEstilo"
                  name="nomeDaOficinaEstilo"
                  type="text"
                  value={formData.nomeDaOficinaEstilo}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  aria-required="true"
                  placeholder="Ex.: Sala de Dança"
                />
              </div>

              <div className="form-group">
                <label htmlFor="capacidadeMaximaAlunos">
                  Capacidade máxima de alunos{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="capacidadeMaximaAlunos"
                  name="capacidadeMaximaAlunos"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.capacidadeMaximaAlunos}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipoDePiso">
                  Tipo de piso
                </label>

                <input
                  id="tipoDePiso"
                  name="tipoDePiso"
                  type="text"
                  value={formData.tipoDePiso}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: Madeira"
                />
              </div>
            </div>
          </section>

          {/* HORÁRIOS */}
          <section className="form-section">
            <h2>Horários de funcionamento</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="horarioManha">
                  Horário da manhã
                </label>

                <input
                  id="horarioManha"
                  name="horarioManha"
                  type="text"
                  value={formData.horarioManha}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: 08:00 às 12:00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="horarioTarde">
                  Horário da tarde
                </label>

                <input
                  id="horarioTarde"
                  name="horarioTarde"
                  type="text"
                  value={formData.horarioTarde}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: 14:00 às 18:00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="horarioNoite">
                  Horário da noite
                </label>

                <input
                  id="horarioNoite"
                  name="horarioNoite"
                  type="text"
                  value={formData.horarioNoite}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: 18:00 às 21:00"
                />
              </div>
            </div>
          </section>

          {/* INFRAESTRUTURA */}
          <section className="form-section">
            <h2>Infraestrutura e acessibilidade</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="possuiEspelhos">
                  Possui espelhos?
                </label>

                <select
                  id="possuiEspelhos"
                  name="possuiEspelhos"
                  value={formData.possuiEspelhos}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="possuiBarrasFixas">
                  Possui barras fixas?
                </label>

                <select
                  id="possuiBarrasFixas"
                  name="possuiBarrasFixas"
                  value={formData.possuiBarrasFixas}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="possuiMapaSegurancaVisivel">
                  Possui mapa de segurança visível?
                </label>

                <select
                  id="possuiMapaSegurancaVisivel"
                  name="possuiMapaSegurancaVisivel"
                  value={formData.possuiMapaSegurancaVisivel}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bebedouroProximo">
                  Possui bebedouro próximo?
                </label>

                <select
                  id="bebedouroProximo"
                  name="bebedouroProximo"
                  value={formData.bebedouroProximo}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bebedouroFiltroDataTroca">
                  Data de troca do filtro do bebedouro
                </label>

                <input
                  id="bebedouroFiltroDataTroca"
                  name="bebedouroFiltroDataTroca"
                  type="date"
                  value={formData.bebedouroFiltroDataTroca}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="banheiroProximoTipo">
                  Tipo de banheiro próximo
                </label>

                <input
                  id="banheiroProximoTipo"
                  name="banheiroProximoTipo"
                  type="text"
                  value={formData.banheiroProximoTipo}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: Banheiro acessível"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cantinaProxima">
                  Possui cantina próxima?
                </label>

                <select
                  id="cantinaProxima"
                  name="cantinaProxima"
                  value={formData.cantinaProxima}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="localizacaoKitPrimeirosSocorros">
                  Localização do kit de primeiros socorros
                </label>

                <input
                  id="localizacaoKitPrimeirosSocorros"
                  name="localizacaoKitPrimeirosSocorros"
                  type="text"
                  value={formData.localizacaoKitPrimeirosSocorros}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="Informe onde o kit está localizado"
                />
              </div>
            </div>
          </section>

          {/* SEGURANÇA */}
          <section className="form-section">
            <h2>Segurança</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="extintorCargaTipo">
                  Tipo/carga do extintor
                </label>

                <input
                  id="extintorCargaTipo"
                  name="extintorCargaTipo"
                  type="text"
                  value={formData.extintorCargaTipo}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: Pó químico"
                />
              </div>

              <div className="form-group">
                <label htmlFor="extintorDataVencimento">
                  Data de vencimento do extintor
                </label>

                <input
                  id="extintorDataVencimento"
                  name="extintorDataVencimento"
                  type="date"
                  value={formData.extintorDataVencimento}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rotaEmergenciaSinalizada">
                  Rota de emergência sinalizada?
                </label>

                <select
                  id="rotaEmergenciaSinalizada"
                  name="rotaEmergenciaSinalizada"
                  value={formData.rotaEmergenciaSinalizada}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="capacidadeSaidaEmergencia">
                  Capacidade da saída de emergência
                </label>

                <input
                  id="capacidadeSaidaEmergencia"
                  name="capacidadeSaidaEmergencia"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.capacidadeSaidaEmergencia}
                  onChange={handleChange}
                  placeholder="Ex.: 30"
                />
              </div>
            </div>
          </section>

          {/* MANUTENÇÃO */}
          <section className="form-section">
            <h2>Manutenção predial</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="manutencaoPredialPeriodicidade">
                  Periodicidade da manutenção
                </label>

                <input
                  id="manutencaoPredialPeriodicidade"
                  name="manutencaoPredialPeriodicidade"
                  type="text"
                  value={formData.manutencaoPredialPeriodicidade}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="Ex.: Semestral"
                />
              </div>

              <div className="form-group">
                <label htmlFor="manutencaoUltimaData">
                  Última data de manutenção
                </label>

                <input
                  id="manutencaoUltimaData"
                  name="manutencaoUltimaData"
                  type="date"
                  value={formData.manutencaoUltimaData}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="manutencaoProximaData">
                  Próxima data de manutenção
                </label>

                <input
                  id="manutencaoProximaData"
                  name="manutencaoProximaData"
                  type="date"
                  value={formData.manutencaoProximaData}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="manutencaoPerfilTecnicoResponsavel">
                  Perfil técnico responsável
                </label>

                <input
                  id="manutencaoPerfilTecnicoResponsavel"
                  name="manutencaoPerfilTecnicoResponsavel"
                  type="text"
                  value={formData.manutencaoPerfilTecnicoResponsavel}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="Ex.: Técnico de manutenção predial"
                />
              </div>

              <div className="form-group">
                <label htmlFor="estadoConservacao">
                  Estado de conservação
                </label>

                <select
                  id="estadoConservacao"
                  name="estadoConservacao"
                  value={formData.estadoConservacao}
                  onChange={handleChange}
                >
                  <option value="">Não informado</option>
                  <option value="Excelente">Excelente</option>
                  <option value="Bom">Bom</option>
                  <option value="Regular">Regular</option>
                  <option value="Ruim">Ruim</option>
                  <option value="Péssimo">Péssimo</option>
                </select>
              </div>
            </div>
          </section>

          {/* OBSERVAÇÕES */}
          <section className="form-section">
            <h2>Observações</h2>

            <div className="form-group form-group-full">
              <label htmlFor="observacoes">
                Observações
              </label>

              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows={6}
                placeholder="Digite informações adicionais sobre a sala."
              />
            </div>
          </section>

          <div className="form-actions">
            <button
              type="submit"
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Cadastrar Sala"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CadastroSala;

