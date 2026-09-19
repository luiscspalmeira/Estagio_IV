
import { type FormEvent, useState } from "react";

export default function Espetaculo() {
  const [nomeDaProducao, setNomeDaProducao] = useState("");
  const [anoRealizacao, setAnoRealizacao] = useState("");
  const [direcaoCoreografica, setDirecaoCoreografica] =
    useState("");
  const [estiloDancaPredominante, setEstiloDancaPredominante] =
    useState("");
  const [localEstreiaTeatro, setLocalEstreiaTeatro] =
    useState("");
  const [orcamentoFomentoOrigem, setOrcamentoFomentoOrigem] =
    useState("");
  const [quantidadeBailarinosElenco,
    setQuantidadeBailarinosElenco] = useState("");
  const [sinopseFichaTecnicaTexto,
    setSinopseFichaTecnicaTexto] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("");

    const dados = {
      nomeDaProducao,

      anoRealizacao:
        anoRealizacao === ""
          ? null
          : Number(anoRealizacao),

      direcaoCoreografica:
        direcaoCoreografica === ""
          ? null
          : direcaoCoreografica,

      estiloDancaPredominante:
        estiloDancaPredominante === ""
          ? null
          : estiloDancaPredominante,

      localEstreiaTeatro:
        localEstreiaTeatro === ""
          ? null
          : localEstreiaTeatro,

      orcamentoFomentoOrigem:
        orcamentoFomentoOrigem === ""
          ? null
          : Number(orcamentoFomentoOrigem),

      quantidadeBailarinosElenco:
        quantidadeBailarinosElenco === ""
          ? null
          : Number(quantidadeBailarinosElenco),

      sinopseFichaTecnicaTexto:
        sinopseFichaTecnicaTexto === ""
          ? null
          : sinopseFichaTecnicaTexto,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/espetaculos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resultado = await resposta.text();

      if (!resposta.ok) {
        throw new Error(resultado);
      }

      const espetaculo = JSON.parse(resultado);

      setMensagem(
        `Espetáculo cadastrado com sucesso! ID: ${espetaculo.idEspetaculo}`
      );

      setNomeDaProducao("");
      setAnoRealizacao("");
      setDirecaoCoreografica("");
      setEstiloDancaPredominante("");
      setLocalEstreiaTeatro("");
      setOrcamentoFomentoOrigem("");
      setQuantidadeBailarinosElenco("");
      setSinopseFichaTecnicaTexto("");

    } catch (error) {

      if (error instanceof Error) {
        setMensagem(`Erro: ${error.message}`);
      } else {
        setMensagem(
          "Erro ao cadastrar o espetáculo."
        );
      }
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Cadastro de Espetáculo</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="nomeDaProducao">
            Nome da Produção
          </label>

          <input
            id="nomeDaProducao"
            type="text"
            maxLength={200}
            value={nomeDaProducao}
            onChange={(e) =>
              setNomeDaProducao(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="anoRealizacao">
            Ano de Realização
          </label>

          <input
            id="anoRealizacao"
            type="number"
            min="1900"
            max="2200"
            value={anoRealizacao}
            onChange={(e) =>
              setAnoRealizacao(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="direcaoCoreografica">
            Direção Coreográfica
          </label>

          <input
            id="direcaoCoreografica"
            type="text"
            maxLength={200}
            value={direcaoCoreografica}
            onChange={(e) =>
              setDirecaoCoreografica(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="estiloDancaPredominante">
            Estilo de Dança Predominante
          </label>

          <input
            id="estiloDancaPredominante"
            type="text"
            maxLength={100}
            value={estiloDancaPredominante}
            onChange={(e) =>
              setEstiloDancaPredominante(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="localEstreiaTeatro">
            Local de Estreia / Teatro
          </label>

          <input
            id="localEstreiaTeatro"
            type="text"
            maxLength={200}
            value={localEstreiaTeatro}
            onChange={(e) =>
              setLocalEstreiaTeatro(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="orcamentoFomentoOrigem">
            Orçamento / Fomento / Origem
          </label>

          <input
            id="orcamentoFomentoOrigem"
            type="number"
            min="0"
            step="0.01"
            value={orcamentoFomentoOrigem}
            onChange={(e) =>
              setOrcamentoFomentoOrigem(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="quantidadeBailarinosElenco">
            Quantidade de Bailarinos no Elenco
          </label>

          <input
            id="quantidadeBailarinosElenco"
            type="number"
            min="0"
            value={quantidadeBailarinosElenco}
            onChange={(e) =>
              setQuantidadeBailarinosElenco(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="sinopseFichaTecnicaTexto">
            Sinopse / Ficha Técnica / Texto
          </label>

          <textarea
            id="sinopseFichaTecnicaTexto"
            value={sinopseFichaTecnicaTexto}
            onChange={(e) =>
              setSinopseFichaTecnicaTexto(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Cadastrar Espetáculo
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}

    </div>
  );
}

