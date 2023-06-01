import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${"#527273"} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${"#141b2d"} ${angle}deg 360deg),
            ${"#DE9E41"}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;