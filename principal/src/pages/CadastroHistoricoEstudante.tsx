
import { type FormEvent, useState } from "react";
import "./CadastroHistoricoEstudante.css";

interface HistoricoEstudante {
  idAluno: number;
  anoIngresso: string;
  anoConclusaoDesligamento: string;
  modalidadeFormacao: string;
  historicoEvolucaoPremios: string;
  destinoProfissionalAtual: string;
  linkPastaArquivoHistorico: string;
}

interface HistoricoEstudanteResponse {
  idHistorico: number;
  idAluno: number;
  anoIngresso: number | null;
  anoConclusaoDesligamento: number | null;
  modalidadeFormacao: string | null;
  historicoEvolucaoPremios: string | null;
  destinoProfissionalAtual: string | null;
  linkPastaArquivoHistorico: string | null;
}

function CadastroHistoricoEstudante() {

  const [formulario, setFormulario] =
    useState<HistoricoEstudante>({
      idAluno: 0,
      anoIngresso: "",
      anoConclusaoDesligamento: "",
      modalidadeFormacao: "",
      historicoEvolucaoPremios: "",
      destinoProfissionalAtual: "",
      linkPastaArquivoHistorico: ""
    });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function alterarCampo(
    campo: keyof HistoricoEstudante,
    valor: string | number
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!formulario.idAluno || formulario.idAluno <= 0) {
      setErro("Informe um ID de aluno válido.");
      return;
    }

    const anoIngresso =
      formulario.anoIngresso.trim() === ""
        ? null
        : Number(formulario.anoIngresso);

    const anoConclusao =
      formulario.anoConclusaoDesligamento.trim() === ""
        ? null
        : Number(formulario.anoConclusaoDesligamento);

    if (
      anoIngresso !== null &&
      (!Number.isInteger(anoIngresso) ||
        anoIngresso < 0)
    ) {
      setErro("Informe um ano de ingresso válido.");
      return;
    }

    if (
      anoConclusao !== null &&
      (!Number.isInteger(anoConclusao) ||
        anoConclusao < 0)
    ) {
      setErro(
        "Informe um ano de conclusão/desligamento válido."
      );
      return;
    }

    if (
      anoIngresso !== null &&
      anoConclusao !== null &&
      anoConclusao < anoIngresso
    ) {
      setErro(
        "O ano de conclusão/desligamento não pode ser anterior ao ano de ingresso."
      );
      return;
    }

    const dados = {
      idAluno: formulario.idAluno,
      anoIngresso,
      anoConclusaoDesligamento: anoConclusao,
      modalidadeFormacao:
        formulario.modalidadeFormacao.trim() || null,
      historicoEvolucaoPremios:
        formulario.historicoEvolucaoPremios.trim() || null,
      destinoProfissionalAtual:
        formulario.destinoProfissionalAtual.trim() || null,
      linkPastaArquivoHistorico:
        formulario.linkPastaArquivoHistorico.trim() || null
    };

    try {

      const resposta = await fetch(
        "http://localhost:8080/historico-estudante",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }
      );

      if (!resposta.ok) {
        const textoErro = await resposta.text();

        throw new Error(
          textoErro ||
          `Erro HTTP ${resposta.status}`
        );
      }

      const resultado: HistoricoEstudanteResponse =
        await resposta.json();

      setMensagem(
        `Histórico cadastrado com sucesso! ID: ${resultado.idHistorico}`
      );

      setFormulario({
        idAluno: 0,
        anoIngresso: "",
        anoConclusaoDesligamento: "",
        modalidadeFormacao: "",
        historicoEvolucaoPremios: "",
        destinoProfissionalAtual: "",
        linkPastaArquivoHistorico: ""
      });

    } catch (error) {

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Não foi possível cadastrar o histórico."
        );
      }
    }
  }

  return (
    <main
      className="historico-container"
      aria-labelledby="titulo-historico"
    >

      <h1 id="titulo-historico">
        Cadastro do Histórico do Estudante
      </h1>

      <p className="descricao">
        Registre as informações de histórico, evolução,
        formação e destino profissional do estudante.
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

          <legend>
            Identificação do estudante
          </legend>

          <div className="campo">

            <label htmlFor="idAluno">
              ID do aluno *
            </label>

            <input
              id="idAluno"
              type="number"
              min="1"
              value={
                formulario.idAluno === 0
                  ? ""
                  : formulario.idAluno
              }
              onChange={(e) =>
                alterarCampo(
                  "idAluno",
                  Number(e.target.value)
                )
              }
              required
            />

            <small>
              Informe o ID do estudante cadastrado.
            </small>

          </div>

        </fieldset>

        <fieldset>

          <legend>
            Período e formação
          </legend>

          <div className="grade">

            <div className="campo">

              <label htmlFor="anoIngresso">
                Ano de ingresso
              </label>

              <input
                id="anoIngresso"
                type="number"
                min="0"
                step="1"
                value={formulario.anoIngresso}
                onChange={(e) =>
                  alterarCampo(
                    "anoIngresso",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="campo">

              <label htmlFor="anoConclusaoDesligamento">
                Ano de conclusão/desligamento
              </label>

              <input
                id="anoConclusaoDesligamento"
                type="number"
                min="0"
                step="1"
                value={
                  formulario.anoConclusaoDesligamento
                }
                onChange={(e) =>
                  alterarCampo(
                    "anoConclusaoDesligamento",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="campo">

              <label htmlFor="modalidadeFormacao">
                Modalidade de formação
              </label>

              <input
                id="modalidadeFormacao"
                type="text"
                maxLength={100}
                value={
                  formulario.modalidadeFormacao
                }
                onChange={(e) =>
                  alterarCampo(
                    "modalidadeFormacao",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </fieldset>

        <fieldset>

          <legend>
            Histórico e evolução
          </legend>

          <div className="campo">

            <label htmlFor="historicoEvolucaoPremios">
              Histórico, evolução e prêmios
            </label>

            <textarea
              id="historicoEvolucaoPremios"
              rows={6}
              value={
                formulario.historicoEvolucaoPremios
              }
              onChange={(e) =>
                alterarCampo(
                  "historicoEvolucaoPremios",
                  e.target.value
                )
              }
            />

          </div>

          <div className="campo">

            <label htmlFor="destinoProfissionalAtual">
              Destino profissional atual
            </label>

            <textarea
              id="destinoProfissionalAtual"
              rows={5}
              value={
                formulario.destinoProfissionalAtual
              }
              onChange={(e) =>
                alterarCampo(
                  "destinoProfissionalAtual",
                  e.target.value
                )
              }
            />

          </div>

        </fieldset>

        <fieldset>

          <legend>
            Arquivo do histórico
          </legend>

          <div className="campo">

            <label htmlFor="linkPastaArquivoHistorico">
              Link da pasta/arquivo do histórico
            </label>

            <input
              id="linkPastaArquivoHistorico"
              type="url"
              value={
                formulario.linkPastaArquivoHistorico
              }
              onChange={(e) =>
                alterarCampo(
                  "linkPastaArquivoHistorico",
                  e.target.value
                )
              }
              placeholder="https://..."
            />

          </div>

        </fieldset>

        <button type="submit">
          Cadastrar Histórico
        </button>

      </form>

    </main>
  );
}

export default CadastroHistoricoEstudante;

