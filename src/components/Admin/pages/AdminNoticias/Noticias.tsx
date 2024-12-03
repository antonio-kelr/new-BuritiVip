import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { INoticias } from "../../../../interfaces/Noticias";
import { Button } from "primereact/button";
import moment from "moment";
import { useEffect, useState } from "react";
import { NoticiasData } from "../../../../servers";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import "./Noticias.css";
import axios from "axios";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";

const Noticias = () => {
  const [data, setData] = useState<INoticias[]>([]);
  const [loading, setLoading] = useState(true);
  const [abriDialog, setAbriDialog] = useState(false);

  const [editDialog, setEditDialog] = useState(false);

  const [noticiaId, setNoticiaId] = useState(0);
  const [noticiasAtualizar, setNoticiasAtualizar] = useState<INoticias | null>(
    null
  );

  const [selectedEditFile, setSelectedEditFile] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newNoticias, setNewNoticias] = useState<INoticias>({
    id: 0,
    titulo: "",
    data: null,
    slug: "",

    url: "",
    descricao: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NoticiasData.getAll();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openNewNoticia = () => {
    setNewNoticias({
      id: 0,
      titulo: "",
      data: null,
      url: "",
      slug: "",
      descricao: "",
    });
    setAbriDialog(true);
  };
  const handleFileUpload = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedFile(event.files[0]);
    }
  };

  const saveNewNoticias = async () => {
    console.log("dados aqui", newNoticias);
    console.log("dados aqui", selectedFile);

    try {
      const formData = new FormData();
      formData.append("titulo", newNoticias.titulo);
      formData.append(
        "data",
        newNoticias.data ? newNoticias.data.toISOString() : ""
      );
      formData.append("descricao", newNoticias.descricao);

      if (selectedFile) {
        formData.append("imagen", selectedFile);
      }

      const response = await NoticiasData.create(formData);
      document.location.reload();

      setData([...data, response.data]);
      setAbriDialog(false);

      console.log("Resposta da API após salvar nova agenda:", response);
    } catch (error) {
      console.error("Erro ao criar nova agenda:", error);
    }
  };

  const imageTemplate = (rowData: INoticias) => {
    return (
      <div>
        {rowData.url ? (
          <img
            src={rowData.url}
            alt={rowData.titulo || "Imagem"}
            style={{
              maxWidth: "105px",
              maxHeight: "105px",
              borderRadius: "5px",
            }}
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

  const editaNoticias = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedEditFile(event.files[0]);
    }
  };

  const saveEditNoticias = async () => {
    console.log("arquivos aqui", selectedEditFile);
    console.log("noticia atualizada  aqui", noticiasAtualizar);

    // Verifica se há uma notícia para editar
    if (!noticiasAtualizar) {
      console.error("Notícia não está disponível para edição.");
      return;
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !noticiasAtualizar.titulo ||
      !noticiasAtualizar.data ||
      !noticiasAtualizar.descricao
    ) {
      console.error("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
    const data =
      noticiasAtualizar.data instanceof Date
        ? noticiasAtualizar.data
        : new Date(noticiasAtualizar.data);

    // Cria um novo FormData para enviar os dados
    const formData = new FormData();
    formData.append("titulo", noticiasAtualizar.titulo);
    formData.append("data", data.toISOString());
    formData.append("descricao", noticiasAtualizar.descricao);

    // Adiciona o arquivo se selecionado

    if (selectedEditFile) {
      formData.append("imagen", selectedEditFile);
    }

    try {
      // Atualiza a notícia no backend
      console.log("dados aqui", formData);
      const response = await NoticiasData.update(
        noticiasAtualizar.id,
        formData
      );

      document.location.reload();

      // Atualiza o estado da tabela com a notícia editada
      setData((prevData) =>
        prevData.map((item) =>
          item.id === noticiasAtualizar.id ? response.data : item
        )
      );
      setEditDialog(false);
      console.log("Item atualizado:", response.data);
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

  const deleteImage = async (filePath: string, noticiaId: number) => {
    const relativePath = filePath.split("/").slice(-2).join("/");
    console.log("url da imagem", relativePath);
    console.log("id da imagem", noticiaId);

    try {
      // Passando os dois parâmetros para a função deleteImage
      await NoticiasData.deleteImage(relativePath, noticiaId);

      // Atualize o estado da notícia para remover a URL da imagem
      setNoticiasAtualizar((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            url: "", // Limpa a URL da imagem
          };
        }
        return prevState;
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.id === noticiasAtualizar?.id ? { ...item, url: "" } : item
        )
      );

      console.log("Imagem deletada com sucesso.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao deleta a imagem:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
    }
  };
  const botoesAcaoes = (rowData: INoticias) => {
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
          onClick={() => {
            deletenoticiatable(rowData);
          }}
        />
      </div>
    );
  };
  const handleeditar = (rowData: INoticias) => {
    setNoticiasAtualizar({ ...rowData });
    console.log(rowData);

    setNoticiaId(rowData.id);

    setEditDialog(true);
  };
  useEffect(() => {
    if (noticiaId !== 0) {
    }
  }, [noticiaId]);

  const deletenoticiatable = async (rowData: INoticias) => {
    try {
      await NoticiasData.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Noticias</span>
      <div className="new_botao">
        <Button
          label="Nova"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={openNewNoticia}
        />
      </div>
    </div>
  );
  const footer = `No total existem ${data ? data.length : 0} dados.`;

  return (
    <div className="cards">
      <DataTable value={data} header={header} footer={footer}>
        <Column field="titulo" header="Título"></Column>
        <Column header="Imagem" body={imageTemplate}></Column>
        <Column
          field="data"
          header="Data"
          body={(rowData) => moment(rowData.data).format("DD/MM/YYYY")}
        />
        <Column body={botoesAcaoes} header="Ações" />
      </DataTable>
      <Dialog
        header="Nova Noticia"
        visible={abriDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setAbriDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field">
            <label htmlFor="titulo">titulo</label>
            <InputText
              id="titulo"
              value={newNoticias.titulo}
              onChange={(e) =>
                setNewNoticias({ ...newNoticias, titulo: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="data">Data</label>
            <Calendar
              id="data"
              value={newNoticias.data ? new Date(newNoticias.data) : null}
              onChange={(e) =>
                setNewNoticias({ ...newNoticias, data: e.value })
              }
              showIcon
            />
          </div>
          <div className="p-field">
            <label htmlFor="descricao">Descrição</label>
            <FloatLabel>
              <InputTextarea
                variant="filled"
                value={newNoticias.descricao}
                onChange={(e) =>
                  setNewNoticias({ ...newNoticias, descricao: e.target.value })
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
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={saveNewNoticias}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Editar Notícias"
        visible={editDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditDialog(false)}
      >
        {noticiasAtualizar && (
          <div>
            <div className="fluidss p-fluid">
              <div className="p-field">
                <label htmlFor="titulo">Título</label>
                <InputText
                  id="titulo"
                  value={noticiasAtualizar.titulo}
                  onChange={(e) =>
                    setNoticiasAtualizar({
                      ...noticiasAtualizar,
                      titulo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="p-field">
                <label htmlFor="data">Data</label>
                <Calendar
                  id="data"
                  value={
                    noticiasAtualizar.data
                      ? new Date(noticiasAtualizar.data)
                      : null
                  }
                  onChange={(e) =>
                    setNoticiasAtualizar({
                      ...noticiasAtualizar,
                      data: e.value,
                    })
                  }
                  showIcon
                />
              </div>
              <div className="p-field">
                <label htmlFor="descricao">Descrição</label>
                <FloatLabel>
                  <InputTextarea
                    variant="filled"
                    value={noticiasAtualizar.descricao}
                    onChange={(e) =>
                      setNoticiasAtualizar({
                        ...noticiasAtualizar,
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
                {noticiasAtualizar.url && (
                  <div
                    className="imagen_noticia"
                    style={{ marginBottom: "10px" }}
                  >
                    <img
                      src={noticiasAtualizar.url}
                      style={{
                        maxWidth: "105px",
                        maxHeight: "105px",
                        borderRadius: "5px",
                      }}
                      alt="Imagem da Notícia"
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-noticia"
                      onClick={() =>
                        deleteImage(noticiasAtualizar.url, noticiaId)
                      }
                    />
                  </div>
                )}
              </div>

              <div className="p-field">
                <Button
                  label="Salvar"
                  icon="pi pi-check"
                  onClick={saveEditNoticias}
                />
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default Noticias;
