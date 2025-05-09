const App = () => {
  return (
    <div className="login-container">
      <h1>MediAgenda</h1>

      <form action="#" className="login-form">
        <h3>Entrar</h3>

        <div className="input-wrapper">
          <label htmlFor="email">E-mail:</label>
          <input type="email" placeholder="usuario@exemplo.com" className="input-field" name="email" required />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Senha:</label>
          <input type="password" placeholder="••••••" className="input-field" name="password" required />
        </div>

        <input type="submit" value="Login" className="submit-btn" />
        <a href="#" className="forgot-pass-link">Esqueci minha senha</a>
      </form>
    </div>
  )
}

export default App