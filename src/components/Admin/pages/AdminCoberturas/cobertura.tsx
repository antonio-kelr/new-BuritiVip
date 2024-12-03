import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { coberturaImagens, CoberturasAxios } from "../../../../servers/apiAxio";
import { ICobertura, ICoberturaImagem } from "../../../../interfaces";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Messages } from "primereact/messages";
import { FileUpload } from "primereact/fileupload";
import "./coberturas.css";
import moment from "moment";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";

const Cobertura = () => {
  const [data, setData] = useState<ICobertura[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAgendaDialog, setNewAgendaDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [coberturasatualizada, setcoberturasatualizada] =
    useState<ICobertura | null>(null);
  const [imagensAssociadas, setImagensAssociadas] = useState<
    ICoberturaImagem[]
  >([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [upalodsEdit, setUpalodsEdit] = useState(false);

  const msgs = useRef<Messages>(null);
  const [novaCoberturaId, setNovaCoberturaId] = useState<string | null>(null);
  const [novacobertura, setNovaCobertura] = useState<ICobertura>({
    id: 0,
    titulo: "",
    slug: "",
    local: "",
    fotografo: "",

    data: null,
    descricao: "",
  });

  const butaoChamaFrom = () => {
    setNovaCobertura({
      id: 0,
      titulo: "",
      data: null,
      local: "",
      fotografo: "",

      slug: "",
      descricao: "",
    });
    setNewAgendaDialog(true);
    msgs.current?.show([
      {
        sticky: false,
        severity: "info",
        summary: "Info",
        detail:
          "assim que vocé cria e salvá sua cobertura vocé podera adicionar imagens relacionadas a ela!",
        closable: false,
      },
    ]);
  };
  const handleeditar = (rowData: ICobertura) => {
    setcoberturasatualizada({ ...rowData });
    setEditDialog(true);
    setImagensAssociadas(rowData.coberturaImg || []);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Coberturas</span>
      <div className="new_botao">
        <Button
          label="Nova"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={butaoChamaFrom}
        />
      </div>
    </div>
  );

  const footer = `No total existem ${data ? data.length : 0} dados.`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coberturasResponse] = await Promise.all([
          CoberturasAxios.getAll(),
          coberturaImagens.getAll(),
        ]);

        setData(coberturasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const imageTemplate = (rowData: ICobertura) => {
    const lastImage =
      rowData.coberturaImg && rowData.coberturaImg.length > 0
        ? rowData.coberturaImg[rowData.coberturaImg.length - 1]
        : null;

    return (
      <div>
        {lastImage ? (
          <img
            src={lastImage.url}
            alt={lastImage.titulo}
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

  const saveNewCoberturas = async () => {
    try {
      console.log("Dados da nova cobertura a serem salvos:", novacobertura);

      const response = await CoberturasAxios.create({
        titulo: novacobertura.titulo,
        data: novacobertura.data,
        descricao: novacobertura.descricao,
      });

      console.log("Resposta da API após salvar nova cobertura:", response);

      const novaCoberturaId = response.data;

      setNewAgendaDialog(false);

      console.log("ID da nova cobertura:", novaCoberturaId);

      document.location.reload();

      setData([...data, novaCoberturaId]);
      setNovaCoberturaId(novaCoberturaId);

      setNovaCobertura({
        id: 0,
        titulo: "",
        data: null,
        local: "",
        fotografo: "",

        slug: "",
        descricao: "",
      });

      if (selectedFiles.length > 0) {
        await handleFileUpload(selectedFiles, novaCoberturaId);
        setSelectedFiles([]);
      }
      setNewAgendaDialog(false);

      msgs.current?.show([
        {
          sticky: false,
          severity: "success",
          summary: "Sucesso",
          detail: "Cobertura criada com sucesso!",
          closable: true,
        },
      ]);
    } catch (error) {
      console.error("Erro ao criar nova cobertura:", error);
    } finally {
      setNewAgendaDialog(false);
    }
  };
  const handleFileUpload = async (files: File[], coberturaId: number) => {
    console.log("Iniciando upload de arquivos");

    try {
      if (!files || files.length === 0) {
        console.error("Nenhum arquivo selecionado.");
        return;
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("imagem", file);
      });

      if (coberturaId) {
        formData.append("cobertura_id", coberturaId.toString());
      } else {
        console.error("Erro: ID da cobertura não encontrado.");
        return;
      }

      const response = await coberturaImagens.create(formData);
      console.log("Resposta do servidor:", response.data);

      if (response.data && response.data.savedImages) {
        console.log("Imagens salvas:", response.data.savedImages);
      }
    } catch (error) {
      console.error("Erro ao fazer upload de arquivos:", error);
    } finally {
      setNewAgendaDialog(false);
    }
  };
  const deleteagendatable = async (rowData: ICobertura) => {
    try {
      await CoberturasAxios.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const handleImageDelete = async (rowData: ICoberturaImagem) => {
    try {
      // Chama a API para deletar a imagem
      await coberturaImagens.delete(rowData.id);

      // Atualize o estado das imagens associadas
      setImagensAssociadas((prevImages) =>
        prevImages.filter((img) => img.id !== rowData.id)
      );

      // Atualiza o estado para remover a imagem deletada
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));

      // Log para depuração
      console.log("Imagem deletada com sucesso:", rowData);
    } catch (error) {
      console.error("Erro ao deletar a imagem:", error);
    }
  };

  const botoesAcaoes = (rowData: ICobertura) => {
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

  const saveUpdate = async () => {
    try {
      if (!coberturasatualizada) {
        console.error("Dados da cobertura não encontrados.");
        return;
      }

      const { coberturaImg, ...coberturaData } = coberturasatualizada;
      const updatedCoverage = await CoberturasAxios.update(
        coberturaData.id,
        coberturaData
      );
      document.location.reload();

      setData((prevData) =>
        prevData.map((item) =>
          item.id === coberturaData.id ? updatedCoverage.data : item
        )
      );

      if (selectedFiles.length > 0) {
        await handleFileUpload(selectedFiles, coberturaData.id);
        setSelectedFiles([]);
      }

      setUpalodsEdit(false);

      setEditDialog(false);
      msgs.current?.show([
        {
          sticky: false,
          severity: "success",
          summary: "Sucesso",
          detail: "Cobertura atualizada e imagens carregadas com sucesso!",
          closable: true,
        },
      ]);
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
    }
  };
  return (
    <div className="card">
      <Messages className="msg_infor" ref={msgs} />
      <DataTable value={data} header={header} footer={footer}>
        <Column field="titulo" header="Título"></Column>
        <Column header="Imagem" body={imageTemplate}></Column>
        <Column
          field="data"
          header="Data"
          body={(rowData) => moment(rowData.data).format("DD/MM/YYYY")}
        />
        <Column field="descricao" header="Descrição"></Column>
        <Column body={botoesAcaoes} header="Ações" />
      </DataTable>

      <Dialog
        header="Nova Cobertura"
        visible={newAgendaDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setNewAgendaDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field">
            <label htmlFor="titulo">Titulo</label>
            <InputText
              id="titulo"
              value={novacobertura.titulo}
              onChange={(e) =>
                setNovaCobertura({ ...novacobertura, titulo: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="titulo">Local</label>
            <InputText
              id="local"
              value={novacobertura.local}
              onChange={(e) =>
                setNovaCobertura({ ...novacobertura, local: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="titulo">Fotografo</label>
            <InputText
              id="fotografo"
              value={novacobertura.fotografo}
              onChange={(e) =>
                setNovaCobertura({
                  ...novacobertura,
                  fotografo: e.target.value,
                })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="data">Data</label>
            <Calendar
              id="data"
              value={novacobertura.data ? new Date(novacobertura.data) : null}
              onChange={(e) =>
                setNovaCobertura({ ...novacobertura, data: e.value })
              }
              showIcon
            />
          </div>
          <div className="p-field">
            <label htmlFor="descricao">Descrição</label>
            <FloatLabel>
              <InputTextarea
                variant="filled"
                value={novacobertura.descricao}
                onChange={(e) =>
                  setNovaCobertura({
                    ...novacobertura,
                    descricao: e.target.value,
                  })
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
              onSelect={(e) => setSelectedFiles(e.files)}
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
              onClick={saveNewCoberturas}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Editar Coberturas"
        visible={editDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditDialog(false)}
      >
        {coberturasatualizada && (
          <div>
            <div className="fluidss p-fluid">
              <div className="p-field">
                <label htmlFor="titulo">Titulo</label>
                <InputText
                  id="titulo"
                  value={coberturasatualizada.titulo}
                  onChange={(e) =>
                    setcoberturasatualizada({
                      ...coberturasatualizada,
                      titulo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="p-field">
                <label htmlFor="titulo">Local</label>
                <InputText
                  id="local"
                  value={coberturasatualizada.local}
                  onChange={(e) =>
                    setcoberturasatualizada({
                      ...coberturasatualizada,
                      local: e.target.value,
                    })
                  }
                />
              </div>
              <div className="p-field">
                <label htmlFor="fotografo">Fotografo</label>
                <InputText
                  id="fotografo"
                  value={coberturasatualizada.fotografo}
                  onChange={(e) =>
                    setcoberturasatualizada({
                      ...coberturasatualizada,
                      fotografo: e.target.value,
                    })
                  }
                />
              </div>

              <div className="p-field">
                <label htmlFor="data">Data</label>
                <Calendar
                  id="data"
                  value={
                    coberturasatualizada.data
                      ? new Date(coberturasatualizada.data)
                      : null
                  }
                  onChange={(e) =>
                    setcoberturasatualizada({
                      ...coberturasatualizada,
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
                    value={coberturasatualizada.descricao}
                    onChange={(e) =>
                      setcoberturasatualizada({
                        ...coberturasatualizada,
                        descricao: e.target.value,
                      })
                    }
                    rows={5}
                    cols={30}
                  />{" "}
                </FloatLabel>
              </div>
              <div className="p-field">
                <FileUpload
                  className="fileuploads"
                  name="imagem"
                  customUpload
                  multiple
                  accept="image/*"
                  maxFileSize={2000000}
                  onSelect={(e) => setSelectedFiles(e.files)}
                  emptyTemplate={
                    <p className="m-0">
                      Arraste e solte arquivos aqui para fazer o upload.
                    </p>
                  }
                />{" "}
              </div>
              <div className="EditImagems">
                {imagensAssociadas.length > 0 ? (
                  imagensAssociadas.map((img) => (
                    <div key={img.id} className="image-item">
                      <img
                        src={img.url}
                        alt={img.titulo}
                        style={{
                          maxWidth: "80px",
                          maxHeight: "50px",
                          borderRadius: "3px",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "path/to/fallback-image.jpg";
                        }}
                      />
                      <button
                        onClick={() => handleImageDelete(img)}
                        className="pi pi-trash butoDelete"
                      ></button>
                    </div>
                  ))
                ) : (
                  <p className="m-0">Nenhuma imagem associada.</p>
                )}
              </div>

              <div className="p-field">
                <Button
                  label="Salvar"
                  icon="pi pi-check"
                  onClick={saveUpdate}
                />
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Cobertura;
