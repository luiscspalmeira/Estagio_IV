
import { type FormEvent, useState } from 'react'
import './CadastroNucleoFamiliar.css'

interface NucleoFamiliar {
  idAluno: number
  nomeCompleto: string
  nomeSocial: string
  cpf: string
  dataNascimento: string
  corRaca: string
  genero: string
  grauParentesco: string
  telefoneContato: string
  emailFamiliar: string
  grauInstrucao: string
  estudaAtualmente: boolean | null
  escolaRegularOndeEstuda: string
  serieAnoEscolaRegular: string
  profissionalOcupacao: string
  possuiRenda: boolean | null
  valorRendaMensal: string
  numeroNisFamiliar: string
  possuiDeficiencia: boolean | null
  tipoDeficienciaLaudo: string
  alergiasDoencasCronicas: string
  medicacaoControladaEventual: string
}

const estadoInicial: NucleoFamiliar = {
  idAluno: 0,
  nomeCompleto: '',
  nomeSocial: '',
  cpf: '',
  dataNascimento: '',
  corRaca: '',
  genero: '',
  grauParentesco: '',
  telefoneContato: '',
  emailFamiliar: '',
  grauInstrucao: '',
  estudaAtualmente: null,
  escolaRegularOndeEstuda: '',
  serieAnoEscolaRegular: '',
  profissionalOcupacao: '',
  possuiRenda: null,
  valorRendaMensal: '',
  numeroNisFamiliar: '',
  possuiDeficiencia: null,
  tipoDeficienciaLaudo: '',
  alergiasDoencasCronicas: '',
  medicacaoControladaEventual: '',
}

function CadastroNucleoFamiliar() {
  const [formulario, setFormulario] =
    useState<NucleoFamiliar>(estadoInicial)

  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  function atualizarCampo(
    campo: keyof NucleoFamiliar,
    valor: string | number | boolean | null
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }))
  }

  async function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setMensagem('')
    setErro('')

    if (!formulario.idAluno || formulario.idAluno <= 0) {
      setErro('Informe um ID de estudante válido.')
      return
    }

    if (!formulario.nomeCompleto.trim()) {
      setErro('Informe o nome completo do familiar.')
      return
    }

    if (
      formulario.possuiRenda === true &&
      formulario.valorRendaMensal === ''
    ) {
      setErro(
        'Informe o valor da renda mensal quando "Possui renda" estiver marcado como Sim.'
      )
      return
    }

    setEnviando(true)

    const dados = {
      ...formulario,
      valorRendaMensal:
        formulario.valorRendaMensal === ''
          ? null
          : Number(formulario.valorRendaMensal),
    }

    try {
      const resposta = await fetch(
        'http://localhost:8080/nucleo-familiar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
        }
      )

      if (!resposta.ok) {
        const textoErro = await resposta.text()

        throw new Error(
          textoErro || 'Não foi possível cadastrar o familiar.'
        )
      }

      const resultado = await resposta.json()

      setMensagem(
        `Familiar cadastrado com sucesso! ID: ${resultado.idFamiliar}`
      )

      setFormulario(estadoInicial)
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message)
      } else {
        setErro('Erro inesperado ao cadastrar o familiar.')
      }
    } finally {
      setEnviando(false)
    }
  }

  function limparFormulario() {
    setFormulario(estadoInicial)
    setMensagem('')
    setErro('')
  }

  return (
    <div className="nucleo-familiar-container">
      <header className="nucleo-familiar-header">
        <h1>Cadastro do Núcleo Familiar</h1>

        <p>
          Cadastre as informações de um familiar vinculado ao estudante.
        </p>
      </header>

      <form
        className="nucleo-familiar-form"
        onSubmit={cadastrar}
      >
        {/* IDENTIFICAÇÃO */}

        <section className="form-section">
          <h2>1. Identificação do familiar</h2>

          <div className="form-grid">
            <div className="campo">
              <label htmlFor="idAluno">
                ID do estudante <span aria-hidden="true">*</span>
              </label>

              <input
                id="idAluno"
                type="number"
                min="1"
                value={formulario.idAluno || ''}
                onChange={(event) =>
                  atualizarCampo(
                    'idAluno',
                    Number(event.target.value)
                  )
                }
                required
              />

              <small>
                Informe o ID do estudante já cadastrado.
              </small>
            </div>

            <div className="campo">
              <label htmlFor="nomeCompleto">
                Nome completo <span aria-hidden="true">*</span>
              </label>

              <input
                id="nomeCompleto"
                type="text"
                maxLength={150}
                value={formulario.nomeCompleto}
                onChange={(event) =>
                  atualizarCampo(
                    'nomeCompleto',
                    event.target.value
                  )
                }
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="nomeSocial">
                Nome social
              </label>

              <input
                id="nomeSocial"
                type="text"
                maxLength={150}
                value={formulario.nomeSocial}
                onChange={(event) =>
                  atualizarCampo(
                    'nomeSocial',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="cpf">
                CPF
              </label>

              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                maxLength={11}
                value={formulario.cpf}
                onChange={(event) =>
                  atualizarCampo(
                    'cpf',
                    event.target.value.replace(/\D/g, '')
                  )
                }
              />

              <small>
                Digite somente os 11 números.
              </small>
            </div>

            <div className="campo">
              <label htmlFor="dataNascimento">
                Data de nascimento
              </label>

              <input
                id="dataNascimento"
                type="date"
                value={formulario.dataNascimento}
                onChange={(event) =>
                  atualizarCampo(
                    'dataNascimento',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="grauParentesco">
                Grau de parentesco
              </label>

              <input
                id="grauParentesco"
                type="text"
                maxLength={50}
                placeholder="Ex.: mãe, pai, irmão..."
                value={formulario.grauParentesco}
                onChange={(event) =>
                  atualizarCampo(
                    'grauParentesco',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="corRaca">
                Cor/Raça
              </label>

              <select
                id="corRaca"
                value={formulario.corRaca}
                onChange={(event) =>
                  atualizarCampo(
                    'corRaca',
                    event.target.value
                  )
                }
              >
                <option value="">Selecione</option>
                <option value="branca">Branca</option>
                <option value="preta">Preta</option>
                <option value="parda">Parda</option>
                <option value="amarela">Amarela</option>
                <option value="indígena">Indígena</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="genero">
                Gênero
              </label>

              <select
                id="genero"
                value={formulario.genero}
                onChange={(event) =>
                  atualizarCampo(
                    'genero',
                    event.target.value
                  )
                }
              >
                <option value="">Selecione</option>
                <option value="Mulher">Mulher</option>
                <option value="Mulher trans">
                  Mulher trans
                </option>
                <option value="Homem">Homem</option>
                <option value="Homem trans">
                  Homem trans
                </option>
                <option value="Travesti">Travesti</option>
                <option value="Não binário">
                  Não binário
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* CONTATO */}

        <section className="form-section">
          <h2>2. Contato</h2>

          <div className="form-grid">
            <div className="campo">
              <label htmlFor="telefoneContato">
                Telefone
              </label>

              <input
                id="telefoneContato"
                type="tel"
                maxLength={20}
                value={formulario.telefoneContato}
                onChange={(event) =>
                  atualizarCampo(
                    'telefoneContato',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="emailFamiliar">
                E-mail
              </label>

              <input
                id="emailFamiliar"
                type="email"
                maxLength={150}
                value={formulario.emailFamiliar}
                onChange={(event) =>
                  atualizarCampo(
                    'emailFamiliar',
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* EDUCAÇÃO */}

        <section className="form-section">
          <h2>3. Educação</h2>

          <div className="form-grid">
            <div className="campo">
              <label htmlFor="grauInstrucao">
                Grau de instrução
              </label>

              <input
                id="grauInstrucao"
                type="text"
                maxLength={100}
                value={formulario.grauInstrucao}
                onChange={(event) =>
                  atualizarCampo(
                    'grauInstrucao',
                    event.target.value
                  )
                }
              />
            </div>

            <fieldset className="campo campo-radio">
              <legend>Estuda atualmente?</legend>

              <div className="radio-opcoes">
                <label>
                  <input
                    type="radio"
                    name="estudaAtualmente"
                    checked={
                      formulario.estudaAtualmente === true
                    }
                    onChange={() =>
                      atualizarCampo(
                        'estudaAtualmente',
                        true
                      )
                    }
                  />
                  Sim
                </label>

                <label>
                  <input
                    type="radio"
                    name="estudaAtualmente"
                    checked={
                      formulario.estudaAtualmente === false
                    }
                    onChange={() =>
                      atualizarCampo(
                        'estudaAtualmente',
                        false
                      )
                    }
                  />
                  Não
                </label>
              </div>
            </fieldset>

            <div className="campo">
              <label htmlFor="escolaRegularOndeEstuda">
                Escola regular onde estuda
              </label>

              <input
                id="escolaRegularOndeEstuda"
                type="text"
                maxLength={200}
                value={
                  formulario.escolaRegularOndeEstuda
                }
                onChange={(event) =>
                  atualizarCampo(
                    'escolaRegularOndeEstuda',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="serieAnoEscolaRegular">
                Série/Ano
              </label>

              <input
                id="serieAnoEscolaRegular"
                type="text"
                maxLength={50}
                value={
                  formulario.serieAnoEscolaRegular
                }
                onChange={(event) =>
                  atualizarCampo(
                    'serieAnoEscolaRegular',
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* TRABALHO E RENDA */}

        <section className="form-section">
          <h2>4. Trabalho e renda</h2>

          <div className="form-grid">
            <div className="campo">
              <label htmlFor="profissionalOcupacao">
                Profissão/Ocupação
              </label>

              <input
                id="profissionalOcupacao"
                type="text"
                maxLength={150}
                value={
                  formulario.profissionalOcupacao
                }
                onChange={(event) =>
                  atualizarCampo(
                    'profissionalOcupacao',
                    event.target.value
                  )
                }
              />
            </div>

            <fieldset className="campo campo-radio">
              <legend>Possui renda?</legend>

              <div className="radio-opcoes">
                <label>
                  <input
                    type="radio"
                    name="possuiRenda"
                    checked={
                      formulario.possuiRenda === true
                    }
                    onChange={() =>
                      atualizarCampo(
                        'possuiRenda',
                        true
                      )
                    }
                  />
                  Sim
                </label>

                <label>
                  <input
                    type="radio"
                    name="possuiRenda"
                    checked={
                      formulario.possuiRenda === false
                    }
                    onChange={() =>
                      atualizarCampo(
                        'possuiRenda',
                        false
                      )
                    }
                  />
                  Não
                </label>
              </div>
            </fieldset>

            <div className="campo">
              <label htmlFor="valorRendaMensal">
                Renda mensal
              </label>

              <input
                id="valorRendaMensal"
                type="number"
                min="0"
                step="0.01"
                value={formulario.valorRendaMensal}
                onChange={(event) =>
                  atualizarCampo(
                    'valorRendaMensal',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo">
              <label htmlFor="numeroNisFamiliar">
                NIS
              </label>

              <input
                id="numeroNisFamiliar"
                type="text"
                inputMode="numeric"
                maxLength={11}
                value={formulario.numeroNisFamiliar}
                onChange={(event) =>
                  atualizarCampo(
                    'numeroNisFamiliar',
                    event.target.value.replace(/\D/g, '')
                  )
                }
              />

              <small>
                Digite somente os 11 números.
              </small>
            </div>
          </div>
        </section>

        {/* DEFICIÊNCIA E SAÚDE */}

        <section className="form-section">
          <h2>5. Deficiência e saúde</h2>

          <div className="form-grid">
            <fieldset className="campo campo-radio">
              <legend>Possui deficiência?</legend>

              <div className="radio-opcoes">
                <label>
                  <input
                    type="radio"
                    name="possuiDeficiencia"
                    checked={
                      formulario.possuiDeficiencia === true
                    }
                    onChange={() =>
                      atualizarCampo(
                        'possuiDeficiencia',
                        true
                      )
                    }
                  />
                  Sim
                </label>

                <label>
                  <input
                    type="radio"
                    name="possuiDeficiencia"
                    checked={
                      formulario.possuiDeficiencia === false
                    }
                    onChange={() =>
                      atualizarCampo(
                        'possuiDeficiencia',
                        false
                      )
                    }
                  />
                  Não
                </label>
              </div>
            </fieldset>

            <div className="campo">
              <label htmlFor="tipoDeficienciaLaudo">
                Tipo de deficiência/Laudo
              </label>

              <input
                id="tipoDeficienciaLaudo"
                type="text"
                maxLength={100}
                value={
                  formulario.tipoDeficienciaLaudo
                }
                onChange={(event) =>
                  atualizarCampo(
                    'tipoDeficienciaLaudo',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo campo-largo">
              <label htmlFor="alergiasDoencasCronicas">
                Alergias/Doenças crônicas
              </label>

              <textarea
                id="alergiasDoencasCronicas"
                rows={4}
                value={
                  formulario.alergiasDoencasCronicas
                }
                onChange={(event) =>
                  atualizarCampo(
                    'alergiasDoencasCronicas',
                    event.target.value
                  )
                }
              />
            </div>

            <div className="campo campo-largo">
              <label htmlFor="medicacaoControladaEventual">
                Medicação controlada/eventual
              </label>

              <textarea
                id="medicacaoControladaEventual"
                rows={4}
                value={
                  formulario.medicacaoControladaEventual
                }
                onChange={(event) =>
                  atualizarCampo(
                    'medicacaoControladaEventual',
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* MENSAGENS */}

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

        {/* BOTÕES */}

        <div className="form-acoes">
          <button
            type="submit"
            disabled={enviando}
          >
            {enviando
              ? 'Cadastrando...'
              : 'Cadastrar familiar'}
          </button>

          <button
            type="button"
            className="botao-secundario"
            onClick={limparFormulario}
            disabled={enviando}
          >
            Limpar formulário
          </button>
        </div>
      </form>
    </div>
  )
}

export default CadastroNucleoFamiliar

