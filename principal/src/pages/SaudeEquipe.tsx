
import { type FormEvent, useState } from "react";

interface SaudeEquipeForm {
  idColaborador: string;
  anoReferencia: string;
  apresentouAtestadoSaudeOcupacional: string;
  dataValidadeAtestado: string;
  possuiDeficienciaPcd: string;
  tipoDeficienciaLaudo: string;
  laudoMedicoPcdLink: string;
  alergiasGraves: string;
  alergiasDocLink: string;
  alimentacaoRestricao: string;
  alimentacaoRestricaoDescricao: string;
  alimentacaoChoqueAnafilaticoAlerta: string;
  doencasCronicasRestricoes: string;
  doencasCronicasDocLink: string;
  medicacaoUsoContinuo: string;
  receitaMedicacaoLink: string;
  vacinaDigitalStatus: string;
  vacinaCodigoValidacaoGovbr: string;
  vacinaPdfConectesusLink: string;
  restricaoFisicaParaAulaPratica: string;
  parecerRestricaoDescricao: string;
}

const formularioInicial: SaudeEquipeForm = {
  idColaborador: "",
  anoReferencia: "",
  apresentouAtestadoSaudeOcupacional: "",
  dataValidadeAtestado: "",
  possuiDeficienciaPcd: "",
  tipoDeficienciaLaudo: "",
  laudoMedicoPcdLink: "",
  alergiasGraves: "",
  alergiasDocLink: "",
  alimentacaoRestricao: "",
  alimentacaoRestricaoDescricao: "",
  alimentacaoChoqueAnafilaticoAlerta: "",
  doencasCronicasRestricoes: "",
  doencasCronicasDocLink: "",
  medicacaoUsoContinuo: "",
  receitaMedicacaoLink: "",
  vacinaDigitalStatus: "",
  vacinaCodigoValidacaoGovbr: "",
  vacinaPdfConectesusLink: "",
  restricaoFisicaParaAulaPratica: "",
  parecerRestricaoDescricao: "",
};

function booleanoOuNull(valor: string): boolean | null {
  if (valor === "") {
    return null;
  }

  return valor === "true";
}

export default function SaudeEquipe() {
  const [form, setForm] =
    useState<SaudeEquipeForm>(formularioInicial);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    if (!form.idColaborador) {
      setErro("Informe o ID do colaborador.");
      return;
    }

    if (!form.anoReferencia) {
      setErro("Informe o ano de referência.");
      return;
    }

    const payload = {
      idColaborador: Number(form.idColaborador),
      anoReferencia: Number(form.anoReferencia),

      apresentouAtestadoSaudeOcupacional:
        booleanoOuNull(
          form.apresentouAtestadoSaudeOcupacional
        ),

      dataValidadeAtestado:
        form.dataValidadeAtestado || null,

      possuiDeficienciaPcd:
        booleanoOuNull(
          form.possuiDeficienciaPcd
        ),

      tipoDeficienciaLaudo:
        form.tipoDeficienciaLaudo || null,

      laudoMedicoPcdLink:
        form.laudoMedicoPcdLink || null,

      alergiasGraves:
        form.alergiasGraves || null,

      alergiasDocLink:
        form.alergiasDocLink || null,

      alimentacaoRestricao:
        booleanoOuNull(
          form.alimentacaoRestricao
        ),

      alimentacaoRestricaoDescricao:
        form.alimentacaoRestricaoDescricao || null,

      alimentacaoChoqueAnafilaticoAlerta:
        booleanoOuNull(
          form.alimentacaoChoqueAnafilaticoAlerta
        ),

      doencasCronicasRestricoes:
        form.doencasCronicasRestricoes || null,

      doencasCronicasDocLink:
        form.doencasCronicasDocLink || null,

      medicacaoUsoContinuo:
        form.medicacaoUsoContinuo || null,

      receitaMedicacaoLink:
        form.receitaMedicacaoLink || null,

      vacinaDigitalStatus:
        form.vacinaDigitalStatus || null,

      vacinaCodigoValidacaoGovbr:
        form.vacinaCodigoValidacaoGovbr || null,

      vacinaPdfConectesusLink:
        form.vacinaPdfConectesusLink || null,

      restricaoFisicaParaAulaPratica:
        booleanoOuNull(
          form.restricaoFisicaParaAulaPratica
        ),

      parecerRestricaoDescricao:
        form.parecerRestricaoDescricao || null,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/saude-equipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
        "Registro de saúde da equipe cadastrado com sucesso."
      );

      setForm(formularioInicial);

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

      <h1>Saúde da Equipe</h1>

      <p>
        Cadastro das informações de saúde e laudos do colaborador.
      </p>

      <form onSubmit={handleSubmit}>

        <fieldset>
          <legend>Identificação</legend>

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
            <label htmlFor="anoReferencia">
              Ano de referência
            </label>

            <input
              id="anoReferencia"
              name="anoReferencia"
              type="number"
              min="1900"
              max="2200"
              value={form.anoReferencia}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Atestado de saúde ocupacional</legend>

          <div>
            <label htmlFor="apresentouAtestadoSaudeOcupacional">
              Apresentou atestado de saúde ocupacional?
            </label>

            <select
              id="apresentouAtestadoSaudeOcupacional"
              name="apresentouAtestadoSaudeOcupacional"
              value={
                form.apresentouAtestadoSaudeOcupacional
              }
              onChange={handleChange}
            >
              <option value="">
                Não informado
              </option>

              <option value="true">
                Sim
              </option>

              <option value="false">
                Não
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="dataValidadeAtestado">
              Data de validade do atestado
            </label>

            <input
              id="dataValidadeAtestado"
              name="dataValidadeAtestado"
              type="date"
              value={form.dataValidadeAtestado}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Deficiência e laudo</legend>

          <div>
            <label htmlFor="possuiDeficienciaPcd">
              Possui deficiência PcD?
            </label>

            <select
              id="possuiDeficienciaPcd"
              name="possuiDeficienciaPcd"
              value={form.possuiDeficienciaPcd}
              onChange={handleChange}
            >
              <option value="">
                Não informado
              </option>

              <option value="true">
                Sim
              </option>

              <option value="false">
                Não
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="tipoDeficienciaLaudo">
              Tipo de deficiência no laudo
            </label>

            <input
              id="tipoDeficienciaLaudo"
              name="tipoDeficienciaLaudo"
              type="text"
              maxLength={100}
              value={form.tipoDeficienciaLaudo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="laudoMedicoPcdLink">
              Link do laudo médico PcD
            </label>

            <input
              id="laudoMedicoPcdLink"
              name="laudoMedicoPcdLink"
              type="text"
              value={form.laudoMedicoPcdLink}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Alergias</legend>

          <div>
            <label htmlFor="alergiasGraves">
              Alergias graves
            </label>

            <textarea
              id="alergiasGraves"
              name="alergiasGraves"
              value={form.alergiasGraves}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="alergiasDocLink">
              Link do documento de alergias
            </label>

            <input
              id="alergiasDocLink"
              name="alergiasDocLink"
              type="text"
              value={form.alergiasDocLink}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Alimentação</legend>

          <div>
            <label htmlFor="alimentacaoRestricao">
              Possui restrição alimentar?
            </label>

            <select
              id="alimentacaoRestricao"
              name="alimentacaoRestricao"
              value={form.alimentacaoRestricao}
              onChange={handleChange}
            >
              <option value="">
                Não informado
              </option>

              <option value="true">
                Sim
              </option>

              <option value="false">
                Não
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="alimentacaoRestricaoDescricao">
              Descrição da restrição alimentar
            </label>

            <textarea
              id="alimentacaoRestricaoDescricao"
              name="alimentacaoRestricaoDescricao"
              value={
                form.alimentacaoRestricaoDescricao
              }
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="alimentacaoChoqueAnafilaticoAlerta">
              Alerta de choque anafilático
            </label>

            <select
              id="alimentacaoChoqueAnafilaticoAlerta"
              name="alimentacaoChoqueAnafilaticoAlerta"
              value={
                form.alimentacaoChoqueAnafilaticoAlerta
              }
              onChange={handleChange}
            >
              <option value="">
                Não informado
              </option>

              <option value="true">
                Sim
              </option>

              <option value="false">
                Não
              </option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Doenças crônicas</legend>

          <div>
            <label htmlFor="doencasCronicasRestricoes">
              Doenças crônicas e restrições
            </label>

            <textarea
              id="doencasCronicasRestricoes"
              name="doencasCronicasRestricoes"
              value={form.doencasCronicasRestricoes}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="doencasCronicasDocLink">
              Link do documento de doenças crônicas
            </label>

            <input
              id="doencasCronicasDocLink"
              name="doencasCronicasDocLink"
              type="text"
              value={form.doencasCronicasDocLink}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Medicação</legend>

          <div>
            <label htmlFor="medicacaoUsoContinuo">
              Medicação de uso contínuo
            </label>

            <textarea
              id="medicacaoUsoContinuo"
              name="medicacaoUsoContinuo"
              value={form.medicacaoUsoContinuo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="receitaMedicacaoLink">
              Link da receita de medicação
            </label>

            <input
              id="receitaMedicacaoLink"
              name="receitaMedicacaoLink"
              type="text"
              value={form.receitaMedicacaoLink}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Vacinação</legend>

          <div>
            <label htmlFor="vacinaDigitalStatus">
              Status da vacina digital
            </label>

            <input
              id="vacinaDigitalStatus"
              name="vacinaDigitalStatus"
              type="text"
              maxLength={50}
              value={form.vacinaDigitalStatus}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="vacinaCodigoValidacaoGovbr">
              Código de validação Gov.br
            </label>

            <input
              id="vacinaCodigoValidacaoGovbr"
              name="vacinaCodigoValidacaoGovbr"
              type="text"
              maxLength={100}
              value={form.vacinaCodigoValidacaoGovbr}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="vacinaPdfConectesusLink">
              Link do PDF ConecteSUS
            </label>

            <input
              id="vacinaPdfConectesusLink"
              name="vacinaPdfConectesusLink"
              type="text"
              value={form.vacinaPdfConectesusLink}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Restrição física</legend>

          <div>
            <label htmlFor="restricaoFisicaParaAulaPratica">
              Restrição física para aula prática?
            </label>

            <select
              id="restricaoFisicaParaAulaPratica"
              name="restricaoFisicaParaAulaPratica"
              value={
                form.restricaoFisicaParaAulaPratica
              }
              onChange={handleChange}
            >
              <option value="">
                Não informado
              </option>

              <option value="true">
                Sim
              </option>

              <option value="false">
                Não
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="parecerRestricaoDescricao">
              Descrição do parecer da restrição
            </label>

            <textarea
              id="parecerRestricaoDescricao"
              name="parecerRestricaoDescricao"
              value={form.parecerRestricaoDescricao}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <button type="submit">
          Cadastrar informações de saúde
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

