
import { type FormEvent, useState } from "react";
import "./CadastroCurso.css";

interface CursoFormData {
  nomeCurso: string;
  modalidadeCurso: string;
  faixaEtariaPublico: string;
  statusCurso: string;
}

export default function CadastroCurso() {
  const [formData, setFormData] = useState<CursoFormData>({
    nomeCurso: "",
    modalidadeCurso: "",
    faixaEtariaPublico: "",
    statusCurso: "ATIVO",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!formData.nomeCurso.trim()) {
      setErro("O nome do curso é obrigatório.");
      return;
    }

    if (
      formData.statusCurso !== "ATIVO" &&
      formData.statusCurso !== "INATIVO"
    ) {
      setErro("O status do curso deve ser ATIVO ou INATIVO.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/cursos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomeCurso: formData.nomeCurso.trim(),
            modalidadeCurso:
              formData.modalidadeCurso.trim() || null,
            faixaEtariaPublico:
              formData.faixaEtariaPublico.trim() || null,
            statusCurso: formData.statusCurso,
          }),
        }
      );

      if (!response.ok) {
        const textoErro = await response.text();

        throw new Error(
          textoErro || "Erro ao cadastrar o curso."
        );
      }

      const cursoSalvo = await response.json();

      setMensagem(
        `Curso cadastrado com sucesso! ID: ${cursoSalvo.idCurso}`
      );

      setFormData({
        nomeCurso: "",
        modalidadeCurso: "",
        faixaEtariaPublico: "",
        statusCurso: "ATIVO",
      });

    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro inesperado ao cadastrar o curso.");
      }
    }
  }

  return (
    <main className="cadastro-curso">
      <h1>Cadastro de Curso</h1>

      <p className="descricao">
        Cadastre os cursos oferecidos pela instituição.
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
        <section>
          <h2>Informações do curso</h2>

          <div className="campo">
            <label htmlFor="nomeCurso">
              Nome do curso *
            </label>

            <input
              id="nomeCurso"
              name="nomeCurso"
              type="text"
              value={formData.nomeCurso}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="modalidadeCurso">
              Modalidade do curso
            </label>

            <input
              id="modalidadeCurso"
              name="modalidadeCurso"
              type="text"
              value={formData.modalidadeCurso}
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          <div className="campo">
            <label htmlFor="faixaEtariaPublico">
              Faixa etária do público
            </label>

            <input
              id="faixaEtariaPublico"
              name="faixaEtariaPublico"
              type="text"
              value={formData.faixaEtariaPublico}
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <div className="campo">
            <label htmlFor="statusCurso">
              Status do curso *
            </label>

            <select
              id="statusCurso"
              name="statusCurso"
              value={formData.statusCurso}
              onChange={handleChange}
              required
            >
              <option value="ATIVO">ATIVO</option>
              <option value="INATIVO">INATIVO</option>
            </select>
          </div>
        </section>

        <button type="submit">
          Cadastrar Curso
        </button>
      </form>
    </main>
  );
}

