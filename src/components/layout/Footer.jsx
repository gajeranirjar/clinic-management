// import {useState} from "react";
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// export const Footer = () => {

//   const [value, setValue] = useState(0);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
//         <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
//         <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
//       </BottomNavigation>
//     </Box>
//   );
// };

import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box textAlign="center" p={2} bgcolor="#f5f5f5">
      <Typography variant="body2">
        © 2026 Clinic Management System
      </Typography>
    </Box>
  );
};