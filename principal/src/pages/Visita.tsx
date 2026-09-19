
import { type FormEvent, useState } from "react";

function Visita() {
  const [nomeCompletoVisitante, setNomeCompletoVisitante] =
    useState("");

  const [rgCpfVisitante, setRgCpfVisitante] =
    useState("");

  const [telefoneContato, setTelefoneContato] =
    useState("");

  const [tipoVisitante, setTipoVisitante] =
    useState("");

  const [idSala, setIdSala] = useState("");

  const [
    idColaboradorResponsavelRecepcao,
    setIdColaboradorResponsavelRecepcao,
  ] = useState("");

  const [dataVisita, setDataVisita] =
    useState("");

  const [horarioEntrada, setHorarioEntrada] =
    useState("");

  const [horarioSaida, setHorarioSaida] =
    useState("");

  const [
    assinouTermoSegurancaLgpd,
    setAssinouTermoSegurancaLgpd,
  ] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!nomeCompletoVisitante.trim()) {
      setErro(
        "O nome completo do visitante é obrigatório."
      );
      return;
    }

    if (!dataVisita) {
      setErro("A data da visita é obrigatória.");
      return;
    }

    if (!horarioEntrada) {
      setErro(
        "O horário de entrada é obrigatório."
      );
      return;
    }

    if (
      horarioSaida &&
      horarioSaida < horarioEntrada
    ) {
      setErro(
        "O horário de saída não pode ser anterior "
        + "ao horário de entrada."
      );
      return;
    }

    const dados = {
      nomeCompletoVisitante:
        nomeCompletoVisitante.trim(),

      rgCpfVisitante:
        rgCpfVisitante.trim() || null,

      telefoneContato:
        telefoneContato.trim() || null,

      tipoVisitante:
        tipoVisitante.trim() || null,

      idSala:
        idSala ? Number(idSala) : null,

      idColaboradorResponsavelRecepcao:
        idColaboradorResponsavelRecepcao
          ? Number(idColaboradorResponsavelRecepcao)
          : null,

      dataVisita,

      horarioEntrada,

      horarioSaida:
        horarioSaida || null,

      assinouTermoSegurancaLgpd,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/visitas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resultado = await resposta
        .json()
        .catch(() => null);

      if (!resposta.ok) {
        setErro(
          typeof resultado === "string"
            ? resultado
            : "Não foi possível cadastrar a visita."
        );
        return;
      }

      setMensagem(
        "Visita cadastrada com sucesso!"
      );

      setNomeCompletoVisitante("");
      setRgCpfVisitante("");
      setTelefoneContato("");
      setTipoVisitante("");
      setIdSala("");
      setIdColaboradorResponsavelRecepcao("");
      setDataVisita("");
      setHorarioEntrada("");
      setHorarioSaida("");
      setAssinouTermoSegurancaLgpd(false);

    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível conectar ao servidor "
        + "Spring Boot."
      );
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Cadastro de Visita</h1>

      <p>
        Cadastre visitantes e guias.
      </p>

      {mensagem && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #198754",
          }}
        >
          {mensagem}
        </div>
      )}

      {erro && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #dc3545",
          }}
        >
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="nomeCompletoVisitante">
            Nome completo do visitante
          </label>

          <input
            id="nomeCompletoVisitante"
            type="text"
            maxLength={150}
            value={nomeCompletoVisitante}
            onChange={(event) =>
              setNomeCompletoVisitante(
                event.target.value
              )
            }
            required
          />
        </div>

        <div>
          <label htmlFor="rgCpfVisitante">
            RG / CPF do visitante
          </label>

          <input
            id="rgCpfVisitante"
            type="text"
            maxLength={30}
            value={rgCpfVisitante}
            onChange={(event) =>
              setRgCpfVisitante(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="telefoneContato">
            Telefone de contato
          </label>

          <input
            id="telefoneContato"
            type="text"
            maxLength={20}
            value={telefoneContato}
            onChange={(event) =>
              setTelefoneContato(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="tipoVisitante">
            Tipo de visitante
          </label>

          <input
            id="tipoVisitante"
            type="text"
            maxLength={50}
            value={tipoVisitante}
            onChange={(event) =>
              setTipoVisitante(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="idSala">
            ID da sala
          </label>

          <input
            id="idSala"
            type="number"
            min="1"
            value={idSala}
            onChange={(event) =>
              setIdSala(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="idColaboradorResponsavelRecepcao">
            ID do colaborador responsável pela recepção
          </label>

          <input
            id="idColaboradorResponsavelRecepcao"
            type="number"
            min="1"
            value={
              idColaboradorResponsavelRecepcao
            }
            onChange={(event) =>
              setIdColaboradorResponsavelRecepcao(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="dataVisita">
            Data da visita
          </label>

          <input
            id="dataVisita"
            type="date"
            value={dataVisita}
            onChange={(event) =>
              setDataVisita(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="horarioEntrada">
            Horário de entrada
          </label>

          <input
            id="horarioEntrada"
            type="time"
            value={horarioEntrada}
            onChange={(event) =>
              setHorarioEntrada(
                event.target.value
              )
            }
            required
          />
        </div>

        <div>
          <label htmlFor="horarioSaida">
            Horário de saída
          </label>

          <input
            id="horarioSaida"
            type="time"
            value={horarioSaida}
            onChange={(event) =>
              setHorarioSaida(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="assinouTermoSegurancaLgpd">
            <input
              id="assinouTermoSegurancaLgpd"
              type="checkbox"
              checked={
                assinouTermoSegurancaLgpd
              }
              onChange={(event) =>
                setAssinouTermoSegurancaLgpd(
                  event.target.checked
                )
              }
            />

            Assinou termo de segurança/LGPD
          </label>
        </div>

        <button type="submit">
          Cadastrar visita
        </button>

      </form>
    </div>
  );
}

export default Visita;

