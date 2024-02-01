import * as React from "react";
import { Box, Typography } from "@mui/material";
import { theme } from "../../constants/theme";

/**
 * Footer component is used to display the footer
 */
const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: theme.color.white,
      }}
    >
      <Typography>Copyright © 2023</Typography>
    </Box>
  );
};

export default Footer;
