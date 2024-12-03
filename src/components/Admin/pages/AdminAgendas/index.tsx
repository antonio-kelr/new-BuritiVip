import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Iagenda } from "../../../../interfaces/agendas";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { AgendaDados } from "../../../../servers/apiAxio";

import "./index.css";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

export default function AdminAgendas() {
  const [data, setData] = useState<Iagenda[]>([]);
  const [loading, setLoading] = useState(true);

  const [editDialog, setEditDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedEditFile, setSelectedEditFile] = useState<File | null>(null);
  const [noticiaId, setNoticiaId] = useState(0);
  const [agendaatualizada, setAgendaatualizada] = useState<Iagenda | null>(

    null
  );
  const [newAgendaDialog, setNewAgendaDialog] = useState(false);
  const [novaAgenda, setNovaAgenda] = useState<Iagenda>({
    id: 0,
    nome: "",
    url: "",
    slug: "",
    data: null,
    descricao: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AgendaDados.getAll();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (noticiaId !== 0) {
    }
  }, [noticiaId]);

  const deleteagendatable = async (rowData: Iagenda) => {
    try {
      await AgendaDados.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const handleeditar = (rowData: Iagenda) => {
    setAgendaatualizada({ ...rowData });
    setNoticiaId(rowData.id);

    setEditDialog(true);
  };

  const handleFileUpload = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedFile(event.files[0]);
    }
  };

  const editaNoticias = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedEditFile(event.files[0]);
    }
  };

  const openNewAgendaDialog = () => {
    setNovaAgenda({
      id: 0,
      nome: "",
      data: null,
      url: "",
      slug: "",
      descricao: "",
    });
    setNewAgendaDialog(true);
  };

  const saveNewAgenda = async () => {
    try {
      const formData = new FormData();
      formData.append("nome", novaAgenda.nome);
      formData.append(
        "data",
        novaAgenda.data ? novaAgenda.data.toISOString() : ""
      );
      formData.append("descricao", novaAgenda.descricao);

      if (selectedFile) {
        formData.append("imagen", selectedFile);
      }

      const response = await AgendaDados.create(formData);
      setNewAgendaDialog(false);

      console.log("Resposta da API após salvar nova agenda:", response);

      document.location.reload();
      setData([...data, response.data]);
    } catch (error) {
      console.error("Erro ao criar nova agenda:", error);
    }
  };

  const saveUpdate = async () => {
    console.log("arquivos aqui", selectedEditFile);
    console.log("noticia atualizada aqui", agendaatualizada);

    // Verifica se há uma notícia para editar
    if (!agendaatualizada) {
      console.error("Notícia não está disponível para edição.");
      return;
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !agendaatualizada.nome ||
      !agendaatualizada.data ||
      !agendaatualizada.descricao
    ) {
      console.error("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const datas =
      agendaatualizada.data instanceof Date
        ? agendaatualizada.data
        : new Date(agendaatualizada.data);

    // Cria um novo FormData para enviar os dados
    const formData = new FormData();
    formData.append("nome", agendaatualizada.nome);
    formData.append("data", datas.toISOString());
    formData.append("descricao", agendaatualizada.descricao);

    // Adiciona o arquivo se selecionado
    if (selectedEditFile) {
      formData.append("imagen", selectedEditFile);
    }

    try {
      // Atualiza a notícia no backend
      console.log("dados aqui", formData);
      const response = await AgendaDados.update(agendaatualizada.id, formData);

      // Atualiza o estado da tabela com a notícia editada
      document.location.reload();

      setData((prevData) =>
        prevData.map((item) =>
          item.id === agendaatualizada.id ? response.data : item
        )
      );
      setEditDialog(false);
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
  };

  const imageTemplate = (rowData: Iagenda) => {
    return (
      <div>
        {rowData.url ? (
          <img
            src={rowData.url}
            alt="Imagem"
            className="imagem_agenda"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "path/to/fallback-image.jpg";
            }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
    );
  };

  const botoesAcaoes = (rowData: Iagenda) => {
    return (
      <div style={{ display: "flex" }}>
        <Button
          label="Editar"
          icon="pi pi-refresh"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => handleeditar(rowData)}
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
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Agendas</span>
      <div className="new_botao">
        <Button
          label="Nova"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={openNewAgendaDialog}
        />
      </div>
    </div>
  );

  const footer = `No total existem ${data ? data.length : 0} dados.`;

  return (
    <>
      <div className="card">
        <Card>
          {!loading && (
            <DataTable value={data} footer={footer} header={header}>
              <Column field="nome" header="Nome" />
              <Column header="Imagem" body={imageTemplate}></Column>

              <Column
                field="data"
                header="Data"
                body={(rowData) => moment(rowData.data).format("DD/MM/YYYY")}
              />
              <Column field="descricao" header="Descrição" />
              <Column body={botoesAcaoes} header="Ações" />
            </DataTable>
          )}
        </Card>
      </div>

      <Dialog
        header="Nova Agenda"
        visible={newAgendaDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setNewAgendaDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field">
            <label htmlFor="nome">Nome</label>
            <InputText
              id="nome"
              value={novaAgenda.nome}
              onChange={(e) =>
                setNovaAgenda({ ...novaAgenda, nome: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="data">Data</label>
            <Calendar
              id="data"
              value={novaAgenda.data ? new Date(novaAgenda.data) : null}
              onChange={(e) => setNovaAgenda({ ...novaAgenda, data: e.value })}
              showIcon
            />
          </div>
          <div className="p-field">
            <label htmlFor="descricao">Descrição</label>
            <FloatLabel>
              <InputTextarea
                variant="filled"
                value={novaAgenda.descricao}
                onChange={(e) =>
                  setNovaAgenda({ ...novaAgenda, descricao: e.target.value })
                }
                rows={5}
                cols={30}
              />{" "}
            </FloatLabel>
          </div>

          <div className="p-field upldImg">
            <FileUpload
              className="Upaloads"
              name="imagem"
              customUpload
              multiple
              accept="image/*"
              maxFileSize={2000000}
              onSelect={handleFileUpload}
              emptyTemplate={
                <p className="m-0">
                  Arraste e solte arquivos aqui para fazer o upload.
                </p>
              }
            />
          </div>

          <div className="p-field">
            <Button label="Salvar" icon="pi pi-check" onClick={saveNewAgenda} />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Editar Agenda"
        visible={editDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditDialog(false)}
      >
        {agendaatualizada && (
          <div className="fluidss p-fluid">
            <div className="p-field">
              <label htmlFor="nome">Nome</label>
              <InputText
                id="nome"
                value={agendaatualizada.nome}
                onChange={(e) =>
                  setAgendaatualizada({
                    ...agendaatualizada,
                    nome: e.target.value,
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="data">Data</label>
              <Calendar
                id="data"
                value={
                  agendaatualizada.data ? new Date(agendaatualizada.data) : null
                }
                onChange={(e) =>
                  setAgendaatualizada({ ...agendaatualizada, data: e.value })
                }
                showIcon
              />
            </div>
            <div className="p-field">
              <label htmlFor="descricao">Descrição</label>
              <FloatLabel>
                <InputTextarea
                  variant="filled"
                  value={agendaatualizada.descricao}
                  onChange={(e) =>
                    setAgendaatualizada({
                      ...agendaatualizada,
                      descricao: e.target.value,
                    })
                  }
                  rows={5}
                  cols={30}
                />{" "}
              </FloatLabel>
            </div>

            <div className="upload">
              <div className="p-field">
                <FileUpload
                  className="Upaloads"
                  name="imagem"
                  customUpload
                  multiple={false}
                  accept="image/*"
                  maxFileSize={2000000}
                  onSelect={editaNoticias}
                  emptyTemplate={
                    <p className="m-0">
                      Arraste e solte arquivos aqui para fazer o upload.
                    </p>
                  }
                />
              </div>
              {agendaatualizada.url && (
                <div
                  className="imagen_noticia"
                  style={{ marginBottom: "10px" }}
                >
                  <img
                    src={agendaatualizada.url}
                    style={{
                      maxWidth: "105px",
                      maxHeight: "105px",
                      borderRadius: "5px",
                    }}
                    alt="Imagem da Notícia"
                  />
                </div>
              )}
            </div>

            <div className="p-field">
              <Button label="Salvar" icon="pi pi-check" onClick={saveUpdate} />
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
