import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { AgendaDados } from ".././../../../servers/apiAxio";
import { useEffect, useState } from "react";
import { Iagenda } from "../../../../interfaces/agendas";

import { Button } from 'primereact/button';
        
import './index.css'

export default function AdminAgendas() {
  const [data, setData] = useState<Iagenda[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = (rowData: Iagenda) => {
    console.log("Deletar item:", rowData);
    // Adicione aqui a lógica para deletar o item, por exemplo, uma chamada de API para deletar o item do backend
  };

  const handleUpdate = (rowData: Iagenda) => {
    console.log("Atualizar item:", rowData);
    // Adicione aqui a lógica para atualizar o item, por exemplo, uma chamada de API para atualizar os dados do item
  };

  const actionBodyTemplate = (rowData: Iagenda) => {
    return (
      <div>
        <Button label="Edit" icon="pi pi-refresh" className="p-button-rounded p-button-success mr-2" onClick={() => handleUpdate(rowData)} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData)} />
      </div>
    );
  };

  return (
    <div className="card">
      <Card>
        {!loading && (
          <DataTable value={data} tableStyle={{ minWidth: "80rem" }}>
            <Column field="id" header="ID" />
            <Column field="nome" header="Nome" />
            <Column field="data" header="Data" />
            <Column field="descricao" header="Descrição" />
            <Column body={actionBodyTemplate} header="Ações" />
          </DataTable>
        )}
      </Card>
    </div>
  );
}
