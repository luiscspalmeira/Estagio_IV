
import { Link } from 'react-router-dom'
import './Cadastro.css'


function Cadastro() {
  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>

      <p>
        Área de cadastro da instituição.
      </p>

      <div className="cadastro-opcoes">
        <Link to="/cadastro/estudante">
          <button>Cadastro de Estudante</button>
        </Link>

        
      <Link to="/cadastro/responsavel-legal">
        <button>
          Cadastro de Responsável Legal
        </button>
      </Link>

      <Link to="/cadastro/contato-emergencia"> 
        <button> 
          Cadastro de Contato de Emergência 
        </button> 
      </Link>

      
      <Link to="/cadastro/acompanhante-autorizado">
        <button>
          Cadastro de Acompanhante Autorizado
        </button>
      </Link>

      <Link to="/cadastro/autorizacao-saida">
        <button>
          Cadastro de Autorização de Saída
        </button>
      </Link>

      <Link to="/cadastro/nucleo-familiar">
        <button>Cadastro do Núcleo Familiar</button>
      </Link>

      <Link to="/cadastro/criterio-brasil">
        <button>Cadastro do Critério Brasil</button>
      </Link>

      <Link to="/cadastro/historico-estudante">
        <button>
          Cadastro do Histórico do Estudante
        </button>
      </Link>

      <Link to="/cadastro/saude-biometria">
        <button>
          Cadastro de Saúde e Biometria
        </button>
      </Link>

      <Link to="/cadastro/avaliacao-multidisciplinar">
        <button>
          Cadastro de Avaliação Multidisciplinar
        </button>
      </Link>

      <Link to="/cadastro/curso">
        <button>
          Cadastro de Curso
        </button>
      </Link>

      <Link to="/cadastro/sala">
        <button>
          Cadastro de Sala
        </button>
      </Link>

      <Link to="/cadastro/horario-curso">
        <button>
          Cadastro de Horário do Curso
        </button>
      </Link>

      <Link to="/cadastro/matricula">
        <button>
          Cadastro de Matrícula
        </button>
      </Link>
       
      <Link to="/cadastro/equipe">
        <button>
          Cadastro da Equipe
        </button>
      </Link>

      <Link to="/cadastro/curso-docente">
        <button>
          Curso x Docente
        </button>
      </Link>

      <Link to="/cadastro/saude-equipe">
        <button>
          Saúde da Equipe
        </button>
      </Link>

      <Link to="/cadastro/contato-emergencia-equipe">
        <button>
          Contato de Emergência da Equipe
        </button>
      </Link>

      <Link to="/cadastro/certificacao-equipe">
        <button>
          Certificação da Equipe
        </button>
      </Link>

      <Link to="/cadastro/item-acervo-artistico">
        <button>
          Item do Acervo Artístico
        </button>
      </Link>

      <Link to="/cadastro/espetaculo">
        <button>
          Espetáculo
        </button>
      </Link>

      <Link to="/cadastro/coletivo-companhia">
        <button>
          Coletivo / Companhia
        </button>
      </Link>

      <Link to="/cadastro/espetaculo-coletivo">
        <button>
          Espetáculo x Coletivo / Companhia
        </button>
      </Link>

      <Link to="/cadastro/visita">
        <button>          
          Visitas
        </button>
      </Link>

      <Link to="/cadastro/acervo-audiovisual">
        <button>
          Acervo Audiovisual
        </button>
      </Link>

      <Link to="/cadastro/documento">
        <button>
          Documentos
        </button>
      </Link>

      <Link to="/cadastro/documento-estudante">
        <button>
          Documento do Estudante
        </button>
      </Link>

      <Link to="/cadastro/documento-familiar">
        <button>
          Documento do Familiar
        </button>
      </Link>

      <Link to="/cadastro/documento-responsavel">
        <button>
          Documento de Responsável
        </button>
      </Link>

      <Link to="/cadastro/documento-equipe">
        <button>
          Documento da Equipe
        </button>
      </Link>

      </div>
    </div>
  )
}

export default Cadastro



