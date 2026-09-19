
import { type FormEvent, useState } from "react";
import "./CadastroSaudeBiometria.css";

interface SaudeBiometria {
  idAluno: number;
  semestreAno: string;

  possuiDeficiencia: boolean | null;
  tipoDeficienciaLaudo: string;
  laudoMedicoLink: string;
  relatorioTecnicoLink: string;

  alergias: string;
  alergiasDocLink: string;

  alimentacaoRestricao: boolean | null;
  alimentacaoRestricaoDescricao: string;

  alimentacaoSeletividade: boolean | null;
  alimentacaoSeletividadeDetalhes: string;
  alimentacaoLaudoNutricionalLink: string;

  doencasCronicas: string;
  doencasCronicasDocLink: string;

  medicacaoControlada: string;
  medicacaoControladaDocLink: string;

  medicacaoEventual: string;
  medicacaoEventualDocLink: string;

  liberacaoMedicaAtividade: boolean | null;

  numeroSus: string;

  vacinaDigitalStatus: string;
  vacinaCodigoValidacaoGovbr: string;
  vacinaPdfConectesusLink: string;

  pesoKg: string;
  alturaMetros: string;

  tamanhoCalcadoSapatilha: string;
}

function CadastroSaudeBiometria() {
  const [formulario, setFormulario] = useState<SaudeBiometria>({
    idAluno: 0,
    semestreAno: "",

    possuiDeficiencia: null,
    tipoDeficienciaLaudo: "",
    laudoMedicoLink: "",
    relatorioTecnicoLink: "",

    alergias: "",
    alergiasDocLink: "",

    alimentacaoRestricao: null,
    alimentacaoRestricaoDescricao: "",

    alimentacaoSeletividade: null,
    alimentacaoSeletividadeDetalhes: "",
    alimentacaoLaudoNutricionalLink: "",

    doencasCronicas: "",
    doencasCronicasDocLink: "",

    medicacaoControlada: "",
    medicacaoControladaDocLink: "",

    medicacaoEventual: "",
    medicacaoEventualDocLink: "",

    liberacaoMedicaAtividade: null,

    numeroSus: "",

    vacinaDigitalStatus: "",
    vacinaCodigoValidacaoGovbr: "",
    vacinaPdfConectesusLink: "",

    pesoKg: "",
    alturaMetros: "",

    tamanhoCalcadoSapatilha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function alterarCampo(
    campo: keyof SaudeBiometria,
    valor: string | number | boolean | null
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function converterBooleano(valor: string): boolean | null {
    if (valor === "") {
      return null;
    }

    return valor === "true";
  }

  async function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    // Validação do ID do aluno
    if (!formulario.idAluno || formulario.idAluno <= 0) {
      setErro("Informe um ID de aluno válido.");
      return;
    }

    // Validação do semestre/ano conforme o schema:
    // YYYY.1 ou YYYY.2
    const formatoSemestre = /^\d{4}\.[12]$/;

    if (!formatoSemestre.test(formulario.semestreAno)) {
      setErro(
        "Informe o semestre/ano no formato correto. Exemplo: 2026.2"
      );
      return;
    }

    // Validação do peso
    if (
      formulario.pesoKg !== "" &&
      Number(formulario.pesoKg) <= 0
    ) {
      setErro("O peso deve ser maior que zero.");
      return;
    }

    // Validação da altura
    if (
      formulario.alturaMetros !== "" &&
      Number(formulario.alturaMetros) <= 0
    ) {
      setErro("A altura deve ser maior que zero.");
      return;
    }

    setSalvando(true);

    try {
      const dadosParaEnviar = {
        ...formulario,

        pesoKg:
          formulario.pesoKg === ""
            ? null
            : Number(formulario.pesoKg),

        alturaMetros:
          formulario.alturaMetros === ""
            ? null
            : Number(formulario.alturaMetros),
      };

      const response = await fetch(
        "http://localhost:8080/saude-biometria",
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
            "Não foi possível cadastrar o registro de saúde."
        );
      }

      const resultado = await response.json();

      console.log("Registro de saúde salvo:", resultado);

      setMensagem(
        `Registro de saúde cadastrado com sucesso! ID: ${resultado.idRegistroSaude}`
      );

      // Limpa o formulário após o cadastro
      setFormulario({
        idAluno: 0,
        semestreAno: "",

        possuiDeficiencia: null,
        tipoDeficienciaLaudo: "",
        laudoMedicoLink: "",
        relatorioTecnicoLink: "",

        alergias: "",
        alergiasDocLink: "",

        alimentacaoRestricao: null,
        alimentacaoRestricaoDescricao: "",

        alimentacaoSeletividade: null,
        alimentacaoSeletividadeDetalhes: "",
        alimentacaoLaudoNutricionalLink: "",

        doencasCronicas: "",
        doencasCronicasDocLink: "",

        medicacaoControlada: "",
        medicacaoControladaDocLink: "",

        medicacaoEventual: "",
        medicacaoEventualDocLink: "",

        liberacaoMedicaAtividade: null,

        numeroSus: "",

        vacinaDigitalStatus: "",
        vacinaCodigoValidacaoGovbr: "",
        vacinaPdfConectesusLink: "",

        pesoKg: "",
        alturaMetros: "",

        tamanhoCalcadoSapatilha: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar saúde/biometria:", error);

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Ocorreu um erro inesperado ao cadastrar o registro de saúde."
        );
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="cadastro-saude-biometria">
      <div className="saude-container">
        <h1>Cadastro de Saúde e Biometria</h1>

        <p className="descricao">
          Preencha os dados de saúde e biometria do estudante.
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
            <h2>Identificação do registro</h2>

            <div className="campo">
              <label htmlFor="idAluno">
                ID do aluno *
              </label>

              <input
                id="idAluno"
                type="number"
                min="1"
                value={formulario.idAluno || ""}
                onChange={(e) =>
                  alterarCampo(
                    "idAluno",
                    Number(e.target.value)
                  )
                }
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="semestreAno">
                Semestre/Ano *
              </label>

              <input
                id="semestreAno"
                type="text"
                placeholder="Ex.: 2026.2"
                maxLength={7}
                value={formulario.semestreAno}
                onChange={(e) =>
                  alterarCampo(
                    "semestreAno",
                    e.target.value
                  )
                }
                required
              />

              <small>
                Informe no formato AAAA.1 ou AAAA.2.
              </small>
            </div>
          </section>

          <section>
            <h2>Deficiência</h2>

            <div className="campo">
              <label htmlFor="possuiDeficiencia">
                Possui deficiência?
              </label>

              <select
                id="possuiDeficiencia"
                value={
                  formulario.possuiDeficiencia === null
                    ? ""
                    : String(formulario.possuiDeficiencia)
                }
                onChange={(e) =>
                  alterarCampo(
                    "possuiDeficiencia",
                    converterBooleano(e.target.value)
                  )
                }
              >
                <option value="">
                  Não informado
                </option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="tipoDeficienciaLaudo">
                Tipo de deficiência / laudo
              </label>

              <input
                id="tipoDeficienciaLaudo"
                type="text"
                value={formulario.tipoDeficienciaLaudo}
                onChange={(e) =>
                  alterarCampo(
                    "tipoDeficienciaLaudo",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="laudoMedicoLink">
                Link do laudo médico
              </label>

              <input
                id="laudoMedicoLink"
                type="url"
                value={formulario.laudoMedicoLink}
                onChange={(e) =>
                  alterarCampo(
                    "laudoMedicoLink",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="relatorioTecnicoLink">
                Link do relatório técnico
              </label>

              <input
                id="relatorioTecnicoLink"
                type="url"
                value={formulario.relatorioTecnicoLink}
                onChange={(e) =>
                  alterarCampo(
                    "relatorioTecnicoLink",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Alergias</h2>

            <div className="campo">
              <label htmlFor="alergias">
                Alergias
              </label>

              <textarea
                id="alergias"
                value={formulario.alergias}
                onChange={(e) =>
                  alterarCampo(
                    "alergias",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="alergiasDocLink">
                Link do documento de alergias
              </label>

              <input
                id="alergiasDocLink"
                type="url"
                value={formulario.alergiasDocLink}
                onChange={(e) =>
                  alterarCampo(
                    "alergiasDocLink",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Alimentação</h2>

            <div className="campo">
              <label htmlFor="alimentacaoRestricao">
                Possui restrição alimentar?
              </label>

              <select
                id="alimentacaoRestricao"
                value={
                  formulario.alimentacaoRestricao === null
                    ? ""
                    : String(formulario.alimentacaoRestricao)
                }
                onChange={(e) =>
                  alterarCampo(
                    "alimentacaoRestricao",
                    converterBooleano(e.target.value)
                  )
                }
              >
                <option value="">
                  Não informado
                </option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="alimentacaoRestricaoDescricao">
                Descrição da restrição alimentar
              </label>

              <textarea
                id="alimentacaoRestricaoDescricao"
                value={
                  formulario.alimentacaoRestricaoDescricao
                }
                onChange={(e) =>
                  alterarCampo(
                    "alimentacaoRestricaoDescricao",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="alimentacaoSeletividade">
                Possui seletividade alimentar?
              </label>

              <select
                id="alimentacaoSeletividade"
                value={
                  formulario.alimentacaoSeletividade === null
                    ? ""
                    : String(
                        formulario.alimentacaoSeletividade
                      )
                }
                onChange={(e) =>
                  alterarCampo(
                    "alimentacaoSeletividade",
                    converterBooleano(e.target.value)
                  )
                }
              >
                <option value="">
                  Não informado
                </option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="alimentacaoSeletividadeDetalhes">
                Detalhes da seletividade alimentar
              </label>

              <textarea
                id="alimentacaoSeletividadeDetalhes"
                value={
                  formulario.alimentacaoSeletividadeDetalhes
                }
                onChange={(e) =>
                  alterarCampo(
                    "alimentacaoSeletividadeDetalhes",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="alimentacaoLaudoNutricionalLink">
                Link do laudo nutricional
              </label>

              <input
                id="alimentacaoLaudoNutricionalLink"
                type="url"
                value={
                  formulario.alimentacaoLaudoNutricionalLink
                }
                onChange={(e) =>
                  alterarCampo(
                    "alimentacaoLaudoNutricionalLink",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Doenças crônicas</h2>

            <div className="campo">
              <label htmlFor="doencasCronicas">
                Doenças crônicas
              </label>

              <textarea
                id="doencasCronicas"
                value={formulario.doencasCronicas}
                onChange={(e) =>
                  alterarCampo(
                    "doencasCronicas",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="doencasCronicasDocLink">
                Link do documento
              </label>

              <input
                id="doencasCronicasDocLink"
                type="url"
                value={formulario.doencasCronicasDocLink}
                onChange={(e) =>
                  alterarCampo(
                    "doencasCronicasDocLink",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Medicação</h2>

            <div className="campo">
              <label htmlFor="medicacaoControlada">
                Medicação controlada
              </label>

              <textarea
                id="medicacaoControlada"
                value={formulario.medicacaoControlada}
                onChange={(e) =>
                  alterarCampo(
                    "medicacaoControlada",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="medicacaoControladaDocLink">
                Link do documento da medicação controlada
              </label>

              <input
                id="medicacaoControladaDocLink"
                type="url"
                value={
                  formulario.medicacaoControladaDocLink
                }
                onChange={(e) =>
                  alterarCampo(
                    "medicacaoControladaDocLink",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="medicacaoEventual">
                Medicação eventual
              </label>

              <textarea
                id="medicacaoEventual"
                value={formulario.medicacaoEventual}
                onChange={(e) =>
                  alterarCampo(
                    "medicacaoEventual",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="medicacaoEventualDocLink">
                Link do documento da medicação eventual
              </label>

              <input
                id="medicacaoEventualDocLink"
                type="url"
                value={
                  formulario.medicacaoEventualDocLink
                }
                onChange={(e) =>
                  alterarCampo(
                    "medicacaoEventualDocLink",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Liberação médica</h2>

            <div className="campo">
              <label htmlFor="liberacaoMedicaAtividade">
                Liberado para atividade?
              </label>

              <select
                id="liberacaoMedicaAtividade"
                value={
                  formulario.liberacaoMedicaAtividade === null
                    ? ""
                    : String(
                        formulario.liberacaoMedicaAtividade
                      )
                }
                onChange={(e) =>
                  alterarCampo(
                    "liberacaoMedicaAtividade",
                    converterBooleano(e.target.value)
                  )
                }
              >
                <option value="">
                  Não informado
                </option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </section>

          <section>
            <h2>SUS e vacinação</h2>

            <div className="campo">
              <label htmlFor="numeroSus">
                Número do SUS
              </label>

              <input
                id="numeroSus"
                type="text"
                maxLength={20}
                value={formulario.numeroSus}
                onChange={(e) =>
                  alterarCampo(
                    "numeroSus",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="vacinaDigitalStatus">
                Status da vacina digital
              </label>

              <input
                id="vacinaDigitalStatus"
                type="text"
                maxLength={50}
                value={formulario.vacinaDigitalStatus}
                onChange={(e) =>
                  alterarCampo(
                    "vacinaDigitalStatus",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="vacinaCodigoValidacaoGovbr">
                Código de validação Gov.br
              </label>

              <input
                id="vacinaCodigoValidacaoGovbr"
                type="text"
                maxLength={100}
                value={
                  formulario.vacinaCodigoValidacaoGovbr
                }
                onChange={(e) =>
                  alterarCampo(
                    "vacinaCodigoValidacaoGovbr",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="vacinaPdfConectesusLink">
                Link do PDF do Conecte SUS
              </label>

              <input
                id="vacinaPdfConectesusLink"
                type="url"
                value={
                  formulario.vacinaPdfConectesusLink
                }
                onChange={(e) =>
                  alterarCampo(
                    "vacinaPdfConectesusLink",
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          <section>
            <h2>Biometria</h2>

            <div className="campo">
              <label htmlFor="pesoKg">
                Peso (kg)
              </label>

              <input
                id="pesoKg"
                type="number"
                min="0"
                step="0.01"
                value={formulario.pesoKg}
                onChange={(e) =>
                  alterarCampo(
                    "pesoKg",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="alturaMetros">
                Altura (metros)
              </label>

              <input
                id="alturaMetros"
                type="number"
                min="0"
                step="0.01"
                value={formulario.alturaMetros}
                onChange={(e) =>
                  alterarCampo(
                    "alturaMetros",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="tamanhoCalcadoSapatilha">
                Tamanho do calçado/sapatilha
              </label>

              <input
                id="tamanhoCalcadoSapatilha"
                type="text"
                maxLength={20}
                value={
                  formulario.tamanhoCalcadoSapatilha
                }
                onChange={(e) =>
                  alterarCampo(
                    "tamanhoCalcadoSapatilha",
                    e.target.value
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
              : "Cadastrar registro de saúde"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default CadastroSaudeBiometria;
