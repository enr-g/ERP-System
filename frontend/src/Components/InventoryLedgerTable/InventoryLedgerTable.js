import ListTable from "../ListTable/ListTable";
import ListTableIfEmpty from "../ListTableIfEmpty/ListTable";
import moment from "moment";

const InventoryLedgerTable = ({ tableData }) => {
  //create columns model
  const columns = [
    {
      Header: "Event Date",
      accessor: "event_date",
      Cell: (props) => {
        const custom_date = moment(props.value).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        );
        return <span>{custom_date}</span>;
      },
    },
    {
      Header: "Type",
      accessor: "event_type",
    },
    {
      Header: "Warehouse",
      accessor: "warehouse.name",
    },
    {
      Header: "Initial Stock Level",
      accessor: "stock_level_initial",
    },
    {
      Header: "Quantity Altered",
      accessor: "quantity_altered",
    },
    {
      Header: "Final Stock Level",
      accessor: "stock_level_final",
    },
  ];

  //table data if empy in order to avoid rendering problems
  const data_if_empty = [
    {
      name: "",
    },
  ];

  return (
    <div
      className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
    >
      {tableData?.length > 0 ? (
        <ListTable data={tableData} columns={columns}></ListTable>
      ) : (
        <ListTableIfEmpty
          data={data_if_empty}
          columns={columns}
        ></ListTableIfEmpty>
      )}
    </div>
  );
};

export default InventoryLedgerTable;
