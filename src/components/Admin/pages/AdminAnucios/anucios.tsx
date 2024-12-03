import { Card } from "primereact/card";
import "./anucios.css";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { AnuciosPhoto } from "../../../../servers";
import { Ianucios } from "../../../../interfaces/anucios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";

const Anucios = () => {
  const [data, setData] = useState<Ianucios[]>([]);
  const [loading, setLoading] = useState(true);
  const [abrIanucios, setabrIanucios] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedEditFile, setSelectedEditFile] = useState<File | null>(null);

  const [updateBanner, setUpdateBanner] = useState<Ianucios | undefined>(
    undefined
  );

  const [newAnucio, setNewAnucio] = useState<Ianucios>({
    id: 0,
    url: "",
    categoria: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AnuciosPhoto.getAll();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const openabrIanucios = () => {
    setNewAnucio({
      id: 0,
      url: "",
      categoria: 0,
    });
    setabrIanucios(true);
  };
  const editaNoticias = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedEditFile(event.files[0]);
    }
  };

  const handleeditar = (rowData: Ianucios) => {
    setUpdateBanner({ ...rowData });
    console.log(updateBanner);

    setEditDialog(true);
  };

  const handleFileUpload = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedFile(event.files[0]);
    }
  };

  const saveNewAnucio = async () => {
    try {
      const formData = new FormData();
      formData.append("categoria", newAnucio.categoria.toString());

      if (selectedFile) {
        formData.append("imagen", selectedFile);
      }

      const response = await AnuciosPhoto.create(formData);

      console.log("Resposta da API após salvar nova agenda:", response);

      document.location.reload();
      setData([...data, response.data]);
    } catch (error) {
      console.error("Erro ao criar nova agenda:", error);
    } finally {
      setabrIanucios(false);
    }
  };

  const saveUpdate = async () => {
    // Verifica se há uma notícia para editar
    if (!updateBanner) {
      console.error("Notícia não está disponível para edição.");
      return;
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!updateBanner.categoria) {
      console.error("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const formData = new FormData();
    formData.append("categoria", updateBanner.categoria.toString());

    if (selectedEditFile) {
      formData.append("imagen", selectedEditFile);
    }


    

    try {
      const response = await AnuciosPhoto.update(updateBanner.id, formData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updateBanner.id ? response.data : item
        )
      );
      setEditDialog(false);
      document.location.reload();

    } catch (error) {
      console.error("Erro ao atualizar recado:", error);
    }
  };

  const footer = `No total existem ${data ? data.length : 0} dados.`;
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Anucios</span>
      <div className="new_botao">
        <Button
          label="Nova"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={openabrIanucios}
        />
      </div>
    </div>
  );

  const imageTemplate = (rowData: Ianucios) => {
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

  const botoesAcaoes = (rowData: Ianucios) => {
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
          onClick={() => deleteBanner(rowData)}
        />
      </div>
    );
  };

  const deleteBanner = async (rowData: Ianucios) => {
    try {
      await AnuciosPhoto.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  return (
    <>
      <div className="card">
        <Card>
          {!loading && (
            <DataTable value={data} footer={footer} header={header}>
              <Column header="Imagem" body={imageTemplate}></Column>
              <Column field="categoria" header="Categoria" />

              <Column body={botoesAcaoes} header="Ações" />
            </DataTable>
          )}
        </Card>
      </div>

      <Dialog
        header="Nova Anucios"
        visible={abrIanucios}
        style={{ width: "50vw" }}
        modal
        onHide={() => setabrIanucios(false)}
      >
        <div className="fluidss p-fluid">
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
            <label htmlFor="categoria">Categoria</label>
            <InputNumber
              id="categoria"
              value={newAnucio.categoria}
              onValueChange={(e) =>
                setNewAnucio({
                  ...newAnucio,
                  categoria: e.value || 0,
                })
              }
            />
          </div>

          <div className="p-field">
            <Button label="Salvar" icon="pi pi-check" onClick={saveNewAnucio} />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Edita  Anucios"
        visible={editDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field upldImg">
            <FileUpload
              className="Upaloads"
              name="imagem"
              customUpload
              multiple
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
          <div className="p-field">
            <label htmlFor="categoria">Categoria</label>
            <InputNumber
              id="categoria"
              value={updateBanner?.categoria ?? 0}
              onValueChange={(e) =>
                setUpdateBanner((prev) => ({
                  ...prev,
                  categoria: e.value || 0,
                  id: prev?.id ?? 0, // Garante que id sempre tenha um número
                  url: prev?.url || "", // Garante que url seja uma string
                }))
              }
            />
          </div>

          <div className="p-field">
            <Button label="Salvar" icon="pi pi-check" onClick={saveUpdate} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Anucios;
