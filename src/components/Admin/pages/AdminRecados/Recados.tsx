import { useEffect, useState } from "react";
import { RecadosServer } from "../../../../servers";
import { Irecados } from "../../../../interfaces/Recados";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";

const Recados = () => {
  const [data, setData] = useState<Irecados[]>([]);
  const [loading, setLoading] = useState(true);
  const [idtalizar, setidAtualizar] = useState(0);
  const [atualiDialog, setAtualiDialog] = useState(false);
  const [recadoUpdate, setRecadoUpdate] = useState<Irecados | null>(null);
  const [novoDialog, setNovoDialog] = useState(false);
  const [novoRecado, setNovoRecado] = useState<Irecados>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    slug: "",
    mensagem: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RecadosServer.getAll();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const botoesAcaoes = (rowData: Irecados) => {
    return (
      <div style={{ display: "flex" }}>
        <Button
          label="Editar"
          icon="pi pi-refresh"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            handleeditar(rowData);
          }}
        />
        <Button
          label="Deletar"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => deleteagendatable(rowData)}
        />
      </div>
    );
  };
  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId") || "0");
    if (storedUserId > 0) {
      setidAtualizar(storedUserId);
    }
  }, []);

  const handleeNovo = () => {
    setNovoDialog(true);
    console.log("dados", idtalizar);
    console.log("dados", novoRecado);

    setNovoRecado({
      id: 0,
      nome: "",
      email: "",
      telefone: "",
      slug: "",
      mensagem: "",
    });
  };

  const handleeditar = (rowData: Irecados) => {
    setRecadoUpdate({ ...rowData });
    console.log(rowData);

    setAtualiDialog(true);
  };

  const deleteagendatable = async (rowData: Irecados) => {
    try {
      await RecadosServer.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const saveNewRecado = async () => {
    // Remover o ID do novo recado, pois deve ser gerado pelo backend
    const { id, ...novoRecadoSemId } = novoRecado;

    try {
      const response = await RecadosServer.create({
        ...novoRecadoSemId, // Não inclua o id
        usuario_id: idtalizar,
      });

      // Atualiza a tabela com o novo recado
      setData([...data, response.data]);
      setNovoDialog(false); // Fecha o diálogo de novo recado
      setNovoRecado({
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        slug: "",
        mensagem: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao cadastrar recado:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
    }
  };

  const saveUpdate = async () => {
    console.log("Dados a serem salvos:", recadoUpdate);

    if (recadoUpdate && recadoUpdate.id && recadoUpdate.id > 0) {
      try {
        const recadoComUsuario = {
          ...recadoUpdate,
          usuario_id: idtalizar,
        };

        await RecadosServer.update(recadoComUsuario.id, recadoComUsuario);

        // Atualiza os dados localmente
        setData((prevData) =>
          prevData.map((item) =>
            item.id === recadoComUsuario.id ? recadoComUsuario : item
          )
        );
        console.log("Recado atualizado:", recadoComUsuario);

        setAtualiDialog(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Erro ao atualizar recado:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
          });
        }
      }
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Recados</span>
      <div className="new_botao">
        <Button
          label="Nova"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={handleeNovo}
        />
      </div>
    </div>
  );

  const footer = `No total existem ${data ? data.length : 0} dados.`;

  return (
    <div className="card">
      <Card>
        {!loading && (
          <DataTable value={data} footer={footer} header={header}>
            <Column field="nome" header="Nome" />
            <Column field="email" header="Email" />
            <Column field="telefone" header="Telefone" />
            <Column field="mensagem" header="Mensagem" />
            <Column body={botoesAcaoes} header="Ações" />
          </DataTable>
        )}
      </Card>

      <Dialog
        header="Novo Recado"
        visible={novoDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setNovoDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field">
            <label htmlFor="nome">Nome</label>
            <InputText
              id="nome"
              value={novoRecado.nome}
              onChange={(e) =>
                setNovoRecado({ ...novoRecado, nome: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={novoRecado.email}
              onChange={(e) =>
                setNovoRecado({ ...novoRecado, email: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="telefone">Telefone</label>
            <InputText
              id="telefone"
              value={novoRecado.telefone}
              onChange={(e) =>
                setNovoRecado({ ...novoRecado, telefone: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="descricao">Descrição</label>
            <FloatLabel>
              <InputTextarea
                variant="filled"
                value={novoRecado.mensagem}
                onChange={(e) =>
                  setNovoRecado({ ...novoRecado, mensagem: e.target.value })
                }
                rows={5}
                cols={30}
              />{" "}
            </FloatLabel>
          </div>
          <div className="p-field">
            <Button label="Salvar" icon="pi pi-check" onClick={saveNewRecado} />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Editar Recados"
        visible={atualiDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setAtualiDialog(false)}
      >
        {recadoUpdate && (
          <div className="fluidss p-fluid">
            <div className="p-field">
              <label htmlFor="nome">Nome</label>
              <InputText
                id="nome"
                value={recadoUpdate.nome}
                onChange={(e) =>
                  setRecadoUpdate({
                    ...recadoUpdate,
                    nome: e.target.value,
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={recadoUpdate.email}
                onChange={(e) =>
                  setRecadoUpdate({
                    ...recadoUpdate,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="telefone">Telefone</label>
              <InputText
                id="telefone"
                value={recadoUpdate.telefone}
                onChange={(e) =>
                  setRecadoUpdate({
                    ...recadoUpdate,
                    telefone: e.target.value,
                  })
                }
              />
            </div>
            <div className="p-field">
            <label htmlFor="descricao">Descrição</label>
            <FloatLabel>
              <InputTextarea
                variant="filled"
                value={recadoUpdate.mensagem}

                onChange={(e) =>
                  setRecadoUpdate({
                    ...recadoUpdate,
                    mensagem: e.target.value,
                  })
                }
                rows={5}
                cols={30}
              />{" "}
            </FloatLabel>
          </div>
            <div className="p-field">
              <Button label="Salvar" icon="pi pi-check" onClick={saveUpdate} />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Recados;
