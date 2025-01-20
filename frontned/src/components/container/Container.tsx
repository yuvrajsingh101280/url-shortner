import { useEffect, useState } from "react";
import FormContainer from "../FormContainer/FormContainer";
import { urlData } from "../../interface/urlData";
import axios from "axios";
import DataTable from "../DataTable/DataTable";

const Container = () => {
  const [data, setData] = useState<urlData[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const updateReloadState = (): void => {
    setReload(true);
  };
  const fetchTableData = async () => {
    const response = await axios.get("http://localhost:8000/api/shortUrl");

    console.log(response);
    setData(response.data);
    setReload(false);
  };
  useEffect(() => {
    fetchTableData();
  }, [reload]);
  return (
    <div className="">
      <FormContainer updateReloadState={updateReloadState} />
      <DataTable updateReloadState={updateReloadState} data={data} />
    </div>
  );
};

export default Container;
