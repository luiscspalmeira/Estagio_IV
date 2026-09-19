
import { type FormEvent, useState } from "react";
import "./CadastroAvaliacaoMultidisciplinar.css";

interface AvaliacaoMultidisciplinar {
  idAluno: number;
  idColaborador: number | null;
  dataAvaliacao: string;
  especialidadeAtendimento: string;
  profissionalNome: string;
  profissionalFuncaoCargo: string;
  parecerTecnicoIndividualizado: string;
  encaminhamentosEacoes: string;
}

const formularioInicial: AvaliacaoMultidisciplinar = {
  idAluno: 0,
  idColaborador: null,
  dataAvaliacao: "",
  especialidadeAtendimento: "",
  profissionalNome: "",
  profissionalFuncaoCargo: "",
  parecerTecnicoIndividualizado: "",
  encaminhamentosEacoes: "",
};

function CadastroAvaliacaoMultidisciplinar() {
  const [formulario, setFormulario] =
    useState<AvaliacaoMultidisciplinar>(
      formularioInicial
    );

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function alterarCampo(
    campo: keyof AvaliacaoMultidisciplinar,
    valor: string | number | null
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function cadastrar(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!formulario.idAluno || formulario.idAluno <= 0) {
      setErro("Informe um ID de aluno válido.");
      return;
    }

    if (!formulario.dataAvaliacao) {
      setErro("Informe a data da avaliação.");
      return;
    }

    setSalvando(true);

    try {
      const dadosParaEnviar = {
        idAluno: formulario.idAluno,

        idColaborador:
          formulario.idColaborador === null ||
          formulario.idColaborador === 0
            ? null
            : formulario.idColaborador,

        dataAvaliacao: formulario.dataAvaliacao,

        especialidadeAtendimento:
          formulario.especialidadeAtendimento || null,

        profissionalNome:
          formulario.profissionalNome || null,

        profissionalFuncaoCargo:
          formulario.profissionalFuncaoCargo || null,

        parecerTecnicoIndividualizado:
          formulario.parecerTecnicoIndividualizado || null,

        encaminhamentosEacoes:
          formulario.encaminhamentosEacoes || null,
      };

      const response = await fetch(
        "http://localhost:8080/avaliacoes-multidisciplinares",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnviar),
        }
      );

      if (!response.ok) {
        const textoErro = await response.text();

        throw new Error(
          textoErro ||
            "Não foi possível cadastrar a avaliação multidisciplinar."
        );
      }

      const resultado = await response.json();

      console.log(
        "Avaliação multidisciplinar salva:",
        resultado
      );

      setMensagem(
        `Avaliação multidisciplinar cadastrada com sucesso! ID: ${resultado.idAvaliacao}`
      );

      setFormulario(formularioInicial);
    } catch (error) {
      console.error(
        "Erro ao cadastrar avaliação multidisciplinar:",
        error
      );

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Ocorreu um erro inesperado ao cadastrar a avaliação."
        );
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="cadastro-avaliacao-multidisciplinar">
      <div className="avaliacao-container">

        <h1>
          Cadastro de Avaliação Multidisciplinar
        </h1>

        <p className="descricao">
          Registre a avaliação multidisciplinar realizada
          para o estudante.
        </p>

        {mensagem && (
          <div
            className="mensagem-sucesso"
            role="status"
            aria-live="polite"
          >
            {mensagem}
          </div>
        )}

        {erro && (
          <div
            className="mensagem-erro"
            role="alert"
            aria-live="assertive"
          >
            {erro}
          </div>
        )}

        <form onSubmit={cadastrar}>

          <section>
            <h2>Identificação</h2>

            <div className="campo">
              <label htmlFor="idAluno">
                ID do aluno *
              </label>

              <input
                id="idAluno"
                type="number"
                min="1"
                value={formulario.idAluno || ""}
                onChange={(event) =>
                  alterarCampo(
                    "idAluno",
                    Number(event.target.value)
                  )
                }
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="idColaborador">
                ID do colaborador
              </label>

              <input
                id="idColaborador"
                type="number"
                min="1"
                value={
                  formulario.idColaborador ?? ""
                }
                onChange={(event) => {
                  const valor = event.target.value;

                  alterarCampo(
                    "idColaborador",
                    valor === ""
                      ? null
                      : Number(valor)
                  );
                }}
              />

              <small>
                Campo opcional.
              </small>
            </div>

            <div className="campo">
              <label htmlFor="dataAvaliacao">
                Data da avaliação *
              </label>

              <input
                id="dataAvaliacao"
                type="date"
                value={formulario.dataAvaliacao}
                onChange={(event) =>
                  alterarCampo(
                    "dataAvaliacao",
                    event.target.value
                  )
                }
                required
              />
            </div>
          </section>

          <section>
            <h2>Profissional e atendimento</h2>

            <div className="campo">
              <label htmlFor="especialidadeAtendimento">
                Especialidade do atendimento
              </label>

              <input
                id="especialidadeAtendimento"
                type="text"
                maxLength={100}
                value={
                  formulario.especialidadeAtendimento
                }
                onChange={(event) =>
                  alterarCampo(
                    "especialidadeAtendimento",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="profissionalNome">
                Nome do profissional
              </label>

              <input
                id="profissionalNome"
                type="text"
                maxLength={150}
                value={formulario.profissionalNome}
                onChange={(event) =>
                  alterarCampo(
                    "profissionalNome",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="profissionalFuncaoCargo">
                Função / cargo do profissional
              </label>

              <input
                id="profissionalFuncaoCargo"
                type="text"
                maxLength={150}
                value={
                  formulario.profissionalFuncaoCargo
                }
                onChange={(event) =>
                  alterarCampo(
                    "profissionalFuncaoCargo",
                    event.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Parecer técnico</h2>

            <div className="campo">
              <label htmlFor="parecerTecnicoIndividualizado">
                Parecer técnico individualizado
              </label>

              <textarea
                id="parecerTecnicoIndividualizado"
                rows={8}
                value={
                  formulario.parecerTecnicoIndividualizado
                }
                onChange={(event) =>
                  alterarCampo(
                    "parecerTecnicoIndividualizado",
                    event.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Encaminhamentos e ações</h2>

            <div className="campo">
              <label htmlFor="encaminhamentosEacoes">
                Encaminhamentos e ações
              </label>

              <textarea
                id="encaminhamentosEacoes"
                rows={8}
                value={
                  formulario.encaminhamentosEacoes
                }
                onChange={(event) =>
                  alterarCampo(
                    "encaminhamentosEacoes",
                    event.target.value
                  )
                }
              />
            </div>
          </section>

          <button
            type="submit"
            disabled={salvando}
          >
            {salvando
              ? "Salvando..."
              : "Cadastrar avaliação"}
          </button>

        </form>
      </div>
    </main>
  );
}

export default CadastroAvaliacaoMultidisciplinar;

