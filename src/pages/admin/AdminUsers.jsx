import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Paper, Typography, IconButton, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../context/AuthContext";
import { updateUserRole, deleteUser, } from "../../api/admin";

const AdminUsers = ({ users }) => {
  const { user } = useAuth();

  const visibleUsers = users.filter((u) => u.uid !== user?.uid);

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
  };

  const handleDisableUser = async (userId) => {
    await deleteUser(userId);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Manage Users</Typography>

      {visibleUsers.length === 0 && (
        <Typography>No Users found.</Typography>
      )}

      {visibleUsers.length >= 1 && <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell width={80}>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {visibleUsers.map((user) => (
            <TableRow key={user.uid}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(
                      user.uid,
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="receptionist">Receptionist</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </TableCell>

              <TableCell>
                <IconButton color="error" onClick={() => handleDisableUser(user.uid)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }

    </Paper>
  );
};

export default AdminUsers;
