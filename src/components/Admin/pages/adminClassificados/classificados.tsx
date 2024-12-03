import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import {
  Classificadoss,
  Classificadoimg,
} from "../../../../interfaces/classificados";
import { ICountry } from "../../../../interfaces/Country";
import {
  ClassificadosAxios,
  Classificadosimg,
} from "../../../../servers/apiAxio";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import "./classificados.css";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Messages } from "primereact/messages";
import { City } from "../../../../interfaces/City";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";

const Classificado = () => {
  const [data, setData] = useState<Classificadoss[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);

  const [atualizardialog, setAtualizardialog] = useState(false);
  const [classifcadosatualizar, setClassifcadosatualizar] =
    useState<Classificadoss | null>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const msgs = useRef<Messages>(null);
  const [imagensAssociadas, setImagensAssociadas] = useState<Classificadoimg[]>(
    []
  );

  const [NewCLassificados, setNewClassificados] = useState<Classificadoss>({
    id: 0,
    titulo: "",
    descricao: "",
    preco: 0,
    telefone: "",
    slug: "",
    cidade: "",
    data: null,
    email: "",
    estado: "",
    categoria: 0,
  });

  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const [selectedCountries, setSelectedCountries] = useState<ICountry[]>([]);
  const countries: ICountry[] = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  const cities: City[] = [
    { name: "Berlin", code: "Berlin" },
    { name: "Frankfurt", code: "Frankfurt" },
    { name: "Hamburg", code: "Hamburg" },
    { name: "Munich", code: "Munich" },
    { name: "Chicago", code: "Chicago" },
    { name: "Los Angeles", code: "Los Angeles" },
    { name: "New York", code: "New York" },
    { name: "San Francisco", code: "San Francisco" },
    { name: "Kyoto", code: "Kyoto" },
    { name: "Osaka", code: "Osaka" },
    { name: "Tokyo", code: "Tokyo" },
    { name: "Yokohama", code: "Yokohama" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ClassificadosAxios.getAll();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const NewDialog = () => {
    setDialog(true);
    setNewClassificados({
      id: 0,
      titulo: "",
      descricao: "",
      preco: 0,
      slug: "",

      telefone: "",
      cidade: "",
      data: null,
      email: "",
      estado: "",
      categoria: 0,
    });
  };

  const imageTemplate = (rowData: Classificadoss) => {
    const lastImage =
      rowData.classificadoImg && rowData.classificadoImg.length > 0
        ? rowData.classificadoImg[rowData.classificadoImg.length - 1]
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
  const handleeditar = (rowData: Classificadoss) => {
    setClassifcadosatualizar({ ...rowData });
    setImagensAssociadas(rowData.classificadoImg || []);

    const countryCode = rowData.estado;
    const countryName = rowData.cidade;

    const country = countries.find((c) => c.code === countryCode);

    const countryname = cities.find((c) => c.name === countryName);

    if (countryname) {
      setSelectedCities([countryname]);
    } else {
      setSelectedCities([]);
    }
    if (country) {
      setSelectedCountries([country]);
    } else {
      setSelectedCountries([]);
    }

    setAtualizardialog(true);
  };

  const saveNewClassificados = async () => {
    try {
      const response = await ClassificadosAxios.create({
        titulo: NewCLassificados.titulo,
        data: NewCLassificados.data,
        descricao: NewCLassificados.descricao,
        estado: selectedCountries.map((country) => country.code).join(", "),
        cidade: selectedCities.map((country) => country.name).join(", "),
        categoria: NewCLassificados.categoria,
        email: NewCLassificados.email,
        telefone: NewCLassificados.telefone,
        preco: NewCLassificados.preco,
      });

      console.log("Resposta da API após salvar nova cobertura:", response);

      const NewCLassificadosId = response.data;
      setData([...data, NewCLassificadosId]);

      setNewClassificados({
        id: 0,
        titulo: "",
        descricao: "",
        preco: 0,
        telefone: "",
        cidade: "",
        slug: "",

        data: null,
        email: "",
        estado: "",
        categoria: 0,
      });
      if (selectedFiles.length > 0) {
        await handleFileUpload(selectedFiles, NewCLassificadosId.id);
        setSelectedFiles([]);
      }

      setDialog(false);
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
    }
  };

  const handleFileUpload = async (files: File[], classificadoId: number) => {
    console.log("Iniciando upload de arquivos");
    setDialog(false);
    setAtualizardialog(false);

    try {
      if (!files || files.length === 0) {
        console.error("Nenhum arquivo selecionado.");
        return;
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("imagens", file);
      });

      if (classificadoId) {
        formData.append("classificado_id", classificadoId.toString());
      } else {
        console.error("Erro: ID da cobertura não encontrado.");
        return;
      }

      const response = await Classificadosimg.create(formData);
      console.log("Resposta do servidor:", response.data);

      if (response.data && response.data.savedImages) {
        console.log("Imagens salvas:", response.data.savedImages);
      }
    } catch (error) {
      console.error("Erro ao fazer upload de arquivos:", error);
    }
  };

  const saveUpdate = async () => {
    // Concatena os nomes das cidades e códigos dos países selecionados
    const valueCities = selectedCities.map((city) => city.name).join(", ");
    const valueCountries = selectedCountries
      .map((country) => country.code)
      .join(", ");

    console.log("novo valor para cidades:", valueCities);
    console.log("novo valor para estados:", valueCountries);

    if (classifcadosatualizar) {
      // Extrai `classificadoImg` e mantém o restante dos dados
      const { classificadoImg, ...classificadoData } = classifcadosatualizar;

      // Cria um novo objeto com os dados atualizados, excluindo `classificadoImg`
      const updatedClassificado: Classificadoss = {
        ...classificadoData,
        cidade: valueCities,
        estado: valueCountries,
      };

      console.log("Dados a serem salvos:", updatedClassificado);

      try {
        // Atualiza o classificado no banco de dados
        await ClassificadosAxios.update(
          updatedClassificado.id,
          updatedClassificado
        );

        // Atualiza o estado local com os dados atualizados
        setData((prevData) =>
          prevData.map((item) =>
            item.id === updatedClassificado.id ? updatedClassificado : item
          )
        );

        // Se houver arquivos selecionados, faz o upload
        if (selectedFiles.length > 0) {
          await handleFileUpload(selectedFiles, updatedClassificado.id);
          setSelectedFiles([]);
        }

        // Fecha o diálogo de atualização
        setAtualizardialog(false);

        console.log("Item atualizado:", updatedClassificado);
      } catch (error) {
        console.error("Erro ao atualizar o item:", error);
      }
    }
  };

  const footer = `No total existem ${data.length} dados.`;
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Classificados</span>
      <div className="new_botao">
        <Button
          label="Novo"
          icon="pi pi-book"
          onClick={NewDialog}
          className="new_classificado p-button-rounded p-button-success mr-2"
        />
      </div>
    </div>
  );

  const botoesAcaoes = (rowData: Classificadoss) => {
    return (
      <div className="action-buttons">
        <Button
          label="Editar"
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => handleeditar(rowData)}
        />
        <Button
          label="Deletar"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => deleteItem(rowData)}
        />
      </div>
    );
  };

  const deleteItem = async (rowData: Classificadoss) => {
    try {
      console.log(rowData);

      await ClassificadosAxios.delete(rowData.id);
      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));
      console.log("Item deletado:", rowData);
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const ICountryTemplate = (option: ICountry) => {
    const flagUrl = `https://flagcdn.com/w20/${option.code.toLowerCase()}.png`;
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src={flagUrl}
          className={`mr-2 flag`}
          style={{ width: "18px" }}
        />{" "}
        <div>{option.name}</div>
      </div>
    );
  };

  const handleImageDelete = async (rowData: Classificadoimg) => {
    try {
      await Classificadosimg.delete(rowData.id);

      setImagensAssociadas((prevImages) =>
        prevImages.filter((img) => img.id !== rowData.id)
      );

      setData((prevData) => prevData.filter((item) => item.id !== rowData.id));

      console.log("Imagem deletada com sucesso:", rowData);
    } catch (error) {
      console.error("Erro ao deletar a imagem:", error);
    }
  };

  const panelFooterTemplate = () => {
    const length = selectedCountries.length;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selecionado
        {length > 1 ? "s" : ""}.
      </div>
    );
  };

  return (
    <div className="card">
      <Card className="cadrResp">
        {!loading && (
          <DataTable
            className="datatable"
            value={data}
            footer={footer}
            header={header}
          >
            <Column field="titulo" header="Título" />
            <Column field="preco" header="Preço" />
            <Column field="telefone" header="Telefone" />
            <Column field="email" header="Email" />
            <Column field="cidade" header="Cidade" />
            <Column field="estado" header="Estado" />
            <Column field="categoria" header="Categoria" />
            <Column
              field="data"
              header="Data"
              body={(rowData) => moment(rowData.data).format("DD/MM/YYYY")}
            />
            <Column body={botoesAcaoes} header="Ações" />
          </DataTable>
        )}
      </Card>
      <Dialog
        header="Novo Classificado"
        visible={dialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setDialog(false)}
      >
        <div className="fluidss p-fluid">
          <div className="p-field">
            <label htmlFor="titulo">Título</label>
            <InputText
              id="titulo"
              value={NewCLassificados.titulo}
              onChange={(e) =>
                setNewClassificados({
                  ...NewCLassificados,
                  titulo: e.target.value,
                })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={NewCLassificados.email}
              onChange={(e) =>
                setNewClassificados({
                  ...NewCLassificados,
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
              value={NewCLassificados.telefone || ""}
              onChange={(e) =>
                setNewClassificados({
                  ...NewCLassificados,
                  telefone: e.target.value || "",
                })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="estado">Estado</label>
            <MultiSelect
              value={selectedCountries}
              options={countries}
              onChange={(e) => setSelectedCountries(e.value || [])}
              optionLabel="code"
              placeholder="Selecione os países"
              itemTemplate={ICountryTemplate}
              panelFooterTemplate={panelFooterTemplate}
              className="w-full md:w-20rem"
              display="chip"
            />
          </div>
          <div className="p-field">
            <label htmlFor="cidades">Cidades</label>
            <MultiSelect
              value={selectedCities}
              onChange={(e: MultiSelectChangeEvent) =>
                setSelectedCities(e.value)
              }
              options={cities}
              display="chip"
              optionLabel="name"
              placeholder="Select Cities"
              maxSelectedLabels={3}
              className="w-full md:w-20rem"
            />{" "}
          </div>{" "}
          <div className="p-field">
            <label htmlFor="preco">Preço</label>
            <InputNumber
              id="preco"
              value={NewCLassificados.preco}
              onValueChange={(e) =>
                setNewClassificados({
                  ...NewCLassificados,
                  preco: e.value || 0,
                })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="categoria">Categoria</label>
            <InputNumber
              id="categoria"
              value={NewCLassificados.categoria}
              onValueChange={(e) =>
                setNewClassificados({
                  ...NewCLassificados,
                  categoria: e.value || 0,
                })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="data">Data</label>
            <Calendar
              id="data"
              value={
                NewCLassificados.data ? new Date(NewCLassificados.data) : null
              }
              onChange={(e) =>
                setNewClassificados({ ...NewCLassificados, data: e.value })
              }
              showIcon
            />
          </div>
          <div className="p-field">
            <label htmlFor="descricao">Descrição</label>
            <FloatLabel>
              <InputTextarea
                id="descricao"
                value={NewCLassificados.descricao}
                onChange={(e) =>
                  setNewClassificados({
                    ...NewCLassificados,
                    descricao: e.target.value,
                  })
                }
                rows={5}
                cols={30}
              />
              <label htmlFor="descricao">Descrição</label>
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
          <div className="p-field upldImg"></div>
          <div className="p-field">
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={saveNewClassificados}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Editar Classificação"
        visible={atualizardialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setAtualizardialog(false)}
      >
        {classifcadosatualizar && (
          <div className="fluidss p-fluid">
            <div className="p-field">
              <label htmlFor="titulo">Título</label>
              <InputText
                id="titulo"
                value={classifcadosatualizar.titulo}
                onChange={(e) =>
                  setClassifcadosatualizar({
                    ...classifcadosatualizar,
                    titulo: e.target.value,
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={classifcadosatualizar.email}
                onChange={(e) =>
                  setClassifcadosatualizar({
                    ...classifcadosatualizar,
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
                mask="(99) 99999-9999"
                placeholder="(999) 999-9999"
                value={classifcadosatualizar.telefone || ""}
                onChange={(e) =>
                  setClassifcadosatualizar({
                    ...classifcadosatualizar,
                    telefone: e.target.value || "",
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="estado">Estado</label>
              <MultiSelect
                value={selectedCountries}
                options={countries}
                onChange={(e) => setSelectedCountries(e.value)}
                optionLabel="code"
                placeholder="Selecione os estados"
                itemTemplate={ICountryTemplate}
                panelFooterTemplate={panelFooterTemplate}
                className="w-full md:w-20rem"
                display="chip"
              />
            </div>{" "}
            <div className="p-field">
              <label htmlFor="cidades">Cidades</label>
              <MultiSelect
                value={selectedCities}
                onChange={(e: MultiSelectChangeEvent) =>
                  setSelectedCities(e.value)
                }
                options={cities}
                display="chip"
                optionLabel="name"
                placeholder="Select Cities"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
              />{" "}
            </div>{" "}
            <div className="p-field">
              <label htmlFor="preco">Preço</label>
              <InputNumber
                id="preco"
                value={classifcadosatualizar.preco}
                onValueChange={(e) =>
                  setClassifcadosatualizar({
                    ...classifcadosatualizar,
                    preco: e.value || 0,
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="categoria">Categoria</label>
              <InputNumber
                id="categoria"
                value={classifcadosatualizar.categoria}
                onValueChange={(e) =>
                  setClassifcadosatualizar({
                    ...classifcadosatualizar,
                    categoria: e.value || 0,
                  })
                }
              />
            </div>
            <div className="p-field">
              <label htmlFor="data">Data</label>
              <Calendar
                id="data"
                value={
                  classifcadosatualizar.data
                    ? new Date(classifcadosatualizar.data)
                    : null
                }
                onChange={(e) =>
                  setClassifcadosatualizar({
                    ...classifcadosatualizar,
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
                  id="descricao"
                  value={classifcadosatualizar.descricao}
                  onChange={(e) =>
                    setClassifcadosatualizar({
                      ...classifcadosatualizar,
                      descricao: e.target.value,
                    })
                  }
                  rows={5}
                  cols={30}
                />
                <label htmlFor="descricao">Descrição</label>
              </FloatLabel>
            </div>
            <div className="p-field upldImg ImgUpdate">
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
              <div className="Img_classificado">
                {imagensAssociadas.length > 0 ? (
                  imagensAssociadas.map((img) => (
                    <div key={img.id} className="image-classificado">
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
                        className="pi pi-trash buto_delete"
                      ></button>
                    </div>
                  ))
                ) : (
                  <p className="m-0">Nenhuma imagem associada.</p>
                )}
              </div>
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

export default Classificado;
