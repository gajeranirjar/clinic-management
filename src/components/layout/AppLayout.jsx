import { Outlet, useNavigation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Loading from "./Loading";

const AppLayout = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loading />;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default AppLayout;


