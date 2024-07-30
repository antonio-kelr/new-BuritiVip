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

export default function AdminAgendas() {
  const [data, setData] = useState<Iagenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [agendaatualizada, setAgendaatualizada] = useState<Iagenda | null>(
    null
  );
  const [newAgendaDialog, setNewAgendaDialog] = useState(false);
  const [novaAgenda, setNovaAgenda] = useState<Iagenda>({
    id: 0,
    nome: "",
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
    setEditDialog(true);
  };

  const saveUpdate = async () => {
    console.log("Dados a serem salvos:", agendaatualizada);

    if (agendaatualizada) {
      try {
        await AgendaDados.update(agendaatualizada.id, agendaatualizada);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === agendaatualizada.id ? agendaatualizada : item
          )
        );
        setEditDialog(false);
        console.log("Item atualizado:", agendaatualizada);
      } catch (error) {
        console.error("Erro ao atualizar o item:", error);
      }
    }
  };

  const openNewAgendaDialog = () => {
    setNovaAgenda({ id: 0, nome: "", data: null, descricao: "" });
    setNewAgendaDialog(true);
  };

  const saveNewAgenda = async () => {
    try {
      console.log("Dados da nova agenda a serem salvos:", novaAgenda);

      const response = await AgendaDados.create({
        nome: novaAgenda.nome,
        data: novaAgenda.data,
        descricao: novaAgenda.descricao,
      });

      console.log("Resposta da API após salvar nova agenda:", response);

      setData([...data, response.data]); // Adiciona a nova agenda à lista
      setNewAgendaDialog(false);
      document.location.reload();
    } catch (error) {
      console.error("Erro ao criar nova agenda:", error);
    }
  };

  const botoesAcaoes = (rowData: Iagenda) => {
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
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Agendas</span>
      <div className="new_botao">
        <Button
          label="New"
          icon="pi pi-book"
          className="new_agenda p-button-rounded p-button-success mr-2"
          onClick={openNewAgendaDialog}
        />
      </div>
    </div>
  );

  const footer = `In total there are ${data ? data.length : 0} dados.`;

  return (
    <>
      <div className="card">
        <Card>
          {!loading && (
            <DataTable
              value={data}
              footer={footer}
              header={header}
            >
              <Column field="id" header="ID" />
              <Column field="nome" header="Nome" />
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
            <InputText
              id="descricao"
              value={novaAgenda.descricao}
              onChange={(e) =>
                setNovaAgenda({ ...novaAgenda, descricao: e.target.value })
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
              <InputText
                id="descricao"
                value={agendaatualizada.descricao}
                onChange={(e) =>
                  setAgendaatualizada({
                    ...agendaatualizada,
                    descricao: e.target.value,
                  })
                }
              />
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
