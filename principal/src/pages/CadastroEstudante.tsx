
import { useState } from 'react'
import './CadastroEstudante.css'

function CadastroEstudante() {

  const [nomeCompleto, setNomeCompleto] = useState('')
  const [nomeSocial, setNomeSocial] = useState('')
  const [cpf, setCpf] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [localNascimentoNaturalidade, setLocalNascimentoNaturalidade] = useState('')
  const [corRaca, setCorRaca] = useState('')
  const [genero, setGenero] = useState('')
  const [cep, setCep] = useState('')
  const [enderecoCompleto, setEnderecoCompleto] = useState('')
  const [cidadeOndeReside, setCidadeOndeReside] = useState('')
  const [escolaRegularOndeEstuda, setEscolaRegularOndeEstuda] = useState('')
  const [serieAnoEscolaRegular, setSerieAnoEscolaRegular] = useState('')
  const [cadastroUnico, setCadastroUnico] = useState(false)
  const [numeroNis, setNumeroNis] = useState('')
  const [telefoneEstudante, setTelefoneEstudante] = useState('')
  const [emailEstudante, setEmailEstudante] = useState('')
  const [totalPessoasNucleoFamiliar, setTotalPessoasNucleoFamiliar] = useState('')

  const [mensagem, setMensagem] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setMensagem('Cadastrando estudante...')

    try {

      const resposta = await fetch(
        'http://localhost:8080/estudantes',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            nomeCompleto,
            nomeSocial: nomeSocial || null,
            cpf,
            dataNascimento,
            localNascimentoNaturalidade:
              localNascimentoNaturalidade || null,
            corRaca: corRaca || null,
            genero: genero || null,
            cep: cep || null,
            enderecoCompleto: enderecoCompleto || null,
            cidadeOndeReside: cidadeOndeReside || null,
            escolaRegularOndeEstuda:
              escolaRegularOndeEstuda || null,
            serieAnoEscolaRegular:
              serieAnoEscolaRegular || null,
            cadastroUnico,
            numeroNis: numeroNis || null,
            telefoneEstudante:
              telefoneEstudante || null,
            emailEstudante:
              emailEstudante || null,
            totalPessoasNucleoFamiliar:
              totalPessoasNucleoFamiliar
                ? Number(totalPessoasNucleoFamiliar)
                : null
          })
        }
      )

      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar estudante.')
      }

      const estudante = await resposta.json()

      console.log('Estudante cadastrado:', estudante)

      setMensagem(
        `Estudante cadastrado com sucesso! ID: ${estudante.idAluno}`
      )

      setNomeCompleto('')
      setNomeSocial('')
      setCpf('')
      setDataNascimento('')
      setLocalNascimentoNaturalidade('')
      setCorRaca('')
      setGenero('')
      setCep('')
      setEnderecoCompleto('')
      setCidadeOndeReside('')
      setEscolaRegularOndeEstuda('')
      setSerieAnoEscolaRegular('')
      setCadastroUnico(false)
      setNumeroNis('')
      setTelefoneEstudante('')
      setEmailEstudante('')
      setTotalPessoasNucleoFamiliar('')

    } catch (error) {

      console.error(error)

      setMensagem(
        'Não foi possível cadastrar o estudante.'
      )
    }
  }

  return (
    <div className="cadastro-estudante-container">

      <h1>Cadastro de Estudante</h1>

      <p>
        Preencha os dados do estudante.
      </p>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="nomeCompleto">
            Nome completo
          </label>

          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            maxLength={150}
            required
          />
        </div>

        <div>
          <label htmlFor="nomeSocial">
            Nome social
          </label>

          <input
            type="text"
            id="nomeSocial"
            name="nomeSocial"
            value={nomeSocial}
            onChange={(e) => setNomeSocial(e.target.value)}
            maxLength={150}
          />
        </div>

        <div>
          <label htmlFor="cpf">
            CPF
          </label>

          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={11}
            inputMode="numeric"
            required
          />
        </div>

        <div>
          <label htmlFor="dataNascimento">
            Data de nascimento
          </label>

          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="localNascimentoNaturalidade">
            Local de nascimento / Naturalidade
          </label>

          <input
            type="text"
            id="localNascimentoNaturalidade"
            name="localNascimentoNaturalidade"
            value={localNascimentoNaturalidade}
            onChange={(e) =>
              setLocalNascimentoNaturalidade(e.target.value)
            }
            maxLength={150}
          />
        </div>

      
<div>
  <label htmlFor="corRaca">
    Cor / Raça
  </label>

  <select
    id="corRaca"
    name="corRaca"
    value={corRaca}
    onChange={(e) => setCorRaca(e.target.value)}
  >
    <option value="">
      Selecione
    </option>

    <option value="Branca">
      Branca
    </option>

    <option value="Preta">
      Preta
    </option>

    <option value="Parda">
      Parda
    </option>

    <option value="Amarela">
      Amarela
    </option>

    <option value="Indígena">
      Indígena
    </option>
  </select>
</div>



      
<div>
  <label htmlFor="genero">
    Gênero
  </label>

  <select
    id="genero"
    name="genero"
    value={genero}
    onChange={(e) => setGenero(e.target.value)}
  >
    <option value="">
      Selecione
    </option>

    <option value="Mulher">
      Mulher
    </option>

    <option value="Mulher trans">
      Mulher trans
    </option>

    <option value="Homem">
      Homem
    </option>

    <option value="Homem trans">
      Homem trans
    </option>

    <option value="Travesti">
      Travesti
    </option>

    <option value="Não binário">
      Não binário
    </option>
  </select>
</div>


        <div>
          <label htmlFor="cep">
            CEP
          </label>

          <input
            type="text"
            id="cep"
            name="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            maxLength={8}
            inputMode="numeric"
          />
        </div>

        <div>
          <label htmlFor="enderecoCompleto">
            Endereço completo
          </label>

          <input
            type="text"
            id="enderecoCompleto"
            name="enderecoCompleto"
            value={enderecoCompleto}
            onChange={(e) => setEnderecoCompleto(e.target.value)}
            maxLength={250}
          />
        </div>

        <div>
          <label htmlFor="cidadeOndeReside">
            Cidade onde reside
          </label>

          <input
            type="text"
            id="cidadeOndeReside"
            name="cidadeOndeReside"
            value={cidadeOndeReside}
            onChange={(e) => setCidadeOndeReside(e.target.value)}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="escolaRegularOndeEstuda">
            Escola regular onde estuda
          </label>

          <input
            type="text"
            id="escolaRegularOndeEstuda"
            name="escolaRegularOndeEstuda"
            value={escolaRegularOndeEstuda}
            onChange={(e) =>
              setEscolaRegularOndeEstuda(e.target.value)
            }
            maxLength={200}
          />
        </div>

        <div>
          <label htmlFor="serieAnoEscolaRegular">
            Série / Ano da escola regular
          </label>

          <input
            type="text"
            id="serieAnoEscolaRegular"
            name="serieAnoEscolaRegular"
            value={serieAnoEscolaRegular}
            onChange={(e) =>
              setSerieAnoEscolaRegular(e.target.value)
            }
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="cadastroUnico">
            Possui Cadastro Único?
          </label>

          <select
            id="cadastroUnico"
            name="cadastroUnico"
            value={cadastroUnico ? 'true' : 'false'}
            onChange={(e) =>
              setCadastroUnico(e.target.value === 'true')
            }
          >
            <option value="false">
              Não
            </option>

            <option value="true">
              Sim
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="numeroNis">
            Número do NIS
          </label>

          <input
            type="text"
            id="numeroNis"
            name="numeroNis"
            value={numeroNis}
            onChange={(e) => setNumeroNis(e.target.value)}
            maxLength={11}
            inputMode="numeric"
          />
        </div>

        <div>
          <label htmlFor="telefoneEstudante">
            Telefone
          </label>

          <input
            type="tel"
            id="telefoneEstudante"
            name="telefoneEstudante"
            value={telefoneEstudante}
            onChange={(e) =>
              setTelefoneEstudante(e.target.value)
            }
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="emailEstudante">
            E-mail
          </label>

          <input
            type="email"
            id="emailEstudante"
            name="emailEstudante"
            value={emailEstudante}
            onChange={(e) =>
              setEmailEstudante(e.target.value)
            }
            maxLength={150}
          />
        </div>

        <div>
          <label htmlFor="totalPessoasNucleoFamiliar">
            Total de pessoas no núcleo familiar
          </label>

          <input
            type="number"
            id="totalPessoasNucleoFamiliar"
            name="totalPessoasNucleoFamiliar"
            value={totalPessoasNucleoFamiliar}
            onChange={(e) =>
              setTotalPessoasNucleoFamiliar(e.target.value)
            }
            min={1}
          />
        </div>

        <button type="submit">
          Cadastrar estudante
        </button>

      </form>

      {mensagem && (
        <p>
          {mensagem}
        </p>
      )}

    </div>
  )
}

export default CadastroEstudante

