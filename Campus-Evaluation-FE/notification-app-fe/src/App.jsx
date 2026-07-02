import React, { Suspense } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";

const NotificationsPage = React.lazy(() => import("./pages/NotificationsPage"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">
            App crashed: {this.state.error?.message || "Unknown error"}
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        }
      >
        <NotificationsPage />
      </Suspense>
    </ErrorBoundary>
  );
}