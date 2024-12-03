import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import imgauzte from "../../img/desig-5.png";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { RecadosServer } from "../../servers";
import { Link, useNavigate } from "react-router-dom";
import { Irecados } from "../../interfaces/Recados";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

const Recados = () => {
  const navigate = useNavigate();
  const [newDialogrecados, setNewDialogrecados] = useState(false);
  const [recados, setRecados] = useState<Irecados[]>([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(0);
  const [newrecados, setNewrecados] = useState<Irecados>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    slug: "",
    usuario_id: 0,
  });

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId") || "0");
    if (storedUserId > 0) {
      setUserId(storedUserId);
    }
  }, [navigate]);
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token || userId === null) {
      alert("voce precisa fazer Login!!");

      navigate("/admin/login");
      return false;
    }
    return true;
  };

  const NewDialog = () => {
    if (!isAuthenticated()) {
      return;
    }
    setNewrecados({
      id: 0,
      nome: "",
      email: "",
      telefone: "",
      slug: "",

      mensagem: "",
      usuario_id: userId,
    });
    console.log(userId);

    setNewDialogrecados(true);
  };

  const saveNewAgenda = async () => {
    try {
      console.log("Dados da nova agenda a serem salvos:", newrecados);

      const response = await RecadosServer.create({
        nome: newrecados.nome,
        telefone: newrecados.telefone,
        email: newrecados.email,
        mensagem: newrecados.mensagem,
        usuario_id: newrecados.usuario_id,
      });

      console.log("Resposta da API após salvar nova agenda:", response);

      setNewDialogrecados(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao criar nova agenda:",
          error.response?.data || error.message
        );
        alert(
          `Erro ao enviar recado: ${
            error.response?.data?.errors?.default || "Erro desconhecido"
          }`
        );
      } else {
        console.error("Erro desconhecido:", error);
        alert("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recadossResponse] = await Promise.all([RecadosServer.getAll()]);

        setRecados(recadossResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const recadosapi = recados.slice(0, 1);

  return (
    <>
      <div className="col img_items recados">
        <div className="noti_PLus concert_content img_rec">
          <h3>RECADOS</h3>
          <img src={imgauzte} alt="" />

          <div className="link_not concert">
            <a href="">
              <i>
                <FaPlus />
              </i>
              <Link to="/recados">mais recados</Link>
            </a>
          </div>
        </div>
        {recadosapi.map((Data) => (
          <div key={Data.id} className="David">
            <div className="seta_re">
              <span>DE:</span>
              <h3>{Data.nome}</h3>
            </div>
            <div className="seta_re">
              <span>PARA:</span>
              <h3>{Data.nome}</h3>
            </div>

            <div className="arrow_re">
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: Data.mensagem }} />
              </div>

              <div className="buttoes_re">
                <button className="butaoLerRed">ler todos</button>
                <Button className="butaEnviaRed" onClick={NewDialog}>
                  enviar recados
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Dialog
          header="Enviar Recado"
          visible={newDialogrecados}
          style={{ width: "50vw" }}
          modal
          onHide={() => setNewDialogrecados(false)}
        >
          <div className="fluidss p-fluid">
            <div className="p-field">
              <label htmlFor="nome">Nome</label>
              <InputText
                id="nome"
                value={newrecados.nome}
                onChange={(e) =>
                  setNewrecados({ ...newrecados, nome: e.target.value })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={newrecados.email}
                onChange={(e) =>
                  setNewrecados({
                    ...newrecados,
                    email: e.target.value,
                  })
                }
                keyfilter="email"
              />
            </div>

            <div className="p-field">
              <label htmlFor="telefone" className="block mb-2">
                Telefone
              </label>
              <InputMask
                id="telefone"
                mask="(99) 999999999"
                placeholder="(99) 999-9999"
                value={newrecados.telefone || ""}
                onChange={(e) =>
                  setNewrecados({
                    ...newrecados,
                    telefone: e.target.value || "",
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="descricao">Descrição</label>
              <FloatLabel>
                <InputTextarea
                  variant="filled"
                  value={newrecados.mensagem}
                  onChange={(e) =>
                    setNewrecados({ ...newrecados, mensagem: e.target.value })
                  }
                  rows={5}
                  cols={30}
                />{" "}
              </FloatLabel>
            </div>

            <div className="p-field">
              <Button
                label="Enviar"
                icon="pi pi-check"
                onClick={saveNewAgenda}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Recados;
