
import { type FormEvent, useState } from "react";

interface CursoDocenteForm {
  idCurso: string;
  idColaborador: string;
  funcaoNoCurso: string;
}

export default function CursoDocente() {
  const [form, setForm] = useState<CursoDocenteForm>({
    idCurso: "",
    idColaborador: "",
    funcaoNoCurso: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setForm((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!form.idCurso || !form.idColaborador) {
      setErro(
        "Informe o curso e o colaborador."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/curso-docente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: {
              idCurso: Number(form.idCurso),
              idColaborador: Number(form.idColaborador),
            },
            funcaoNoCurso:
              form.funcaoNoCurso.trim() === ""
                ? null
                : form.funcaoNoCurso,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : "Não foi possível realizar o cadastro."
        );
      }

      setMensagem(
        "Docente vinculado ao curso com sucesso."
      );

      setForm({
        idCurso: "",
        idColaborador: "",
        funcaoNoCurso: "",
      });

    } catch (error) {

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Erro ao conectar com o servidor."
        );
      }
    }
  }

  return (
    <main className="cadastro-container">

      <h1>Curso x Docente</h1>

      <p>
        Vincule um colaborador a um curso.
      </p>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="idCurso">
            ID do curso
          </label>

          <input
            id="idCurso"
            name="idCurso"
            type="number"
            min="1"
            value={form.idCurso}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="idColaborador">
            ID do colaborador
          </label>

          <input
            id="idColaborador"
            name="idColaborador"
            type="number"
            min="1"
            value={form.idColaborador}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="funcaoNoCurso">
            Função no curso
          </label>

          <input
            id="funcaoNoCurso"
            name="funcaoNoCurso"
            type="text"
            maxLength={100}
            value={form.funcaoNoCurso}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Vincular docente ao curso
        </button>

      </form>

      {mensagem && (
        <p role="status">
          {mensagem}
        </p>
      )}

      {erro && (
        <p role="alert">
          {erro}
        </p>
      )}

    </main>
  );
}

