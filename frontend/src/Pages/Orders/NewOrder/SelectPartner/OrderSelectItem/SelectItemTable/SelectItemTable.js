import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
import { useMemo } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import Lens from "../../../../../..//Assets/Icons/search.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrderCheckedItem } from "../../../../../../Redux/Slices/orderCheckedItem";

function SelectItemTable(props) {
  const data = useMemo(() => props.data, [props.data]);

  const columns = useMemo(() => props.columns, []);

  //create input field for search
  function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    // const count = preFilteredRows.length;
    return (
      <div className="h-2">
        <input
          value={filterValue || ""}
          onChange={(e) => {
            setFilter(e.target.value || undefined);
          }}
          // placeholder={`Search ${count} records...`}
          // placeholder={`Search...`}
          className="float-left w-full mb-2 pl-6 text-textGrey focus:outline-buttonGrey"
        />
        <img
          className="relative left-2 bottom-8"
          src={Lens}
          alt={"Search..."}
        />
      </div>
    );
  }

  //apply search to every column
  const defaultColumn = useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );

  //checkbox component besides row
  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            type="checkbox"
            ref={resolvedRef}
            {...rest}
            className="text-drawGray"
          />
        </>
      );
    }
  );

  //create table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, //select all selects only the items in the current page
    // rows //select all selects all the items in the table
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount, //added
    gotoPage, //added
    nextPage,
    previousPage,
    setPageSize, //added
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageSize: 5 } }, //select how many rows per page to show
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          // Header: ({ getToggleAllPageRowsSelectedProps }) => (
          //   <div>
          //     {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
          //     <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          //   </div>
          // ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  //navigate to details page when clicking on a list item
  const location = useLocation();
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    navigate(location.pathname + "/" + row.id);
  };

  //update redux store when selecting a row with the checkbox
  const dispatch = useDispatch();
  const extractIdFromSelectedRows = () => {
    const selectedId = [];
    selectedFlatRows.map((row) => selectedId.push(row.original.id));
    dispatch(setOrderCheckedItem(selectedId));
  };
  useEffect(extractIdFromSelectedRows, [selectedFlatRows]);

  return (
    <div className="max-h-full">
      <div
        className="max-h-full overflow-y-scroll 
      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey
      bg-white"
      >
        <table {...getTableProps()}>
          <thead className="sticky top-0 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="px-2 align-bottom">
                    {/* putting a key={uuidv4()} inside <th> makes the filter lose focus after each keystroke*/}
                    <div
                      {...column.getHeaderProps(
                        column.getSortByToggleProps()
                      )} /*handle sorting*/
                      className="flex items-center"
                    >
                      <div className="float-left pt-2 pr-2 text-buttonGrey font-normal">
                        {column.render("Header")}
                      </div>
                      <div className="pt-3 h-7">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaChevronUp className="text-buttonGrey" />
                          ) : (
                            <FaChevronDown className="text-buttonGrey" />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="w-full py-3 font-normal">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        {...(index !== 0
                          ? { onClick: () => handleRowClick(row.original) }
                          : {})} /*exclude navigation to details page for the checkbox*/
                        className="px-2 py-2 border-t-2 border-drawGrey text-textGrey"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {pageOptions.length !== 1 ? (
          <div className="flex flex-row my-2 pb-6">
            <div>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="px-4 py-2 border-2 rounded-ifRadius border-drawGrey bg-white"
              >
                <FaChevronLeft className="text-drawGrey" />
              </button>
            </div>
            <div className="text-drawGrey pt-2 px-2">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </div>
            <div>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="px-4 py-2 border-2 rounded-ifRadius border-drawGrey bg-white"
              >
                <FaChevronRight className="text-drawGrey" />
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default SelectItemTable;
