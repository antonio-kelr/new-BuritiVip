import { Card } from "primereact/card";
import "./banner.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Ibanner } from "../../../../interfaces";
import { useEffect, useRef, useState } from "react";
import { BannerPhotos } from "../../../../servers";
import { Dialog } from "primereact/dialog";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import axios from "axios";
import { InputNumber } from "primereact/inputnumber";
import { Messages } from "primereact/messages";

const Banner = () => {
  const [data, setData] = useState<Ibanner[]>([]);
  const [hasBanner, setHasBanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesRef = useRef<Messages>(null);

  const [abribanner, setabriBanner] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedEditFile, setSelectedEditFile] = useState<File | null>(null);

  const [updateBanner, setUpdateBanner] = useState<Ibanner | undefined>(
    undefined
  );

  const [banner, setBanner] = useState<Ibanner>({
    id: 0,
    categoria: 0,
    userId: 0,
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BannerPhotos.getAll();
        setData(response.data);
        console.log("Dados recebidos do backend:", response.data); // Ver os dados recebidos

        // Obtém o ID do usuário do localStorage
        const userId = localStorage.getItem("userId");
        console.log("ID do usuário obtido do localStorage:", userId);
        if (!userId) {
          console.warn("ID do usuário não encontrado no localStorage.");
          return;
        }

        // Verifica se o usuário já possui um banner
        const userBanners = response.data.filter(
          (banner: any) => banner.userId === Number(userId)
        );
        console.log("Banners do usuário:", userBanners); // Logs os banners do usuário

        if (userBanners.length > 0) {
          console.log(`O usuário com ID ${userId} já possui um banner.`);
          setHasBanner(true); // Atualiza o estado para indicar que o usuário já tem um banner
        } else {
          setHasBanner(false); // Atualiza o estado para indicar que o usuário não tem banner
        }
        const highestCategory = Math.max(
          0,
          ...response.data.map((banner: any) => banner.categoria)
        );
        console.log("Maior categoria existente:", highestCategory);
        setBanner((prev) => ({ ...prev, categoria: highestCategory + 1 }));
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const openabribanner = () => {
    if (hasBanner) {
      if (messagesRef.current) {
        messagesRef.current.show({
          severity: "info",
          summary: "Info",
          detail:
            "Parece que você já criou um banner! Apague o que você criou aí se quiser criar outro.",
          life: 4000,
        });
      }

      return; // Não abre o diálogo se o usuário já tem um banner
    }
    setBanner({
      id: 0,
      categoria: banner.categoria, // usa a categoria atual
      userId: 0,
      url: "",
    });
    setabriBanner(true);
  };

  const footer = `No total existem ${data ? data.length : 0} dados.`;
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Banners</span>
      <div className="new_botao">
        <Button
          label="Nova"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={openabribanner}
        />
      </div>
    </div>
  );

  const handleFileUpload = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedFile(event.files[0]);
    }
  };
  const handleeditar = (rowData: Ibanner) => {
    setUpdateBanner({ ...rowData });

    setEditDialog(true);
  };

  const editaBanner = (event: FileUploadSelectEvent) => {
    if (event.files && event.files[0]) {
      console.log("arquivo aqui", event.files);

      setSelectedEditFile(event.files[0]);
    }
  };

  const saveNewBanner = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("ID do usuário não encontrado.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoria", banner.categoria.toString());
      formData.append("userId", userId.toString());
      formData.append("imagen", selectedFile);
      console.log("id  saveNewBanner", userId);

      const response = await BannerPhotos.create(formData);
      setData([...data, response.data]);
    } catch (error) {
      console.error("Erro ao criar novo banner:", error);
    } finally {
      setabriBanner(false);
    }
  };
  const saveUpdate = async () => {
    console.log("Arquivo selecionado para upload:", selectedEditFile);

    // Verificação para garantir que `updateBanner` está definido
    if (!updateBanner) {
      console.error("Banner não selecionado para atualização.");
      return;
    }

    const formData = new FormData();
    formData.append("categoria", updateBanner.categoria.toString());

    if (selectedEditFile) {
      formData.append("imagen", selectedEditFile);
    }

    try {
      // Atualiza o banner no backend
      console.log("Dados enviados:", formData);
      const response = await BannerPhotos.update(updateBanner.id, formData);

      // Atualiza a tabela sem recarregar a página
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updateBanner.id ? response.data : item
        )
      );

      // Fecha o diálogo de edição
      setEditDialog(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao atualizar o banner:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
    }
  };

  const imageTemplate = (rowData: Ibanner) => {
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
  const botoesAcaoes = (rowData: Ibanner) => {
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

  const deleteBanner = async (rowData: Ibanner) => {
    try {
      await BannerPhotos.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  return (
    <>
        <div className="messagesRef">
          <Messages ref={messagesRef} />
        </div>
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
        header="Nova Agenda"
        visible={abribanner}
        style={{ width: "50vw" }}
        modal
        onHide={() => setabriBanner(false)}
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
              value={banner.categoria}
              onValueChange={(e) =>
                setBanner({
                  ...banner,
                  categoria: e.value || 0,
                })
              }
            />
          </div>

          <div className="p-field">
            <Button label="Salvar" icon="pi pi-check" onClick={saveNewBanner} />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Atualizar Banner"
        visible={editDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field upldImg">
            <FileUpload
              className="Upaloads"
              name="imagen"
              customUpload
              multiple={false}
              accept="image/*"
              maxFileSize={2000000}
              onSelect={editaBanner}
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
                  userId: e.value || 0,
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

export default Banner;
