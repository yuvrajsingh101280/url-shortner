import React, { useEffect, useState } from "react";
import FormContainer from "../FormContainer/FormContainer";
import { urlData } from "../../interface/urlData";
import axios from "axios";
import DataTable from "../DataTable/DataTable";

type Props = {};

const Container = (props: Props) => {
  const [data, setData] = useState<urlData[]>([]);

  const fetchTableData = async () => {
    const response = await axios.get("http://localhost:8000/api/shortUrl");

    console.log(response);
    setData(response.data);
  };
  useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <div className="">
      <FormContainer />
      <DataTable data={data} />
    </div>
  );
};

export default Container;
