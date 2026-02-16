import { Paper, Typography, List, ListItem, ListItemText, Avatar, Stack, Divider, } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const AdminReceptionists = ({ users }) => {
  const receptionists = users
    .filter((u) => u.role === "receptionist")
    .sort((a, b) => a.email.localeCompare(b.email));

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Receptionists
      </Typography>

      {receptionists.length === 0 && (
        <Typography>No receptionist found.</Typography>
      )}

      <List>
        {receptionists.map((r) => (
          <div key={r.uid}>
            <ListItem>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>
                  <SupportAgentIcon />
                </Avatar>
                <ListItemText primary={r.email} />
              </Stack>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default AdminReceptionists;
