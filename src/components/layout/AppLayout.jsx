import { Outlet, useNavigation } from "react-router-dom";
import { Footer } from "./Footer"
import { Header } from "./Header"
import Loading  from "./Loading";
import { Box } from "@mui/material";


const AppLayout = () => {
    const navigate = useNavigation();
    if (navigate.state === "loading") return <Loading />

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box component="main" flexGrow={1} p={2}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}

export default AppLayout;