import axios from "axios";
import { Card } from 'primereact/card';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import Iagenda from "../../../../interfaces/agendas";

export default function AdminAgendas() {
  const [data, setData] = useState<Iagenda[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/agendas");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Data:", data);

  return (
    <div className="card">
      <Card>
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="id"></Column>
          <Column field="nome" header="nome"></Column>
          <Column field="data" header="data"></Column>
          <Column field="descricao" header="descricao"></Column>{" "}
        </DataTable>
      </Card>
    </div>
  );
}
