
import { type FormEvent, useEffect, useState } from "react";

interface ContatoEmergenciaEquipeData {
  idColaborador: number;
  nome: string;
  telefone: string;
  grauParentesco: string;
  ordemContato: number;
}

interface Colaborador {
  idColaborador: number;
  nomeCompleto: string;
}

const API_CONTATOS =
  "http://localhost:8080/contato-emergencia-equipe";

const API_EQUIPE =
  "http://localhost:8080/equipe";

function ContatoEmergenciaEquipe() {

  const [form, setForm] =
    useState<ContatoEmergenciaEquipeData>({
      idColaborador: 0,
      nome: "",
      telefone: "",
      grauParentesco: "",
      ordemContato: 1,
    });

  const [colaboradores, setColaboradores] =
    useState<Colaborador[]>([]);

  const [mensagem, setMensagem] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);

  useEffect(() => {
    carregarColaboradores();
  }, []);

  async function carregarColaboradores() {

    try {

      const response = await fetch(API_EQUIPE);

      if (!response.ok) {
        throw new Error(
          "Não foi possível carregar os colaboradores."
        );
      }

      const data = await response.json();

      setColaboradores(data);

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar colaboradores."
      );
    }
  }

  function alterarCampo(
    campo: keyof ContatoEmergenciaEquipeData,
    valor: string
  ) {

    setForm((estadoAnterior) => ({
      ...estadoAnterior,
      [campo]:
        campo === "idColaborador" ||
        campo === "ordemContato"
          ? Number(valor)
          : valor,
    }));
  }

  async function salvar(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!form.idColaborador) {
      setErro("Selecione um colaborador.");
      return;
    }

    if (!form.nome.trim()) {
      setErro("Informe o nome do contato.");
      return;
    }

    if (!form.telefone.trim()) {
      setErro("Informe o telefone do contato.");
      return;
    }

    if (!form.ordemContato || form.ordemContato <= 0) {
      setErro(
        "A ordem do contato deve ser maior que zero."
      );
      return;
    }

    setCarregando(true);

    try {

      const response = await fetch(
        API_CONTATOS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const texto = await response.text();

      if (!response.ok) {
        throw new Error(
          texto || "Não foi possível cadastrar o contato."
        );
      }

      setMensagem(
        "Contato de emergência cadastrado com sucesso."
      );

      setForm({
        idColaborador: form.idColaborador,
        nome: "",
        telefone: "",
        grauParentesco: "",
        ordemContato: form.ordemContato + 1,
      });

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar o contato."
      );

    } finally {

      setCarregando(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
      }}
    >

      <h1>
        Contato de Emergência da Equipe
      </h1>

      <p>
        Cadastre os contatos de emergência vinculados
        a um colaborador.
      </p>

      {mensagem && (
        <div
          role="status"
          style={{
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #198754",
          }}
        >
          {mensagem}
        </div>
      )}

      {erro && (
        <div
          role="alert"
          style={{
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #dc3545",
          }}
        >
          {erro}
        </div>
      )}

      <form onSubmit={salvar}>

        <div style={{ marginBottom: "20px" }}>

          <label htmlFor="idColaborador">
            Colaborador
          </label>

          <br />

          <select
            id="idColaborador"
            value={
              form.idColaborador || ""
            }
            onChange={(event) =>
              alterarCampo(
                "idColaborador",
                event.target.value
              )
            }
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          >

            <option value="">
              Selecione um colaborador
            </option>

            {colaboradores.map((colaborador) => (
              <option
                key={colaborador.idColaborador}
                value={colaborador.idColaborador}
              >
                {colaborador.idColaborador}
                {" - "}
                {colaborador.nomeCompleto}
              </option>
            ))}

          </select>

        </div>

        <div style={{ marginBottom: "20px" }}>

          <label htmlFor="nome">
            Nome do contato
          </label>

          <br />

          <input
            id="nome"
            type="text"
            value={form.nome}
            onChange={(event) =>
              alterarCampo(
                "nome",
                event.target.value
              )
            }
            maxLength={150}
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <div style={{ marginBottom: "20px" }}>

          <label htmlFor="telefone">
            Telefone
          </label>

          <br />

          <input
            id="telefone"
            type="tel"
            value={form.telefone}
            onChange={(event) =>
              alterarCampo(
                "telefone",
                event.target.value
              )
            }
            maxLength={20}
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <div style={{ marginBottom: "20px" }}>

          <label htmlFor="grauParentesco">
            Grau de parentesco
          </label>

          <br />

          <input
            id="grauParentesco"
            type="text"
            value={form.grauParentesco}
            onChange={(event) =>
              alterarCampo(
                "grauParentesco",
                event.target.value
              )
            }
            maxLength={50}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <div style={{ marginBottom: "20px" }}>

          <label htmlFor="ordemContato">
            Ordem do contato
          </label>

          <br />

          <input
            id="ordemContato"
            type="number"
            min="1"
            value={form.ordemContato}
            onChange={(event) =>
              alterarCampo(
                "ordemContato",
                event.target.value
              )
            }
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <button
          type="submit"
          disabled={carregando}
        >
          {carregando
            ? "Salvando..."
            : "Cadastrar contato"}
        </button>

      </form>

    </main>
  );
}

export default ContatoEmergenciaEquipe;

