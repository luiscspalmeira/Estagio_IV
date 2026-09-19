
import { type FormEvent, useEffect, useState } from "react";
import "./CadastroMatricula.css";

interface Estudante {
  idAluno: number;
  nomeCompleto: string;
}

interface Curso {
  idCurso: number;
  nomeCurso: string;
}

interface MatriculaFormData {
  idAluno: string;
  idCurso: string;
  statusAntecedentes: string;
  entregaTci: string;
  entregaTcle: string;
  anoSemestre: string;
  statusMatricula: string;
}

const estadoInicial: MatriculaFormData = {
  idAluno: "",
  idCurso: "",
  statusAntecedentes: "",
  entregaTci: "false",
  entregaTcle: "false",
  anoSemestre: "",
  statusMatricula: "ATIVA",
};

function CadastroMatricula() {
  const [formData, setFormData] =
    useState<MatriculaFormData>(estadoInicial);

  const [estudantes, setEstudantes] =
    useState<Estudante[]>([]);

  const [cursos, setCursos] =
    useState<Curso[]>([]);

  const [carregandoEstudantes, setCarregandoEstudantes] =
    useState(true);

  const [carregandoCursos, setCarregandoCursos] =
    useState(true);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarEstudantes();
    carregarCursos();
  }, []);

  async function carregarEstudantes() {
    try {
      setCarregandoEstudantes(true);

      const response = await fetch(
        "http://localhost:8080/estudantes"
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível carregar os estudantes."
        );
      }

      const dados = await response.json();

      setEstudantes(dados);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Erro ao carregar os estudantes."
        );
      }
    } finally {
      setCarregandoEstudantes(false);
    }
  }

  async function carregarCursos() {
    try {
      setCarregandoCursos(true);

      const response = await fetch(
        "http://localhost:8080/cursos"
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível carregar os cursos."
        );
      }

      const dados = await response.json();

      setCursos(dados);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao carregar os cursos.");
      }
    } finally {
      setCarregandoCursos(false);
    }
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value,
    }));

    setMensagem("");
    setErro("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!formData.idAluno) {
      setErro("Selecione um estudante.");
      return;
    }

    if (!formData.idCurso) {
      setErro("Selecione um curso.");
      return;
    }

    if (!formData.anoSemestre) {
      setErro("Informe o ano/semestre.");
      return;
    }

    const padraoPeriodo = /^[0-9]{4}\.[12]$/;

    if (!padraoPeriodo.test(formData.anoSemestre)) {
      setErro(
        "O ano/semestre deve estar no formato AAAA.1 ou AAAA.2."
      );
      return;
    }

    const statusValidos = [
      "ATIVA",
      "TRANCADA",
      "CONCLUIDA",
      "CANCELADA",
    ];

    if (
      !statusValidos.includes(
        formData.statusMatricula
      )
    ) {
      setErro(
        "Selecione um status válido para a matrícula."
      );
      return;
    }

    const dadosParaEnviar = {
      idAluno: Number(formData.idAluno),
      idCurso: Number(formData.idCurso),

      statusAntecedentes:
        formData.statusAntecedentes || null,

      entregaTci:
        formData.entregaTci === "true",

      entregaTcle:
        formData.entregaTcle === "true",

      anoSemestre:
        formData.anoSemestre,

      statusMatricula:
        formData.statusMatricula,
    };

    try {
      setSalvando(true);

      const response = await fetch(
        "http://localhost:8080/matriculas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnviar),
        }
      );

      if (!response.ok) {
        const mensagemErro =
          await response.text();

        throw new Error(
          mensagemErro ||
            "Não foi possível cadastrar a matrícula."
        );
      }

      const matriculaSalva =
        await response.json();

      setMensagem(
        `Matrícula cadastrada com sucesso! ID: ${matriculaSalva.idMatricula}`
      );

      setFormData(estadoInicial);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Erro inesperado ao cadastrar a matrícula."
        );
      }
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="cadastro-matricula-container">
      <div className="cadastro-matricula-card">

        <header className="cadastro-matricula-header">
          <h1>Cadastro de Matrícula</h1>

          <p>
            Registre a matrícula de um estudante em
            um curso para determinado ano/semestre.
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

          <section className="form-section">
            <h2>Estudante e curso</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="idAluno">
                  Estudante{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <select
                  id="idAluno"
                  name="idAluno"
                  value={formData.idAluno}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={carregandoEstudantes}
                >
                  <option value="">
                    {carregandoEstudantes
                      ? "Carregando estudantes..."
                      : "Selecione o estudante"}
                  </option>

                  {estudantes.map((estudante) => (
                    <option
                      key={estudante.idAluno}
                      value={estudante.idAluno}
                    >
                      {estudante.nomeCompleto}
                    </option>
                  ))}
                </select>

                {!carregandoEstudantes &&
                  estudantes.length === 0 && (
                    <small className="campo-ajuda">
                      Nenhum estudante cadastrado.
                    </small>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="idCurso">
                  Curso{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <select
                  id="idCurso"
                  name="idCurso"
                  value={formData.idCurso}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={carregandoCursos}
                >
                  <option value="">
                    {carregandoCursos
                      ? "Carregando cursos..."
                      : "Selecione o curso"}
                  </option>

                  {cursos.map((curso) => (
                    <option
                      key={curso.idCurso}
                      value={curso.idCurso}
                    >
                      {curso.nomeCurso}
                    </option>
                  ))}
                </select>

                {!carregandoCursos &&
                  cursos.length === 0 && (
                    <small className="campo-ajuda">
                      Nenhum curso cadastrado.
                    </small>
                  )}
              </div>

            </div>
          </section>

          <section className="form-section">
            <h2>Documentação e período</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="statusAntecedentes">
                  Status dos antecedentes
                </label>

                <input
                  id="statusAntecedentes"
                  name="statusAntecedentes"
                  type="text"
                  value={formData.statusAntecedentes}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="Informe o status"
                />
              </div>

              <div className="form-group">
                <label htmlFor="anoSemestre">
                  Ano/semestre{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="anoSemestre"
                  name="anoSemestre"
                  type="text"
                  value={formData.anoSemestre}
                  onChange={handleChange}
                  maxLength={7}
                  required
                  aria-required="true"
                  placeholder="Ex.: 2026.2"
                />

                <small className="campo-ajuda">
                  Formato: AAAA.1 ou AAAA.2
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="entregaTci">
                  Entrega do TCI
                </label>

                <select
                  id="entregaTci"
                  name="entregaTci"
                  value={formData.entregaTci}
                  onChange={handleChange}
                >
                  <option value="false">
                    Não
                  </option>

                  <option value="true">
                    Sim
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="entregaTcle">
                  Entrega do TCLE
                </label>

                <select
                  id="entregaTcle"
                  name="entregaTcle"
                  value={formData.entregaTcle}
                  onChange={handleChange}
                >
                  <option value="false">
                    Não
                  </option>

                  <option value="true">
                    Sim
                  </option>
                </select>
              </div>

            </div>
          </section>

          <section className="form-section">
            <h2>Status da matrícula</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="statusMatricula">
                  Status{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <select
                  id="statusMatricula"
                  name="statusMatricula"
                  value={formData.statusMatricula}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value="ATIVA">
                    Ativa
                  </option>

                  <option value="TRANCADA">
                    Trancada
                  </option>

                  <option value="CONCLUIDA">
                    Concluída
                  </option>

                  <option value="CANCELADA">
                    Cancelada
                  </option>
                </select>
              </div>

            </div>
          </section>

          <div className="form-actions">
            <button
              type="submit"
              disabled={
                salvando ||
                carregandoEstudantes ||
                carregandoCursos
              }
            >
              {salvando
                ? "Salvando..."
                : "Cadastrar Matrícula"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default CadastroMatricula;

