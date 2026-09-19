import heroImg from '../assets/danca.png'

function Home() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        textAlign: 'center',
        overflow: 'hidden',
        color: '#070404', // Garante que o texto fique visível sobre a imagem
      }}
    >
      {/* Imagem de fundo */}
      <img 
        src={heroImg} 
        alt="Dança" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, // Envia a imagem para trás do texto
        }}
      />
      
      <h1>Bem-vindo!</h1>
    </div>
  )
}

export default Home


