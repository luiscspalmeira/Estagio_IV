
import { useState } from "react";
import { Link } from "react-router-dom";
import Contraste from "./Contraste";

function Navbar() {
  const [cadastroAberto, setCadastroAberto] = useState(false);

  function fecharCadastro() {
    setCadastroAberto(false);
  }

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/" onClick={fecharCadastro}>
          📷 Meu Web Site
        </Link>
      </div>

      <div className="navbar-links">

        <Link to="/" onClick={fecharCadastro}>
          Início
        </Link>

        <Link to="/fotos" onClick={fecharCadastro}>
          Fotos
        </Link>

        <Link to="/sobre" onClick={fecharCadastro}>
          Sobre
        </Link>

        {/* DROPDOWN CADASTRO */}
        <div className="dropdown">

          <button
            type="button"
            className="dropdown-button"
            onClick={() =>
              setCadastroAberto(!cadastroAberto)
            }
            aria-expanded={cadastroAberto}
          >
            Cadastro
            <span className="dropdown-seta">
              {cadastroAberto ? "▲" : "▼"}
            </span>
          </button>

          {cadastroAberto && (
            <div className="dropdown-menu">

              <div className="dropdown-titulo">
                Cadastros
              </div>

              <Link
                to="/cadastro/estudante"
                onClick={fecharCadastro}
              >
                👨‍🎓 Estudante
              </Link>

              <Link
                to="/cadastro/responsavel-legal"
                onClick={fecharCadastro}
              >
                👤 Responsável Legal
              </Link>

              <Link
                to="/cadastro/contato-emergencia"
                onClick={fecharCadastro}
              >
                🚨 Contato de Emergência
              </Link>

              <Link
                to="/cadastro/acompanhante-autorizado"
                onClick={fecharCadastro}
              >
                👥 Acompanhante Autorizado
              </Link>

              <Link
                to="/cadastro/autorizacao-saida"
                onClick={fecharCadastro}
              >
                📋 Autorização de Saída
              </Link>

              <Link
                to="/cadastro/nucleo-familiar"
                onClick={fecharCadastro}
              >
                👨‍👩‍👧 Núcleo Familiar
              </Link>

              <Link
                to="/cadastro/criterio-brasil"
                onClick={fecharCadastro}
              >
                📊 Critério Brasil
              </Link>

              <Link
                to="/cadastro/historico-estudante"
                onClick={fecharCadastro}
              >
                📚 Histórico do Estudante
              </Link>

              <Link
                to="/cadastro/saude-biometria"
                onClick={fecharCadastro}
              >
                🩺 Saúde e Biometria
              </Link>

              <Link
                to="/cadastro/avaliacao-multidisciplinar"
                onClick={fecharCadastro}
              >
                📝 Avaliação Multidisciplinar
              </Link>

              <div className="dropdown-separador" />

              <div className="dropdown-subtitulo">
                Cursos
              </div>

              <Link
                to="/cadastro/curso"
                onClick={fecharCadastro}
              >
                🎓 Curso
              </Link>

              <Link
                to="/cadastro/sala"
                onClick={fecharCadastro}
              >
                🏫 Sala
              </Link>

              <Link
                to="/cadastro/horario-curso"
                onClick={fecharCadastro}
              >
                🕐 Horário do Curso
              </Link>

              <Link
                to="/cadastro/matricula"
                onClick={fecharCadastro}
              >
                📑 Matrícula
              </Link>

              <div className="dropdown-separador" />

              <div className="dropdown-subtitulo">
                Equipe
              </div>

              <Link
                to="/cadastro/equipe"
                onClick={fecharCadastro}
              >
                👥 Cadastro da Equipe
              </Link>

              <Link
                to="/cadastro/curso-docente"
                onClick={fecharCadastro}
              >
                👨‍🏫 Curso e Docente
              </Link>

              <Link
                to="/cadastro/saude-equipe"
                onClick={fecharCadastro}
              >
                🩺 Saúde da Equipe
              </Link>

              <Link
                to="/cadastro/contato-emergencia-equipe"
                onClick={fecharCadastro}
              >
                🚨 Emergência da Equipe
              </Link>

              <Link
                to="/cadastro/certificacao-equipe"
                onClick={fecharCadastro}
              >
                📜 Certificação da Equipe
              </Link>

              <Link
                to="/cadastro/documento-equipe"
                onClick={fecharCadastro}
              >
                📄 Documento da Equipe
              </Link>

              <div className="dropdown-separador" />

              <div className="dropdown-subtitulo">
                Acervo e Espetáculos
              </div>

              <Link
                to="/cadastro/item-acervo-artistico"
                onClick={fecharCadastro}
              >
                🎭 Item do Acervo
              </Link>

              <Link
                to="/cadastro/espetaculo"
                onClick={fecharCadastro}
              >
                🎬 Espetáculo
              </Link>

              <Link
                to="/cadastro/coletivo-companhia"
                onClick={fecharCadastro}
              >
                👥 Coletivo / Companhia
              </Link>

              <Link
                to="/cadastro/espetaculo-coletivo"
                onClick={fecharCadastro}
              >
                🔗 Espetáculo e Coletivo
              </Link>

              <Link
                to="/cadastro/uso-acervo-espetaculo"
                onClick={fecharCadastro}
              >
                🎨 Uso do Acervo
              </Link>

              <Link
                to="/cadastro/visita"
                onClick={fecharCadastro}
              >
                🚪 Visita
              </Link>

              <Link
                to="/cadastro/acervo-audiovisual"
                onClick={fecharCadastro}
              >
                🎥 Acervo Audiovisual
              </Link>

              <div className="dropdown-separador" />

              <div className="dropdown-subtitulo">
                Documentos
              </div>

              <Link
                to="/cadastro/documento"
                onClick={fecharCadastro}
              >
                📄 Documento
              </Link>

              <Link
                to="/cadastro/documento-estudante"
                onClick={fecharCadastro}
              >
                📄 Documento do Estudante
              </Link>

              <Link
                to="/cadastro/documento-familiar"
                onClick={fecharCadastro}
              >
                📄 Documento do Familiar
              </Link>

              <Link
                to="/cadastro/documento-responsavel"
                onClick={fecharCadastro}
              >
                📄 Documento do Responsável
              </Link>
              
         
<button
  type="button"
  className="botao-backup"
  onClick={fazerBackup}
  title="Fazer backup do banco de dados"
>
  <span className="icone-backup" aria-hidden="true">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M7 10L12 15L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5 21H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </span>

  Backup
</button>



            </div>
          )}
        </div>

        <Contraste />

      </div>
    </nav>
  );
}


async function fazerBackup() {
  try {
    const response = await fetch(
      "http://localhost:8080/backup"
    );

    if (!response.ok) {
      throw new Error(
        "Não foi possível gerar o backup."
      );
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const dataHora = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    link.download =
      `backup_principal_${dataHora}.dump`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert(
      "Não foi possível gerar o backup do banco de dados."
    );
  }
}


export default Navbar;

