import { useEffect, useMemo, useState } from 'react'
import './ConsultaEstudantes.css'

const API = 'http://localhost:8080'

type Registro = Record<string, unknown>
type Estudante = Registro

type Documento = {
  idDocumento: string
  tipoDocumento: string
  linkArquivo: string
}

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

function obterCampo(
  registro: Registro,
  ...nomes: string[]
): unknown {
  for (const nome of nomes) {
    if (registro[nome] !== undefined && registro[nome] !== null) {
      return registro[nome]
    }
  }

  return undefined
}

function obterIdentificador(estudante: Estudante, indice: number) {
  const identificador = obterCampo(
    estudante,
    'idAluno',
    'id_aluno',
    'id'
  )

  return identificador !== undefined
    ? String(identificador)
    : `registro-${indice}`
}

function obterIdentificadorDocumento(
  documento: Registro
): string {
  const id = obterCampo(
    documento,
    'idDocumento',
    'id_documento'
  )

  return id === undefined ? '' : String(id)
}

function obterIdentificadorAluno(
  vinculo: Registro
): string {
  // Na entidade DocumentoEstudante, os IDs ficam dentro de "id".
  const idComposto = vinculo.id

  if (idComposto && typeof idComposto === 'object') {
    const composto = idComposto as Registro

    const idAluno = obterCampo(
      composto,
      'idAluno',
      'id_aluno'
    )

    if (idAluno !== undefined) {
      return String(idAluno)
    }
  }

  const idAluno = obterCampo(
    vinculo,
    'idAluno',
    'id_aluno'
  )

  return idAluno === undefined ? '' : String(idAluno)
}

function obterDocumentoDoVinculo(
  vinculo: Registro
): string {
  const idComposto = vinculo.id

  if (idComposto && typeof idComposto === 'object') {
    const composto = idComposto as Registro

    const idDocumento = obterCampo(
      composto,
      'idDocumento',
      'id_documento'
    )

    if (idDocumento !== undefined) {
      return String(idDocumento)
    }
  }

  const idDocumento = obterCampo(
    vinculo,
    'idDocumento',
    'id_documento'
  )

  return idDocumento === undefined
    ? ''
    : String(idDocumento)
}

function obterEnderecoFoto(link: string): string {
  if (/^https?:\/\//i.test(link)) {
    return link
  }

  return `${API}${link.startsWith('/') ? '' : '/'}${link}`
}

function FotoEstudante({
  src,
  nome,
}: {
  src?: string
  nome: string
}) {
  const [erroImagem, setErroImagem] = useState(false)

  useEffect(() => {
    setErroImagem(false)
  }, [src])

  if (!src || erroImagem) {
    return (
      <div
        className="consulta-estudante-foto consulta-estudante-foto-alternativa"
        role="img"
        aria-label={`Foto não disponível para ${nome}`}
      >
        <span aria-hidden="true">👤</span>
        <span>Foto não disponível</span>
      </div>
    )
  }

  return (
    <img
      className="consulta-estudante-foto"
      src={src}
      alt={`Foto de ${nome}`}
      loading="lazy"
      onError={() => setErroImagem(true)}
    />
  )
}

function ConsultaEstudantes() {
  const [estudantes, setEstudantes] = useState<Estudante[]>([])
  const [fotosPorAluno, setFotosPorAluno] =
    useState<Record<string, string>>({})
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [estudanteAberto, setEstudanteAberto] =
    useState<string | null>(null)

  async function carregarFotos(): Promise<Record<string, string>> {
    try {
      const [respostaDocumentos, respostaVinculos] =
        await Promise.all([
          fetch(
            `${API}/documentos/tipo/Foto%20do%20estudante`
          ),
          fetch(`${API}/documentos-estudantes`),
        ])

      if (!respostaDocumentos.ok || !respostaVinculos.ok) {
        console.warn(
          'Não foi possível consultar todos os documentos das fotos.'
        )
        return {}
      }

      const dadosDocumentos: unknown =
        await respostaDocumentos.json()
      const dadosVinculos: unknown =
        await respostaVinculos.json()

      if (
        !Array.isArray(dadosDocumentos) ||
        !Array.isArray(dadosVinculos)
      ) {
        return {}
      }

      const documentos = dadosDocumentos as Registro[]
      const vinculos = dadosVinculos as Registro[]

      const documentosPorId = new Map<string, Documento>()

      for (const registro of documentos) {
        const idDocumento = obterIdentificadorDocumento(registro)
        const tipoDocumento = String(
          obterCampo(
            registro,
            'tipoDocumento',
            'tipo_documento'
          ) ?? ''
        )

        const linkArquivo = obterCampo(
          registro,
          'linkArquivo',
          'link_arquivo'
        )

        if (
          idDocumento &&
          normalizarTexto(tipoDocumento) ===
            normalizarTexto('Foto do estudante') &&
          typeof linkArquivo === 'string' &&
          linkArquivo.trim() !== ''
        ) {
          documentosPorId.set(idDocumento, {
            idDocumento,
            tipoDocumento,
            linkArquivo,
          })
        }
      }

      const fotos: Record<string, string> = {}

      for (const vinculo of vinculos) {
        const idAluno = obterIdentificadorAluno(vinculo)
        const idDocumento = obterDocumentoDoVinculo(vinculo)
        const documento = documentosPorId.get(idDocumento)

        if (
          idAluno &&
          documento &&
          !fotos[idAluno]
        ) {
          fotos[idAluno] = obterEnderecoFoto(
            documento.linkArquivo
          )
        }
      }

      return fotos
    } catch (error) {
      console.error('Erro ao consultar fotos dos estudantes:', error)
      return {}
    }
  }

  async function carregarEstudantes() {
    setCarregando(true)
    setErro('')

    try {
      const resposta = await fetch(`${API}/estudantes`)

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

      const fotos = await carregarFotos()
      setFotosPorAluno(fotos)
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

    const lista = estudantes.map((estudante, indice) => ({
      estudante,
      chave: obterIdentificador(estudante, indice),
    }))

    if (!termo) {
      return lista
    }

    return lista.filter(({ estudante }) => {
      const conteudo = Object.entries(estudante)
        .map(
          ([campo, valor]) =>
            `${campo} ${obterTextoPesquisa(valor)}`
        )
        .join(' ')

      return normalizarTexto(conteudo).includes(termo)
    })
  }, [estudantes, busca])

  return (
    <section className="consulta-estudantes">
      <header className="consulta-estudantes-cabecalho">
        <h1>Consulta de Estudantes</h1>

        <p>
          Consulte os estudantes cadastrados e visualize seus
          dados e fotografias.
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
            Quando houver estudantes cadastrados, eles aparecerão
            nesta página.
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
              Verifique o texto digitado ou tente pesquisar por
              outro dado.
            </p>
          </div>
        )}

      {!carregando && !erro && estudantesFiltrados.length > 0 && (
        <div className="consulta-estudantes-lista">
          {estudantesFiltrados.map(({ estudante, chave }) => {
            const nome = String(
              obterCampo(
                estudante,
                'nomeCompleto',
                'nome_completo',
                'nome'
              ) ?? 'Nome não informado'
            )

            const nomeSocial = obterCampo(
              estudante,
              'nomeSocial',
              'nome_social'
            )

            const foto = fotosPorAluno[chave]
            const aberto = estudanteAberto === chave

            return (
              <article
                className="consulta-estudante-card"
                key={chave}
              >
                <div className="consulta-estudante-resumo">
                  <FotoEstudante src={foto} nome={nome} />

                  <div className="consulta-estudante-identificacao">
                    <h2>{nome}</h2>

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
                      {Object.entries(estudante).map(
                        ([campo, valor]) => (
                          <div
                            className="consulta-estudante-campo"
                            key={campo}
                          >
                            <dt>{formatarNomeCampo(campo)}</dt>
                            <dd>{formatarValor(valor)}</dd>
                          </div>
                        )
                      )}
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