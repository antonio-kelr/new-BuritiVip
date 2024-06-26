import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { usuarios } from "../../servers/apiAxio";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom";
import { Messages } from "primereact/messages";

import "./login.css";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const messagesRef = useRef<Messages>({} as any);

  const handleLogin = async () => {
    try {
      const resposta = await usuarios.login({ email, senha });
      if (resposta.data.accessToken) {
        localStorage.setItem("token", resposta.data.accessToken);
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
        console.error("Token não encontrado na resposta do login.");
      }
    } catch (error) {
      if (messagesRef.current) {
        messagesRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Erro ao fazer login",
          life: 3000,
        });
      }
      console.error("Erro ao fazer loginnn:", error);
    }
  };
  return (
    <header className="Header">
      <div className="msg_error">
        <Messages ref={messagesRef} />
      </div>

      <div className="login-container">
        <h1>Login</h1>
        <hr className=" css-6h"></hr>
        <FloatLabel>
          <InputText
            className="logout"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label form="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            className="logout"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label form="password">Senha</label>
        </FloatLabel>

        <Button label="Login" onClick={handleLogin} />
      </div>
    </header>
  );
};

export default Login;
