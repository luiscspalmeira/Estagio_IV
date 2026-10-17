
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";
import Contraste from "./Contraste";

function Navbar() {

  const [cadastroAberto, setCadastroAberto] =
    useState(false);

  const [consultaAberta, setConsultaAberta] =
  useState(false);

  const [restaurando, setRestaurando] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const consultaDropdownRef =
    useRef<HTMLDivElement>(null);

  /*
   * Fecha o dropdown quando o usuário
   * clica fora dele.
   */
  useEffect(() => {

    function fecharAoClicarFora(
      event: MouseEvent
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
      )
    ) {
        setCadastroAberto(false);
      }

      if (
        consultaDropdownRef.current &&
        !consultaDropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setConsultaAberta(false);
      }
    }

    document.addEventListener(
      "mousedown",
      fecharAoClicarFora
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        fecharAoClicarFora
      );

    };

  }, []);


  /*
   * Backup do banco de dados.
   */
  async function fazerBackup() {

    /*
     * Fecha o menu Cadastro antes
     * de iniciar o backup.
     */
    setCadastroAberto(false);

    try {

      const response = await fetch(
        "http://localhost:8080/backup"
      );

      if (!response.ok) {

        throw new Error(
          "Não foi possível gerar o backup."
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      const dataHora =
        new Date()
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
        "Não foi possível gerar o backup " +
        "do banco de dados."
      );
    }
  }


  /*
   * Restore do banco de dados.
   */
  async function restaurarBanco(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    /*
     * Fecha o dropdown Cadastro.
     */
    setCadastroAberto(false);

    const arquivo =
      event.target.files?.[0];

    if (!arquivo) {

      return;
    }


    /*
     * Verifica a extensão.
     */
    if (
      !arquivo.name
        .toLowerCase()
        .endsWith(".dump")
    ) {

      alert(
        "Selecione um arquivo de backup " +
        "com extensão .dump."
      );

      event.target.value = "";

      return;
    }


    /*
     * Confirmação antes do restore.
     */
    const confirmar =
      window.confirm(
        "ATENÇÃO!\n\n" +
        "O restore irá substituir os " +
        "dados atuais pelos dados existentes " +
        "no arquivo de backup.\n\n" +
        "Você deseja realmente continuar?"
      );


    if (!confirmar) {

      event.target.value = "";

      return;
    }


    try {

      setRestaurando(true);


      const formulario =
        new FormData();

      formulario.append(
        "arquivo",
        arquivo
      );


      const response =
        await fetch(
          "http://localhost:8080/backup/restore",
          {
            method: "POST",
            body: formulario,
          }
        );


      const mensagem =
        await response.text();


      if (!response.ok) {

        throw new Error(
          mensagem
        );
      }


      alert(
        "Banco de dados restaurado " +
        "com sucesso!\n\n" +
        "A página será atualizada."
      );


      window.location.reload();


    } catch (error) {

      console.error(error);

      alert(
        "Erro ao restaurar o banco " +
        "de dados:\n\n" +
        (
          error instanceof Error
            ? error.message
            : "Erro desconhecido."
        )
      );


    } finally {

      setRestaurando(false);

      event.target.value = "";
    }
  }


  /*
   * Fecha o dropdown quando um link
   * do menu principal é selecionado.
   */
  function fecharCadastro() {
    setCadastroAberto(false);
    setConsultaAberta(false);
  }

  function fecharConsulta() {
    setConsultaAberta(false);
    setCadastroAberto(false);
  }


  return (

    <nav className="navbar">

      {/* ========================= */}
      {/* LOGO */}
      {/* ========================= */}

      <div className="navbar-logo">

        <Link
          to="/"
          onClick={fecharCadastro}
        >
          📷 Meu Web Site
        </Link>

      </div>


      {/* ========================= */}
      {/* MENU PRINCIPAL */}
      {/* ========================= */}

      <div className="navbar-links">


        {/* INÍCIO */}

        <Link
          to="/"
          onClick={fecharCadastro}
        >
          Início
        </Link>


        {/* FOTOS */}

        <Link
          to="/fotos"
          onClick={fecharCadastro}
        >
          Fotos
        </Link>


        {/* SOBRE */}

        <Link
          to="/sobre"
          onClick={fecharCadastro}
        >
          Sobre
        </Link>


        {/* ========================= */}
        {/* CADASTRO */}
        {/* ========================= */}

        <div
          className="dropdown"
          ref={dropdownRef}
        >

          <button
            type="button"
            className="dropdown-button"
            onClick={() =>
              setCadastroAberto(
                !cadastroAberto
              )
            }
            aria-expanded={
              cadastroAberto
            }
            aria-haspopup="true"
          >

            Cadastro

            <span
              className={
                cadastroAberto
                  ? "dropdown-seta aberta"
                  : "dropdown-seta"
              }
            >
              ▼
            </span>

          </button>


          {/* ========================= */}
          {/* DROPDOWN */}
          {/* ========================= */}

          {cadastroAberto && (

            <div
              className="dropdown-menu"
            >


              {/* ========================= */}
              {/* CADASTROS */}
              {/* ========================= */}

              <div
                className="dropdown-section"
              >

                <div
                  className="dropdown-title"
                >
                  Cadastros
                </div>


                <Link
                  to="/cadastro/estudante"
                  onClick={fecharCadastro}
                >
                  👨‍🎓 Cadastro de Estudante
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
                  📄 Autorização de Saída
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
                  🔎 Avaliação Multidisciplinar
                </Link>

              </div>


              {/* ========================= */}
              {/* CURSOS */}
              {/* ========================= */}

              <div
                className="dropdown-section"
              >

                <div
                  className="dropdown-title"
                >
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
                  📝 Matrícula
                </Link>

              </div>


              {/* ========================= */}
              {/* EQUIPE */}
              {/* ========================= */}

              <div
                className="dropdown-section"
              >

                <div
                  className="dropdown-title"
                >
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
                  🚨 Contato de Emergência da Equipe
                </Link>


                <Link
                  to="/cadastro/certificacao-equipe"
                  onClick={fecharCadastro}
                >
                  📜 Certificação da Equipe
                </Link>

              </div>


              {/* ========================= */}
              {/* ACERVO E ESPETÁCULOS */}
              {/* ========================= */}

              <div
                className="dropdown-section"
              >

                <div
                  className="dropdown-title"
                >
                  Acervo e Espetáculos
                </div>


                <Link
                  to="/cadastro/item-acervo-artistico"
                  onClick={fecharCadastro}
                >
                  🎨 Item do Acervo Artístico
                </Link>


                <Link
                  to="/cadastro/espetaculo"
                  onClick={fecharCadastro}
                >
                  🎭 Espetáculo
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
                  🎭 Espetáculo e Coletivo
                </Link>


                <Link
                  to="/cadastro/uso-acervo-espetaculo"
                  onClick={fecharCadastro}
                >
                  🎬 Uso do Acervo em Espetáculos
                </Link>


                <Link
                  to="/cadastro/visita"
                  onClick={fecharCadastro}
                >
                  🏛️ Visita
                </Link>


                <Link
                  to="/cadastro/acervo-audiovisual"
                  onClick={fecharCadastro}
                >
                  🎥 Acervo Audiovisual
                </Link>

              </div>


              {/* ========================= */}
              {/* DOCUMENTOS */}
              {/* ========================= */}

              <div
                className="dropdown-section"
              >

                <div
                  className="dropdown-title"
                >
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


                <Link
                  to="/cadastro/documento-equipe"
                  onClick={fecharCadastro}
                >
                  📄 Documento da Equipe
                </Link>

              </div>

            </div>

          )}

        </div>
        
                {/* ========================= */}
        {/* MENU CONSULTA */}
        {/* ========================= */}

        <div
          className="dropdown"
          ref={consultaDropdownRef}
        >
          <button
            type="button"
            className="dropdown-button"
            onClick={() => {
              setConsultaAberta(!consultaAberta);
              setCadastroAberto(false);
            }}
            aria-expanded={consultaAberta}
            aria-haspopup="true"
          >
            Consulta

            <span
              className={
                consultaAberta
                  ? "dropdown-seta aberta"
                  : "dropdown-seta"
              }
            >
              ▼
            </span>
          </button>

          {consultaAberta && (
            <div className="dropdown-menu">
              <div className="dropdown-section">
                <div className="dropdown-title">
                  Consultas
                </div>

                <Link
                  to="/consulta/estudantes"
                  onClick={fecharConsulta}
                >
                  👨‍🎓 Consulta de Estudantes
                </Link>

                <Link
                  to="/consulta/acervo-espetaculos"
                  onClick={fecharConsulta}
                >
                  🎭 Consulta de Acervo e Espetáculos
                </Link>

                <Link
                  to="/consulta/cursos"
                  onClick={fecharConsulta}
                >
                  🎓 Consulta de Cursos
                </Link>

                <Link
                  to="/consulta/equipe"
                  onClick={fecharConsulta}
                >
                  👥 Consulta de Equipe
                </Link>

                <Link
                  to="/consulta/documentos"
                  onClick={fecharConsulta}
                >
                  📄 Consulta de Documentos
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* BACKUP */}
        {/* ========================= */}

        <button
          type="button"
          className="botao-backup"
          onClick={fazerBackup}
          title="Fazer backup do banco de dados"
        >

          <span
            className="icone-backup"
            aria-hidden="true"
          >

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


        {/* ========================= */}
        {/* RESTORE */}
        {/* ========================= */}

        <label
          className="botao-restore"
          title="Restaurar banco de dados"
        >

          <span
            className="icone-restore"
            aria-hidden="true"
          >

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


          {restaurando
            ? "Restaurando..."
            : "Restore"}


          <input
            type="file"
            accept=".dump"
            onChange={restaurarBanco}
            disabled={restaurando}
            style={{
              display: "none",
            }}
          />

        </label>


        {/* ========================= */}
        {/* CONTRASTE */}
        {/* ========================= */}

        <Contraste />

      </div>

    </nav>
  );
}

export default Navbar;
