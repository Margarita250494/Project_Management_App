"use client";

import { useGetUsersQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import { Header } from "../(components)/header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { LoadingError } from "../(components)/loadingError/LoadingError";

const CustomToolBar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.userName || "User profile picture"}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  <LoadingError
    isLoading={isLoading}
    isError={isError || !users}
    errorMessage="Error fetching users."
  />;

  return (
    <section aria-labelledby="users" className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: "40.625rem", width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolBar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </section>
  );
};

export default Users;
