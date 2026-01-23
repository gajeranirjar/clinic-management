import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
