import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { coberturaImagens, coberturas } from "../../../../servers/apiAxio";
import { ICobertura, ICoberturaImagem } from "../../../../interfaces";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Messages } from "primereact/messages";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import "./coberturas.css";
import moment from "moment";

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

  const [divClass, setDivClass] = useState("fluidss p-fluid");
  const [divClassGaleria, setDivClassGaleria] = useState("editnone");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [isnipeer, setIsnipeer] = useState(false);
  const [classUploadEdit, setClassUploadEdit] = useState("fluidss p-fluid");
  const [upalodsEdit, setUpalodsEdit] = useState(false);

  const msgs = useRef<Messages>(null);
  const [novaCoberturaId, setNovaCoberturaId] = useState<string | null>(null);
  const [novacobertura, setNovaCobertura] = useState<ICobertura>({
    id: 0,
    titulo: "",
    data: null,
    descricao: "",
  });

  const butaoChamaFrom = () => {
    setNovaCobertura({ id: 0, titulo: "", data: null, descricao: "" });
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
          label="New"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={butaoChamaFrom}
        />
      </div>
    </div>
  );

  const footer = `In total there are ${data ? data.length : 0} dados.`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coberturasResponse, imagensResponse] = await Promise.all([
          coberturas.getAll(),
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
    setIsSaving(true);
    try {
      console.log("Dados da nova coberturas a serem salvos:", novacobertura);

      const response = await coberturas.create({
        titulo: novacobertura.titulo,
        data: novacobertura.data,
        descricao: novacobertura.descricao,
      });

      console.log("Resposta da API após salvar nova agenda:", response);

      setData([...data, response.data]);

      const novaCoberturaId = response.data;
      setNovaCoberturaId(novaCoberturaId);
      console.log(typeof novaCoberturaId);
      console.log(novaCoberturaId);

      console.log("o id aqui2", response.data);

      setNovaCobertura({ id: 0, titulo: "", data: null, descricao: "" });

      setDivClass("fluidss p-fluid custom-class");
      setNewAgendaDialog(true);
      setShowSuccessMessage(true);

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
      setTimeout(() => {
        setIsSaving(false);
      }, 2000);
    }
  };

  const handleFileUpload = async (event: { files: File[] }) => {
    console.log("chegou aqui 1");

    try {
      if (!event.files || event.files.length === 0) {
        console.error("Nenhum arquivo selecionado.");
        return;
      }
      console.log("chegou aqui 2");

      const formData = new FormData();

      event.files.forEach((file) => {
        formData.append("imagem", file);
      });
      console.log("chegou aqui 3");

      if (novaCoberturaId !== null && novaCoberturaId !== undefined) {
        formData.append("cobertura_id", novaCoberturaId.toString());
      } else if (coberturasatualizada && coberturasatualizada.id) {
        formData.append("cobertura_id", coberturasatualizada.id.toString());
      } else {
        console.error("Erro: ID não recebido.");
        return;
      }

      setNewAgendaDialog(false);
      setEditDialog(false);
      console.log("chegou aqui 5");

      const response = await coberturaImagens.create(formData);
      console.log("Resposta do servidor:", response.data);

      // Verifique a resposta para garantir que os dados são o esperado
      if (response && response.data) {
        console.log("Resposta da API:", response.data);
      } else {
        console.error("Resposta da API inválida");
      }

      console.log("chegou aqui 5");
    } catch (error) {
      console.error("Erro ao fazer upload ou enviar dados:", error);
    } finally {
      console.log("chegou no finally");
    }
  };

  const deleteagendatable = async (rowData: ICobertura) => {
    try {
      await coberturas.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };
  const handleImageDelete = async (rowData: ICoberturaImagem) => {
    try {
      await coberturaImagens.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const botoesAcaoes = (rowData: ICobertura) => {
    return (
      <div>
        <Button
          label="Edit"
          icon="pi pi-refresh"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => handleeditar(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => deleteagendatable(rowData)}
        />
      </div>
    );
  };

  const saveUpdate = async () => {
    try {
      console.log("Dados a serem salvos:", coberturasatualizada);

      if (coberturasatualizada) {
        const { coberturaImg, ...coberturaData } = coberturasatualizada;
        await coberturas.update(coberturaData.id, coberturaData);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === coberturaData.id ? coberturaData : item
          )
        );
      }
      setClassUploadEdit("fluidss p-fluid custom-class2");
      setIsnipeer(true);
      setUpalodsEdit(true);
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
    } finally {
      setTimeout(() => {
        setIsnipeer(false);
      }, 2000);
    }
  };
  useEffect(() => {
    if (upalodsEdit) {
      setDivClassGaleria("image-gallery");
    } else {
      setDivClassGaleria("editnone");
    }
  }, [upalodsEdit]);

  return (
    <div className="cards">
        <Messages className="msg_infor" ref={msgs} />
        <DataTable value={data} header={header} footer={footer}>
          <Column field="titulo" header="Título"></Column>
          <Column header="Image" body={imageTemplate}></Column>
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
        <div className={divClass}>
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
            <InputText
              id="descricao"
              value={novacobertura.descricao}
              onChange={(e) =>
                setNovaCobertura({
                  ...novacobertura,
                  descricao: e.target.value,
                })
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
        {isSaving ? (
          <div className="progresso_Sniper">
            <ProgressSpinner />
          </div>
        ) : (
          showSuccessMessage && (
            <div className="class_imagen">
              <div>
                <h2>Upload de Imagem</h2>
                <FileUpload
                  name="imagem"
                  customUpload
                  uploadHandler={handleFileUpload}
                  multiple
                  accept="image/*"
                  maxFileSize={2000000}
                  emptyTemplate={
                    <p className="m-0">
                      Arraste e solte arquivos aqui para fazer o upload.
                    </p>
                  }
                />{" "}
              </div>
            </div>
          )
        )}{" "}
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
            <div className={classUploadEdit}>
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
                <InputText
                  id="descricao"
                  value={coberturasatualizada.descricao}
                  onChange={(e) =>
                    setcoberturasatualizada({
                      ...coberturasatualizada,
                      descricao: e.target.value,
                    })
                  }
                />
              </div>
              <div className="p-field">
                <Button
                  label="Salvar"
                  icon="pi pi-check"
                  onClick={saveUpdate}
                />
              </div>
            </div>
            {isnipeer ? (
              <div className="progresso_Sniper">
                <ProgressSpinner />
              </div>
            ) : (
              upalodsEdit && (
                <div className="class_imagens">
                  <FileUpload
                    className="fileuploads"
                    name="imagem"
                    customUpload
                    uploadHandler={handleFileUpload}
                    multiple
                    accept="image/*"
                    maxFileSize={2000000}
                    emptyTemplate={
                      <p className="m-0">
                        Arraste e solte arquivos aqui para fazer o upload.
                      </p>
                    }
                  />
                </div>
              )
            )}
            <div className={divClassGaleria}>
              {imagensAssociadas.length > 0 ? (
                imagensAssociadas.map((img) => (
                  <div key={img.id} className="image-item">
                    <img
                      src={img.url}
                      alt={img.titulo}
                      style={{
                        maxWidth: "105px",
                        maxHeight: "105px",
                        borderRadius: "5px",
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
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Cobertura;
