
import { type FormEvent, useState } from "react";
import "./CadastroEquipe.css";

interface CadastroEquipe {
  idColaborador?: number;
  nomeCompleto: string;
  nomeSocial: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  eMail: string;
  cep: string;
  endereco: string;
  corRaca: string;
  vinculoInstitucional: string;
  funcaoEspecifica: string;
  numeroEditalSelecao: string;
  numeroTermoCompromisso: string;
  instituicaoEnsinoOrigem: string;
  supervisorResponsavelNome: string;
  dataInicioVinculo: string;
  dataFimPrevista: string;
  statusContract: string;
}

const estadoInicial: CadastroEquipe = {
  nomeCompleto: "",
  nomeSocial: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  eMail: "",
  cep: "",
  endereco: "",
  corRaca: "",
  vinculoInstitucional: "",
  funcaoEspecifica: "",
  numeroEditalSelecao: "",
  numeroTermoCompromisso: "",
  instituicaoEnsinoOrigem: "",
  supervisorResponsavelNome: "",
  dataInicioVinculo: "",
  dataFimPrevista: "",
  statusContract: "ATIVO",
};

export default function CadastroEquipe() {
  const [form, setForm] =
    useState<CadastroEquipe>(estadoInicial);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarCampo(
    campo: keyof CadastroEquipe,
    valor: string
  ) {
    setForm((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function salvar(
    evento: FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();

    setMensagem("");
    setErro("");

    if (!/^\d{11}$/.test(form.cpf)) {
      setErro(
        "O CPF deve conter exatamente 11 dígitos."
      );
      return;
    }

    if (
      form.cep &&
      !/^\d{8}$/.test(form.cep)
    ) {
      setErro(
        "O CEP deve conter exatamente 8 dígitos."
      );
      return;
    }

    if (
      form.dataInicioVinculo &&
      form.dataFimPrevista &&
      form.dataFimPrevista < form.dataInicioVinculo
    ) {
      setErro(
        "A data fim prevista não pode ser anterior à data de início do vínculo."
      );
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:8080/equipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomeCompleto: form.nomeCompleto,
            nomeSocial: form.nomeSocial || null,
            cpf: form.cpf,
            dataNascimento:
              form.dataNascimento || null,
            telefone: form.telefone || null,
            eMail: form.eMail || null,
            cep: form.cep || null,
            endereco: form.endereco || null,
            corRaca: form.corRaca || null,
            vinculoInstitucional:
              form.vinculoInstitucional || null,
            funcaoEspecifica:
              form.funcaoEspecifica || null,
            numeroEditalSelecao:
              form.numeroEditalSelecao || null,
            numeroTermoCompromisso:
              form.numeroTermoCompromisso || null,
            instituicaoEnsinoOrigem:
              form.instituicaoEnsinoOrigem || null,
            supervisorResponsavelNome:
              form.supervisorResponsavelNome || null,
            dataInicioVinculo:
              form.dataInicioVinculo || null,
            dataFimPrevista:
              form.dataFimPrevista || null,
            statusContract:
              form.statusContract,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          typeof dados === "string"
            ? dados
            : "Não foi possível cadastrar o colaborador."
        );
      }

      setMensagem(
        `Colaborador cadastrado com sucesso! ID: ${dados.idColaborador}`
      );

      setForm(estadoInicial);

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar colaborador."
      );
    }
  }

  return (
    <main className="cadastro-equipe">
      <h1>Cadastro da Equipe</h1>

      <p>
        Cadastre os dados dos integrantes da equipe.
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

      <form onSubmit={salvar}>

        <fieldset>
          <legend>Dados pessoais</legend>

          <label>
            Nome completo *
            <input
              type="text"
              value={form.nomeCompleto}
              onChange={(e) =>
                atualizarCampo(
                  "nomeCompleto",
                  e.target.value
                )
              }
              required
              maxLength={150}
            />
          </label>

          <label>
            Nome social
            <input
              type="text"
              value={form.nomeSocial}
              onChange={(e) =>
                atualizarCampo(
                  "nomeSocial",
                  e.target.value
                )
              }
              maxLength={150}
            />
          </label>

          <label>
            CPF *
            <input
              type="text"
              inputMode="numeric"
              value={form.cpf}
              onChange={(e) =>
                atualizarCampo(
                  "cpf",
                  e.target.value.replace(/\D/g, "")
                )
              }
              maxLength={11}
              required
              aria-describedby="ajuda-cpf"
            />
          </label>

          <span id="ajuda-cpf">
            Informe somente os 11 dígitos do CPF.
          </span>

          <label>
            Data de nascimento
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) =>
                atualizarCampo(
                  "dataNascimento",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Telefone
            <input
              type="tel"
              value={form.telefone}
              onChange={(e) =>
                atualizarCampo(
                  "telefone",
                  e.target.value
                )
              }
              maxLength={20}
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={form.eMail}
              onChange={(e) =>
                atualizarCampo(
                  "eMail",
                  e.target.value
                )
              }
              maxLength={150}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>

          <label>
            CEP
            <input
              type="text"
              inputMode="numeric"
              value={form.cep}
              onChange={(e) =>
                atualizarCampo(
                  "cep",
                  e.target.value.replace(/\D/g, "")
                )
              }
              maxLength={8}
            />
          </label>

          <label>
            Endereço
            <input
              type="text"
              value={form.endereco}
              onChange={(e) =>
                atualizarCampo(
                  "endereco",
                  e.target.value
                )
              }
              maxLength={250}
            />
          </label>

          <label>
            Cor/raça
            <input
              type="text"
              value={form.corRaca}
              onChange={(e) =>
                atualizarCampo(
                  "corRaca",
                  e.target.value
                )
              }
              maxLength={30}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Vínculo institucional</legend>

          <label>
            Vínculo institucional
            <input
              type="text"
              value={form.vinculoInstitucional}
              onChange={(e) =>
                atualizarCampo(
                  "vinculoInstitucional",
                  e.target.value
                )
              }
              maxLength={100}
            />
          </label>

          <label>
            Função específica
            <input
              type="text"
              value={form.funcaoEspecifica}
              onChange={(e) =>
                atualizarCampo(
                  "funcaoEspecifica",
                  e.target.value
                )
              }
              maxLength={150}
            />
          </label>

          <label>
            Número do edital de seleção
            <input
              type="text"
              value={form.numeroEditalSelecao}
              onChange={(e) =>
                atualizarCampo(
                  "numeroEditalSelecao",
                  e.target.value
                )
              }
              maxLength={100}
            />
          </label>

          <label>
            Número do termo de compromisso
            <input
              type="text"
              value={form.numeroTermoCompromisso}
              onChange={(e) =>
                atualizarCampo(
                  "numeroTermoCompromisso",
                  e.target.value
                )
              }
              maxLength={100}
            />
          </label>

          <label>
            Instituição de ensino de origem
            <input
              type="text"
              value={form.instituicaoEnsinoOrigem}
              onChange={(e) =>
                atualizarCampo(
                  "instituicaoEnsinoOrigem",
                  e.target.value
                )
              }
              maxLength={200}
            />
          </label>

          <label>
            Nome do supervisor responsável
            <input
              type="text"
              value={
                form.supervisorResponsavelNome
              }
              onChange={(e) =>
                atualizarCampo(
                  "supervisorResponsavelNome",
                  e.target.value
                )
              }
              maxLength={150}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Período do vínculo</legend>

          <label>
            Data de início do vínculo
            <input
              type="date"
              value={form.dataInicioVinculo}
              onChange={(e) =>
                atualizarCampo(
                  "dataInicioVinculo",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Data fim prevista
            <input
              type="date"
              value={form.dataFimPrevista}
              onChange={(e) =>
                atualizarCampo(
                  "dataFimPrevista",
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Status do contrato
            <select
              value={form.statusContract}
              onChange={(e) =>
                atualizarCampo(
                  "statusContract",
                  e.target.value
                )
              }
            >
              <option value="ATIVO">
                ATIVO
              </option>

              <option value="INATIVO">
                INATIVO
              </option>

              <option value="ENCERRADO">
                ENCERRADO
              </option>

              <option value="AFASTADO">
                AFASTADO
              </option>
            </select>
          </label>
        </fieldset>

        <button type="submit">
          Cadastrar colaborador
        </button>

      </form>
    </main>
  );
}

