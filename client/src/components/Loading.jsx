import { Stack, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
 
    return (
      <Stack
        direction="column"
        width="100%"
        height="100%"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h2">Loading...</Typography>
      </Stack>
    );
  
};

export default Loading;
