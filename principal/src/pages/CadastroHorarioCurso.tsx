
import { type FormEvent, useEffect, useState } from "react";
import "./CadastroHorarioCurso.css";

interface Curso {
  idCurso: number;
  nomeCurso: string;
}

interface Sala {
  idSala: number;
  nomeDaOficinaEstilo: string;
}

interface HorarioFormData {
  idCurso: string;
  idSala: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
}

const estadoInicial: HorarioFormData = {
  idCurso: "",
  idSala: "",
  diaSemana: "",
  horaInicio: "",
  horaFim: "",
};

function CadastroHorarioCurso() {
  const [formData, setFormData] =
    useState<HorarioFormData>(estadoInicial);

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  const [carregandoCursos, setCarregandoCursos] =
    useState(true);

  const [carregandoSalas, setCarregandoSalas] =
    useState(true);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarCursos();
    carregarSalas();
  }, []);

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

  async function carregarSalas() {
    try {
      setCarregandoSalas(true);

      const response = await fetch(
        "http://localhost:8080/salas"
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível carregar as salas."
        );
      }

      const dados = await response.json();

      setSalas(dados);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro ao carregar as salas.");
      }
    } finally {
      setCarregandoSalas(false);
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

    if (!formData.idCurso) {
      setErro("Selecione um curso.");
      return;
    }

    if (!formData.idSala) {
      setErro("Selecione uma sala.");
      return;
    }

    if (!formData.diaSemana) {
      setErro("Selecione o dia da semana.");
      return;
    }

    if (!formData.horaInicio) {
      setErro("Informe a hora de início.");
      return;
    }

    if (!formData.horaFim) {
      setErro("Informe a hora de término.");
      return;
    }

    if (formData.horaFim <= formData.horaInicio) {
      setErro(
        "A hora de término deve ser posterior à hora de início."
      );
      return;
    }

    const dadosParaEnviar = {
      idCurso: Number(formData.idCurso),
      idSala: Number(formData.idSala),
      diaSemana: Number(formData.diaSemana),
      horaInicio: formData.horaInicio,
      horaFim: formData.horaFim,
    };

    try {
      setSalvando(true);

      const response = await fetch(
        "http://localhost:8080/horarios-cursos",
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
          mensagemErro ||
            "Não foi possível cadastrar o horário."
        );
      }

      const horarioSalvo = await response.json();

      setMensagem(
        `Horário cadastrado com sucesso! ID: ${horarioSalvo.idHorario}`
      );

      setFormData(estadoInicial);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Erro inesperado ao cadastrar o horário."
        );
      }
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="cadastro-horario-container">
      <div className="cadastro-horario-card">

        <header className="cadastro-horario-header">
          <h1>Cadastro de Horário do Curso</h1>

          <p>
            Selecione o curso, a sala, o dia e o período
            correspondente ao horário da atividade.
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
            <h2>Curso e sala</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="idCurso">
                  Curso <span aria-hidden="true">*</span>
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

              <div className="form-group">
                <label htmlFor="idSala">
                  Sala <span aria-hidden="true">*</span>
                </label>

                <select
                  id="idSala"
                  name="idSala"
                  value={formData.idSala}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={carregandoSalas}
                >
                  <option value="">
                    {carregandoSalas
                      ? "Carregando salas..."
                      : "Selecione a sala"}
                  </option>

                  {salas.map((sala) => (
                    <option
                      key={sala.idSala}
                      value={sala.idSala}
                    >
                      {sala.nomeDaOficinaEstilo}
                    </option>
                  ))}
                </select>

                {!carregandoSalas &&
                  salas.length === 0 && (
                    <small className="campo-ajuda">
                      Nenhuma sala cadastrada.
                    </small>
                  )}
              </div>

            </div>
          </section>

          <section className="form-section">
            <h2>Dia e horário</h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="diaSemana">
                  Dia da semana{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <select
                  id="diaSemana"
                  name="diaSemana"
                  value={formData.diaSemana}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value="">
                    Selecione o dia
                  </option>

                  <option value="1">
                    Segunda-feira
                  </option>

                  <option value="2">
                    Terça-feira
                  </option>

                  <option value="3">
                    Quarta-feira
                  </option>

                  <option value="4">
                    Quinta-feira
                  </option>

                  <option value="5">
                    Sexta-feira
                  </option>

                  <option value="6">
                    Sábado
                  </option>

                  <option value="7">
                    Domingo
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="horaInicio">
                  Hora de início{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="horaInicio"
                  name="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="horaFim">
                  Hora de término{" "}
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="horaFim"
                  name="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

            </div>
          </section>

          <div className="form-actions">
            <button
              type="submit"
              disabled={
                salvando ||
                carregandoCursos ||
                carregandoSalas
              }
            >
              {salvando
                ? "Salvando..."
                : "Cadastrar Horário"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default CadastroHorarioCurso;

