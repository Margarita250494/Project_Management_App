import StoreProvider from "../redux"
import { DashboardLayout } from "./DashboardLayout"


export const DashboardWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <StoreProvider>
        <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

