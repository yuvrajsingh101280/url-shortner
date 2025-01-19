import React from "react";
import { urlData } from "../../interface/urlData";
import { Link } from "react-router-dom";

interface IDataTableProps {
  data: urlData[];
}

const DataTable = (props: IDataTableProps) => {
  const { data } = props;

  const renderTableData = () => {
    return data.map((item) => {
      return (
        <tr
          key={item._id}
          className="border-b text-white bg-gray-600 hover:bg-white hover:text-gray-800"
        >
          <td className="px-6 py-3 break-words">
            <Link to={item.fullUrl} target="_blank" rel="noreferrer noopener">
              {item.fullUrl}
            </Link>
          </td>
          <td className="px-6 py-3 break-words">
            <Link
              to={`http://localhost:8000/shortUrl/${item.shortUrl}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {item.shortUrl}
            </Link>
          </td>

          <td className="px-6 py-3">{item.clicks}</td>
          <td className="px-6 py-3">{}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container mx-auto pt-2 pb-18">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-md text-gray-50 bg-gray-700">
            <tr>
              <th scope="col" className="px=6 py-3 w-6/12">
                FullUrl
              </th>
              <th scope="col" className="px=6 py-3 w-6/12">
                Shorturl
              </th>
              <th scope="col" className="px-6 py-3 w-6/12 ">
                clicks
              </th>
              <th scope="col" className="px-6 py-3 w-6/12 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
