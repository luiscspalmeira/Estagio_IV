
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'



import Home from './pages/Home'
import Fotos from './pages/Fotos'
import Sobre from './pages/Sobre'
import Cadastro from './pages/Cadastro'
import CadastroEstudante from './pages/CadastroEstudante'
import CadastroResponsavelLegal from './pages/CadastroResponsavelLegal'
import CadastroContatoEmergencia from './pages/CadastroContatoEmergencia'
import CadastroAcompanhanteAutorizado from './pages/CadastroAcompanhanteAutorizado'
import CadastroAutorizacaoSaida from './pages/CadastroAutorizacaoSaida'
import CadastroNucleoFamiliar from './pages/CadastroNucleoFamiliar'
import CadastroCriterioBrasil from "./pages/CadastroCriterioBrasil";
import CadastroHistoricoEstudante from "./pages/CadastroHistoricoEstudante";
import CadastroSaudeBiometria   from "./pages/CadastroSaudeBiometria";
import CadastroAvaliacaoMultidisciplinar   from "./pages/CadastroAvaliacaoMultidisciplinar";
import CadastroCurso from "./pages/CadastroCurso";
import CadastroSala from "./pages/CadastroSala";
import CadastroHorarioCurso from "./pages/CadastroHorarioCurso";
import CadastroMatricula from "./pages/CadastroMatricula";
import CadastroEquipe from "./pages/CadastroEquipe";
import CursoDocente from "./pages/CursoDocente";
import SaudeEquipe from "./pages/SaudeEquipe";
import ContatoEmergenciaEquipe from "./pages/ContatoEmergenciaEquipe";
import CertificacaoEquipe from "./pages/CertificacaoEquipe";
import ItemAcervoArtistico from "./pages/ItemAcervoArtistico";
import Espetaculo from "./pages/Espetaculo";
import ColetivoCompanhia from "./pages/ColetivoCompanhia";
import EspetaculoColetivo from "./pages/EspetaculoColetivo";
import Visita from "./pages/Visita";
import AcervoAudiovisual from "./pages/AcervoAudiovisual";
import Documento from "./pages/Documento";
import DocumentoEstudante from "./pages/DocumentoEstudante";
import DocumentoFamiliar from "./pages/DocumentoFamiliar";
import DocumentoResponsavel from "./pages/DocumentoResponsavel";
import DocumentoEquipe from "./pages/DocumentoEquipe";



function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="conteudo">

        

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/fotos" element={<Fotos />} />

          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/cadastro/estudante"
            element={<CadastroEstudante />}
          />

          <Route 
            path="/cadastro/responsavel-legal"
            element={<CadastroResponsavelLegal />}
          />

          <Route 
            path="/cadastro/contato-emergencia" 
            element={<CadastroContatoEmergencia />} 
          />
         
          <Route
            path="/cadastro/acompanhante-autorizado"
            element={<CadastroAcompanhanteAutorizado />}
          />

          <Route
            path="/cadastro/autorizacao-saida"
            element={<CadastroAutorizacaoSaida />}
          />

          <Route
            path="/cadastro/nucleo-familiar"
            element={<CadastroNucleoFamiliar />}
          />

          <Route
            path="/cadastro/criterio-brasil"
            element={<CadastroCriterioBrasil />}
          />

          <Route
            path="/cadastro/historico-estudante"
            element={<CadastroHistoricoEstudante />}
          />

          <Route
            path="/cadastro/saude-biometria"
            element={<CadastroSaudeBiometria />}
          />

          <Route
            path="/cadastro/avaliacao-multidisciplinar"
            element={<CadastroAvaliacaoMultidisciplinar />}
          />

          <Route
            path="/cadastro/curso"
            element={<CadastroCurso />}
          />

          <Route
            path="/cadastro/sala"
            element={<CadastroSala />}
          />

          <Route
            path="/cadastro/horario-curso"
            element={<CadastroHorarioCurso />}
          />

          <Route
            path="/cadastro/matricula"
            element={<CadastroMatricula />}
          />

          <Route
            path="/cadastro/equipe"
            element={<CadastroEquipe />}
          />
        
          <Route
            path="/cadastro/curso-docente"
            element={<CursoDocente />}
          />

          <Route
            path="/cadastro/saude-equipe"
            element={<SaudeEquipe />}
          />
          
          <Route
            path="/cadastro/contato-emergencia-equipe"
            element={<ContatoEmergenciaEquipe />}
          />

          <Route
            path="/cadastro/certificacao-equipe"
            element={<CertificacaoEquipe />}
          />

          <Route
            path="/cadastro/item-acervo-artistico"
            element={<ItemAcervoArtistico />}
          />

          <Route
            path="/cadastro/espetaculo"
            element={<Espetaculo />}
          />

          <Route
            path="/cadastro/coletivo-companhia"
            element={<ColetivoCompanhia />}
          />

          <Route
            path="/cadastro/espetaculo-coletivo"
            element={<EspetaculoColetivo />}
          />

          <Route
            path="/cadastro/visita"
            element={<Visita />}
          />

          <Route
            path="/cadastro/acervo-audiovisual"
            element={<AcervoAudiovisual />}
          />

          <Route
            path="/cadastro/documento"
            element={<Documento />}
          />

          <Route
            path="/cadastro/documento-estudante"
            element={<DocumentoEstudante />}
          />

          <Route
            path="/cadastro/documento-familiar"
            element={<DocumentoFamiliar />}
          />

          <Route
            path="/cadastro/documento-responsavel"
            element={<DocumentoResponsavel />}
          />

          <Route
            path="/cadastro/documento-equipe"
            element={<DocumentoEquipe />}
          />

          <Route path="/sobre" element={<Sobre />} />

        </Routes>       

      </main>

    </BrowserRouter>
  )
}

export default App
