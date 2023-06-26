import ListTable from "../../../../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../../../../Components/ListTableIfEmpty/ListTable";

const ItemsToAssignTable = ({tableData}) => {


    //create columns model
    const columns = [
        {
            Header: "Model",
            accessor: "item_model.name",
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "SKU",
            accessor: "sku",
        },
        {
            Header: "Stock Level",
            accessor: "stock_level_total_current",
        },
        {
            Header: "Sale Price",
            accessor: "item_specifications[0].sale_price_net_eur",
        },
        {
            Header: "Puchase Price",
            accessor: "item_specifications[0].purchase_price_net_eur",
        },
        {
            Header: "Size",
            accessor: "item_specifications[0].size",
        },
    ];

    //table data if empy in order to avoid rendering problems

    const data_if_empty = [{
        name: ""
    }]

    return (
        <div>
            {
                (tableData?.length > 0) ?
                    <ListTable data={tableData} columns={columns}></ListTable> :
                    <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
            }
        </div>
    );
}

export default ItemsToAssignTable