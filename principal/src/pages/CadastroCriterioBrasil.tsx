
import { type FormEvent, useState } from "react";
import "./CadastroCriterioBrasil.css";

type CriterioBrasilForm = {
  idAluno: string;
  anoSemestreReferencia: string;
  quantidadeBanheiros: string;
  quantidadeEmpregadosDomesticos: string;
  quantidadeAutomoveis: string;
  quantidadeMicrocomputadores: string;
  quantidadeLavaLoucas: string;
  quantidadeGeladeiras: string;
  quantidadeFreezers: string;
  quantidadeLavaRoupas: string;
  secadoraRoupas: string;
  microondas: string;
  motocicletas: string;
  secadoraLavarConjunta: string;
  aguaEncanada: string;
  ruaAsfaltada: string;
  grauInstrucaoChefeFamilia: string;
  totalPontosAbep: string;
  classeEconomicaFinal: string;
};

const estadoInicial: CriterioBrasilForm = {
  idAluno: "",
  anoSemestreReferencia: "",
  quantidadeBanheiros: "",
  quantidadeEmpregadosDomesticos: "",
  quantidadeAutomoveis: "",
  quantidadeMicrocomputadores: "",
  quantidadeLavaLoucas: "",
  quantidadeGeladeiras: "",
  quantidadeFreezers: "",
  quantidadeLavaRoupas: "",
  secadoraRoupas: "",
  microondas: "",
  motocicletas: "",
  secadoraLavarConjunta: "",
  aguaEncanada: "",
  ruaAsfaltada: "",
  grauInstrucaoChefeFamilia: "",
  totalPontosAbep: "",
  classeEconomicaFinal: "",
};

function numeroOuNull(valor: string): number | null {
  return valor === "" ? null : Number(valor);
}

function booleanOuNull(valor: string): boolean | null {
  if (valor === "") {
    return null;
  }

  return valor === "true";
}

export default function CadastroCriterioBrasil() {
  const [formulario, setFormulario] =
    useState<CriterioBrasilForm>(estadoInicial);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarCampo(
    campo: keyof CriterioBrasilForm,
    valor: string
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!formulario.idAluno) {
      setErro("Informe o ID do aluno.");
      return;
    }

    if (!formulario.anoSemestreReferencia) {
      setErro("Informe o ano e semestre de referência.");
      return;
    }

    const periodoValido =
      /^[0-9]{4}\.[12]$/.test(
        formulario.anoSemestreReferencia
      );

    if (!periodoValido) {
      setErro(
        "O período deve estar no formato AAAA.1 ou AAAA.2."
      );
      return;
    }

    const dados = {
      idAluno: Number(formulario.idAluno),
      anoSemestreReferencia:
        formulario.anoSemestreReferencia,

      quantidadeBanheiros:
        numeroOuNull(formulario.quantidadeBanheiros),

      quantidadeEmpregadosDomesticos:
        numeroOuNull(
          formulario.quantidadeEmpregadosDomesticos
        ),

      quantidadeAutomoveis:
        numeroOuNull(formulario.quantidadeAutomoveis),

      quantidadeMicrocomputadores:
        numeroOuNull(
          formulario.quantidadeMicrocomputadores
        ),

      quantidadeLavaLoucas:
        numeroOuNull(formulario.quantidadeLavaLoucas),

      quantidadeGeladeiras:
        numeroOuNull(formulario.quantidadeGeladeiras),

      quantidadeFreezers:
        numeroOuNull(formulario.quantidadeFreezers),

      quantidadeLavaRoupas:
        numeroOuNull(formulario.quantidadeLavaRoupas),

      secadoraRoupas:
        booleanOuNull(formulario.secadoraRoupas),

      microondas:
        booleanOuNull(formulario.microondas),

      motocicletas:
        numeroOuNull(formulario.motocicletas),

      secadoraLavarConjunta:
        booleanOuNull(
          formulario.secadoraLavarConjunta
        ),

      aguaEncanada:
        booleanOuNull(formulario.aguaEncanada),

      ruaAsfaltada:
        booleanOuNull(formulario.ruaAsfaltada),

      grauInstrucaoChefeFamilia:
        formulario.grauInstrucaoChefeFamilia || null,

      totalPontosAbep:
        numeroOuNull(formulario.totalPontosAbep),

      classeEconomicaFinal:
        formulario.classeEconomicaFinal || null,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/criterio-brasil",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      if (!resposta.ok) {
        const texto = await resposta.text();

        throw new Error(
          texto || "Erro ao cadastrar o Critério Brasil."
        );
      }

      const resultado = await resposta.json();

      setMensagem(
        `Critério Brasil cadastrado com sucesso! ID: ${resultado.idSocioeconomico}`
      );

      setFormulario(estadoInicial);
    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível cadastrar o Critério Brasil. Verifique os dados e tente novamente."
      );
    }
  }

  function campoNumero(
    campo: keyof CriterioBrasilForm,
    label: string
  ) {
    return (
      <div className="campo">
        <label htmlFor={campo}>{label}</label>

        <input
          id={campo}
          type="number"
          min="0"
          value={formulario[campo]}
          onChange={(event) =>
            atualizarCampo(campo, event.target.value)
          }
        />
      </div>
    );
  }

  function campoBooleano(
    campo: keyof CriterioBrasilForm,
    label: string
  ) {
    return (
      <div className="campo">
        <label htmlFor={campo}>{label}</label>

        <select
          id={campo}
          value={formulario[campo]}
          onChange={(event) =>
            atualizarCampo(campo, event.target.value)
          }
        >
          <option value="">Não informado</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
    );
  }

  return (
    <main className="criterio-container">
      <h1>Cadastro — Critério Brasil</h1>

      <p className="descricao">
        Cadastro das informações socioeconômicas do estudante.
      </p>

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

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Identificação</legend>

          <div className="campo">
            <label htmlFor="idAluno">
              ID do aluno *
            </label>

            <input
              id="idAluno"
              type="number"
              min="1"
              required
              value={formulario.idAluno}
              onChange={(event) =>
                atualizarCampo(
                  "idAluno",
                  event.target.value
                )
              }
            />
          </div>

          <div className="campo">
            <label htmlFor="anoSemestreReferencia">
              Ano e semestre de referência *
            </label>

            <input
              id="anoSemestreReferencia"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Ex.: 2026.1"
              required
              value={formulario.anoSemestreReferencia}
              onChange={(event) =>
                atualizarCampo(
                  "anoSemestreReferencia",
                  event.target.value
                )
              }
            />

            <small>
              Formato obrigatório: AAAA.1 ou AAAA.2
            </small>
          </div>
        </fieldset>

        <fieldset>
          <legend>Bens e estrutura domiciliar</legend>

          <div className="grade">
            {campoNumero(
              "quantidadeBanheiros",
              "Quantidade de banheiros"
            )}

            {campoNumero(
              "quantidadeEmpregadosDomesticos",
              "Quantidade de empregados domésticos"
            )}

            {campoNumero(
              "quantidadeAutomoveis",
              "Quantidade de automóveis"
            )}

            {campoNumero(
              "quantidadeMicrocomputadores",
              "Quantidade de microcomputadores"
            )}

            {campoNumero(
              "quantidadeLavaLoucas",
              "Quantidade de lava-louças"
            )}

            {campoNumero(
              "quantidadeGeladeiras",
              "Quantidade de geladeiras"
            )}

            {campoNumero(
              "quantidadeFreezers",
              "Quantidade de freezers"
            )}

            {campoNumero(
              "quantidadeLavaRoupas",
              "Quantidade de máquinas de lavar roupas"
            )}

            {campoNumero(
              "motocicletas",
              "Quantidade de motocicletas"
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Eletrodomésticos e infraestrutura</legend>

          <div className="grade">
            {campoBooleano(
              "secadoraRoupas",
              "Possui secadora de roupas?"
            )}

            {campoBooleano(
              "microondas",
              "Possui micro-ondas?"
            )}

            {campoBooleano(
              "secadoraLavarConjunta",
              "Possui secadora/lavadora conjunta?"
            )}

            {campoBooleano(
              "aguaEncanada",
              "Possui água encanada?"
            )}

            {campoBooleano(
              "ruaAsfaltada",
              "A rua é asfaltada?"
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Informações socioeconômicas</legend>

          <div className="campo">
            <label htmlFor="grauInstrucaoChefeFamilia">
              Grau de instrução do chefe da família
            </label>

            <input
              id="grauInstrucaoChefeFamilia"
              type="text"
              maxLength={100}
              value={
                formulario.grauInstrucaoChefeFamilia
              }
              onChange={(event) =>
                atualizarCampo(
                  "grauInstrucaoChefeFamilia",
                  event.target.value
                )
              }
            />
          </div>

          <div className="grade">
            {campoNumero(
              "totalPontosAbep",
              "Total de pontos ABEP"
            )}

            <div className="campo">
              <label htmlFor="classeEconomicaFinal">
                Classe econômica final
              </label>

              <input
                id="classeEconomicaFinal"
                type="text"
                maxLength={20}
                value={formulario.classeEconomicaFinal}
                onChange={(event) =>
                  atualizarCampo(
                    "classeEconomicaFinal",
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        </fieldset>

        <button type="submit">
          Cadastrar Critério Brasil
        </button>
      </form>
    </main>
  );
}

