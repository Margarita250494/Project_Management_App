"use client"

import { useGetTeamsQuery} from "@/state/api"
import { useAppSelector } from "../redux";
import { Header } from "../(components)/header";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { LoadingError } from "../(components)/loadingError/LoadingError";

const CustomToolBar = () => (
    <GridToolbarContainer className="toolbar flex gap-2">
        <GridToolbarFilterButton/>
        <GridToolbarExport/>
    </GridToolbarContainer>
)

const columns: GridColDef[] = [
    { field: "id", headerName: "Team ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 200 },
    { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
    {
      field: "projectManagerUsername",
      headerName: "Project Manager",
      width: 200,
    },
  ];


const Teams = () => {
    const {data: teams, isLoading, isError} = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state)=>state.global.isDarkMode);

    <LoadingError isLoading={isLoading} isError={isError || !teams} errorMessage="Error fetching teams."/>
  return (
    <section aria-labelledby="teams" className="flex w-full flex-col p-8">
        <Header name="Teams"/>
        <div style={{ height: "40.625rem", width: "100%" }}>
            <DataGrid
                rows={teams || []}
                columns={columns}
                pagination
                slots={{
                    toolbar:CustomToolBar,
                }}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}/>
        </div>
    </section>
  )
}

export default Teams