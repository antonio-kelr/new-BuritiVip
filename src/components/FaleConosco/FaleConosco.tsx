import { InputText } from "primereact/inputtext";
import "./FaleConosco .css";
import { useEffect, useRef, useState } from "react";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import emailjs from "@emailjs/browser";
import { Messages } from "primereact/messages";


const FaleConosco = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [telefone, setTelefone] = useState("");
  const msgs = useRef<Messages>(null);

  useEffect(() => {
    emailjs.init("M7zqm4vFnwQ9k5ozS");
  }, []);

  const enviaDados = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || username === "" || mensagem === "" || telefone === "") {
      alert("Opa! Está faltando um campo.");
      return;
    }

    const paraTemplate = {
      from_name: username,
      message: mensagem,
      email: email,
      telefone: telefone,
    };

    emailjs
      .send("service_eqq3wds", "template_rnr4plb", paraTemplate)
      .then(() => {
        msgs.current?.show([
          {
            sticky: false,
            severity: "success",
            summary: "Success",
            detail: "Seu recado foi enviado. Agora, aguarde a sua resposta.",
            closable: true,
          },
        ]);

        setEmail("");
        setMensagem("");
        setTelefone("");
        setUsername("");

      })
      .catch((error) => {
        msgs.current?.show([
            {
              sticky: false,
              severity: "error",
              summary: "Error",
              detail: "Não foi possivel envia seu recado.",
              closable: true,
            },
          ]);
  
        console.error("Erro ao enviar o email:", error); 
      });
  };

  return (
    <div className="container_faleconosco">
      <Messages className="msg_infor" ref={msgs} />

      <form className="form" onSubmit={enviaDados}>
        {" "}
        {/* Adicione o onSubmit aqui */}
        <div className="title">
          <span>ENTRAR EM CONTATO</span>
          <hr
            data-testid="strip"
            className="sc-ibQAlb bItNhe sc-ebXIMv cvIvym"
          />
        </div>
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-user icone_faleconosco" />
            <InputText
              id="username"
              className="campoInput"
              placeholder="Nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </span>
        </div>
        <div className="p-field">
          <span className="p-input-icon-left">
            <i className="pi pi-envelope icone_faleconosco" />
            <InputText
              id="email"
              className="campoInput"
              keyfilter="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </span>
        </div>
        <div className="p-field">
          <span className="p-input-icon-left">
            <i className="pi pi-phone icone_faleconosco" />
            <InputMask
              id="phone"
              className="campoInput"
              mask="(99) 9999-9999"
              value={telefone || ""}
              placeholder="(99) 9999-9999"
              onChange={(e) => setTelefone(e.target.value || "")}
              required
            />
          </span>
        </div>
        <div className="p-field">
          <InputTextarea
            autoResize
            className="campoInput"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={5}
            cols={30}
            placeholder="Digite sua mensagem..."
            required
          />
        </div>
        <div className="p-field">
          <Button
            className="butao_Enviar"
            label="Enviar"
            type="submit"
            icon="pi pi-check"
          />
        </div>
      </form>
    </div>
  );
};

export default FaleConosco;
