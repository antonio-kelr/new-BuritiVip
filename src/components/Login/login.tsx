import React, { useRef, useState, useEffect } from "react";
import { usuarios } from "../../servers/apiAxio";
import { useNavigate } from "react-router-dom";
import { Messages } from "primereact/messages";
import { jwtDecode } from "jwt-decode";
import Img_selva from "../../img/neve.jpg";
import "./login.css"; // Importando o CSS
import 'aos/dist/aos.css';
import AOS from 'aos';


interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const messagesRef = useRef<Messages>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    try {
      const resposta = await usuarios.login({ email, senha });
      const accessToken = resposta.data.accessToken;
      const userId = resposta.data.userId;

      if (accessToken) {
        // Armazena o token e o userId no localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", userId);
        onLogin();
        navigate("/admin");

        if (messagesRef.current) {
          messagesRef.current.show({
            severity: "success",
            summary: "Success",
            detail: "Login feito com sucesso",
            life: 3000,
          });
        }

      } else {
        throw new Error("Token de acesso não recebido.");
      }
    } catch (error) {
      if (messagesRef.current) {
        messagesRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Email ou senha são inválidos",
          life: 3000,
        });
      }
      console.error("Erro ao fazer login:", error);
    }
  };

  // Função para verificar se o token expirou
  const isTokenExpired = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return true; // Se não for possível decodificar, considera como expirado
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      // Se o token estiver expirado, remove-o do localStorage e redireciona para o login
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="container_login">
      <Messages ref={messagesRef} />
        <section className="login-container"  data-aos="flip-left">
          <section id="form" className="login-form">
            <h1>Faça o seu login</h1>
            <form onSubmit={handleLogin} className="form_login">
              <label className="h-16 group">
                email
                <div className="relative -top-10 bg-none focus-within:gradient-background p-[1px] rounded-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    autoComplete="email"
                    required
                  />
                </div>
              </label>

              <label className="h-16 group">
                senha
                <div className="relative -top-10 bg-none focus-within:gradient-background p-[1px] rounded-lg">
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="login-input"
                    required
                  />
                </div>
              </label>
              <button
                type="submit"
                className="gradient-background text-white font-bold h-10 rounded-lg"
              >
                Entrar
              </button>
            </form>
          </section>
          <section
            id="picture"
            className="login-picture"
            style={{ backgroundImage: `url(${Img_selva})` }}
          ></section>
        </section>
      </div>
    </>
  );
};

export default Login;
