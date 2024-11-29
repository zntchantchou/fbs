"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "model",
    headerName: "Model",
    width: 200,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
  },
  {
    field: "category",
    headerName: "Category",
    width: 110,
    valueGetter: (_, row) => `${row.category.name}`,
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    width: 150,
    type: "number",
  },
  {
    field: "timestamp",
    headerName: "Created at",
    width: 150,
    type: "string",
    valueGetter: (_, row) => {
      const asDate = new Date(row.timestamp);
      const formatted = `${asDate.getDate()}/${asDate.getMonth()}/${asDate.getFullYear()}`;
      return formatted.toString();
    },
  },
];

function Products() {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const router = useRouter();
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="py-4 text-center text-red-500">Failed to fetch...</div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between">
        <Header name="Products" />
        <button
          className="py-3 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          onClick={() => router.push("/admin/products/create")}
        >
          Create a product
          <CirclePlus height={15} className="text-white" />
        </button>
      </div>
      <DataGrid
        rows={products}
        onRowClick={(params) =>
          router.push("/admin/products/edit/" + params.id)
        }
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 cursor-pointer"
      />
    </div>
  );
}

export default Products;
