import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export function NotificationCard({ notification }) {
  const { title, message, timestamp, type } = notification || {};
  return (
    <Paper elevation={1} style={{ padding: 12 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {title ?? type ?? "Notification"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {message ?? notification?.body ?? "No details"}
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary">
          {timestamp ? new Date(timestamp).toLocaleString() : ""}
        </Typography>
      </Box>
    </Paper>
  );
}

export default NotificationCard;
