import { useEffect, useMemo, useState } from 'react'
import './ConsultaEstudantes.css'

type Estudante = Record<string, unknown>

function normalizarTexto(valor: string) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
}

function formatarNomeCampo(campo: string) {
  const nome = campo
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim()

  return nome.charAt(0).toLocaleUpperCase('pt-BR') + nome.slice(1)
}

function formatarValor(valor: unknown): string {
  if (valor === null || valor === undefined || valor === '') {
    return 'Não informado'
  }

  if (typeof valor === 'boolean') {
    return valor ? 'Sim' : 'Não'
  }

  if (typeof valor === 'object') {
    return JSON.stringify(valor, null, 2)
  }

  return String(valor)
}

function obterTextoPesquisa(valor: unknown): string {
  if (valor === null || valor === undefined) {
    return ''
  }

  if (typeof valor === 'object') {
    return JSON.stringify(valor)
  }

  return String(valor)
}

function obterIdentificador(estudante: Estudante, indice: number) {
  const identificador =
    estudante.idAluno ??
    estudante.id_aluno ??
    estudante.id

  return identificador !== null && identificador !== undefined
    ? String(identificador)
    : `registro-${indice}`
}

function ConsultaEstudantes() {
  const [estudantes, setEstudantes] = useState<Estudante[]>([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [estudanteAberto, setEstudanteAberto] = useState<string | null>(null)

  async function carregarEstudantes() {
    setCarregando(true)
    setErro('')

    try {
      const resposta = await fetch(
        'http://localhost:8080/estudantes'
      )

      if (!resposta.ok) {
        throw new Error(
          `Não foi possível carregar os estudantes. Código HTTP: ${resposta.status}.`
        )
      }

      const dados: unknown = await resposta.json()

      if (!Array.isArray(dados)) {
        throw new Error(
          'A resposta do servidor não contém uma lista de estudantes.'
        )
      }

      setEstudantes(dados as Estudante[])
      setEstudanteAberto(null)
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro inesperado ao carregar os estudantes.'
      )
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    void carregarEstudantes()
  }, [])

  const estudantesFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca.trim())

    if (!termo) {
      return estudantes.map((estudante, indice) => ({
        estudante,
        chave: obterIdentificador(estudante, indice),
      }))
    }

    return estudantes
      .map((estudante, indice) => ({
        estudante,
        chave: obterIdentificador(estudante, indice),
      }))
      .filter(({ estudante }) => {
        const conteudo = Object.entries(estudante)
          .map(([campo, valor]) => `${campo} ${obterTextoPesquisa(valor)}`)
          .join(' ')

        return normalizarTexto(conteudo).includes(termo)
      })
  }, [estudantes, busca])

  return (
    <section className="consulta-estudantes">
      <header className="consulta-estudantes-cabecalho">
        <h1>Consulta de Estudantes</h1>

        <p>
          Consulte os estudantes cadastrados e visualize os dados
          disponibilizados pelo sistema.
        </p>
      </header>

      <div className="consulta-estudantes-pesquisa">
        <label htmlFor="busca-estudante">
          Pesquisar estudante
        </label>

        <input
          id="busca-estudante"
          type="search"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          placeholder="Digite um nome, CPF, identificador ou outro dado..."
          aria-describedby="ajuda-busca-estudante"
        />

        <small id="ajuda-busca-estudante">
          A pesquisa considera os campos retornados pela API.
        </small>
      </div>

      <div className="consulta-estudantes-acoes">
        <p aria-live="polite">
          {carregando
            ? 'Carregando estudantes...'
            : `${estudantesFiltrados.length} estudante(s) encontrado(s).`}
        </p>

        <button
          type="button"
          className="consulta-estudantes-botao"
          onClick={() => void carregarEstudantes()}
          disabled={carregando}
        >
          {carregando ? 'Atualizando...' : 'Atualizar lista'}
        </button>
      </div>

      {erro && (
        <div className="consulta-estudantes-erro" role="alert">
          <p>{erro}</p>

          <button
            type="button"
            className="consulta-estudantes-botao"
            onClick={() => void carregarEstudantes()}
            disabled={carregando}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && estudantes.length === 0 && (
        <div className="consulta-estudantes-vazio">
          <h2>Nenhum estudante cadastrado</h2>
          <p>
            Quando houver estudantes cadastrados, eles aparecerão nesta página.
          </p>
        </div>
      )}

      {!carregando &&
        !erro &&
        estudantes.length > 0 &&
        estudantesFiltrados.length === 0 && (
          <div className="consulta-estudantes-vazio">
            <h2>Nenhum resultado encontrado</h2>
            <p>
              Verifique o texto digitado ou tente pesquisar por outro dado.
            </p>
          </div>
        )}

      {!carregando && !erro && estudantesFiltrados.length > 0 && (
        <div className="consulta-estudantes-lista">
          {estudantesFiltrados.map(({ estudante, chave }) => {
            const nome =
              estudante.nomeCompleto ??
              estudante.nome_completo ??
              estudante.nome ??
              'Nome não informado'

            const nomeSocial =
              estudante.nomeSocial ??
              estudante.nome_social

            const aberto = estudanteAberto === chave

            return (
              <article
                className="consulta-estudante-card"
                key={chave}
              >
                <div className="consulta-estudante-resumo">
                  <div className="consulta-estudante-identificacao">
                    <h2>{formatarValor(nome)}</h2>

                    {nomeSocial !== null &&
                      nomeSocial !== undefined &&
                      nomeSocial !== '' && (
                        <p>
                          <strong>Nome social:</strong>{' '}
                          {formatarValor(nomeSocial)}
                        </p>
                      )}

                    <p>
                      <strong>Identificador:</strong> {chave}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="consulta-estudantes-botao"
                    aria-expanded={aberto}
                    onClick={() =>
                      setEstudanteAberto(aberto ? null : chave)
                    }
                  >
                    {aberto ? 'Ocultar detalhes' : 'Ver todos os dados'}
                  </button>
                </div>

                {aberto && (
                  <div className="consulta-estudante-detalhes">
                    <h3>Informações do estudante</h3>

                    <dl className="consulta-estudante-campos">
                      {Object.entries(estudante).map(([campo, valor]) => (
                        <div
                          className="consulta-estudante-campo"
                          key={campo}
                        >
                          <dt>{formatarNomeCampo(campo)}</dt>
                          <dd>
                            {formatarValor(valor)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ConsultaEstudantes