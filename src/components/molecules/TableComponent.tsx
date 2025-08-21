import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { TableActionSkeleton } from "./TableSkeleton";
import LinearSkeleton from "../ui/linear-skeleton";
import { getRandomWidth } from "@/helpers/randomWidthHelper";
import Pagination from "./Pagination";
import { LIMIT } from "@/constants/limit";

type TableComponentProps<T> = {
  columns: Array<ColumnDef<T>>;
  dataFetchService: any;
  additionalParams?: Record<string, any>;
  filters?: Record<string, any>;
  defaultSort?: { id: string; desc: boolean };
};

const TableComponent = <T,>({
  columns,
  dataFetchService,
  additionalParams,
  defaultSort,
  filters,
}: TableComponentProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>(
    defaultSort ? [defaultSort] : []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(LIMIT[25]);

  const getData = dataFetchService({
    page: currentPage,
    limit: itemsPerPage,
    enabled: true,
    ...additionalParams,
    ...filters,
  });

  const isLoading =
    getData.isLoading || getData.isFetching || status === "loading";
  const totalItems = getData.data?.totalData ?? 0;
  const data = isLoading ? Array(3).fill({}) : getData.data?.data || [];

  const getColumnSkeleton = (column: ColumnDef<T>) => {
    switch (column.id) {
      case "actions":
        return <TableActionSkeleton />;
      default:
        return (
          <LinearSkeleton
            className="h-3 rounded-lg"
            style={{ width: `${getRandomWidth()}px` }}
          />
        );
    }
  };

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => getColumnSkeleton(column),
          }))
        : columns,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      sorting: defaultSort ? [defaultSort] : [],
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
      },
    },
  });

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
    table.setPageSize(newItemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    table.setPageIndex(page - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (data.length === 0 && currentPage > 1) {
      setCurrentPage(1);
      table.setPageIndex(0);
    }
  }, [data, currentPage, table]);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : getData.isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Failed retriving data.
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default TableComponent;
