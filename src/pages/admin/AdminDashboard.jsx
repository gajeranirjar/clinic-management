import { Tabs, Tab, Box, Typography, Paper, } from "@mui/material";
import { useState, useEffect } from "react";
import AdminUsers from "./AdminUsers";
import AdminDoctors from "./AdminDoctors";
import AdminReceptionists from "./AdminReceptionists";
import { fetchAllUsers } from "../../api/admin";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const loader = fetchAllUsers(setUsers);
    return () => loader();
  }, []);

  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h4" mb={3}>
        Admin Panel
      </Typography>

      <Paper sx={{ borderRadius: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
        >
          <Tab label="Users" />
          <Tab label="Doctors" />
          <Tab label="Receptionists" />
        </Tabs>
      </Paper>

      <Box mt={3}>
        {tab === 0 && <AdminUsers users={users} />}
        {tab === 1 && <AdminDoctors users={users} />}
        {tab === 2 && <AdminReceptionists users={users} />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
