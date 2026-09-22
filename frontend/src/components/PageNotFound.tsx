import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

interface PageNotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

function PageNotFound({
  title = "Page Not Found",
  message = "Something went wrong while loading this page. Please try again.",
  showHomeButton = true,
}: PageNotFoundProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
        px: 2,
        background:
          "linear-gradient(165deg, #241A16 0%, #1A120F 55%, #120C0A 100%)",
      }}
    >
      {/* Icon mark with pulse ring */}
      <Box sx={{ position: "relative", width: 72, height: 72 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "18px",
            border: "2px solid #D7B08A",
            opacity: 0.6,
            animation: "pulseRing 1.6s ease-out infinite",
          }}
        />
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "18px",
            background: "linear-gradient(145deg, #E7C9AA 0%, #C79A6C 100%)",
            border: "1px solid rgba(255,255,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(199,154,108,0.35)",
          }}
        >
          <SentimentDissatisfiedRoundedIcon
            sx={{ color: "#2F211C", fontSize: 34 }}
          />
        </Box>
      </Box>

      {/* 404 */}
      <Typography
        sx={{
          color: "#D7B08A",
          fontWeight: 800,
          fontSize: "2.5rem",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        404
      </Typography>

      <Typography
        sx={{
          color: "#F1E7DF",
          fontWeight: 600,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#AFA097",
          fontSize: "0.85rem",
          letterSpacing: "0.01em",
          textAlign: "center",
          maxWidth: 380,
          lineHeight: 1.6,
        }}
      >
        {message}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        pt={1}
        width={{ xs: "100%", sm: "auto" }}
      >
        <Button
          variant="contained"
          startIcon={<RefreshRoundedIcon />}
          onClick={handleRefresh}
          sx={{
            background: "linear-gradient(145deg, #E7C9AA 0%, #C79A6C 100%)",
            color: "#2F211C",
            px: 3,
            py: 1,
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "none",
            boxShadow: "0 8px 24px rgba(199,154,108,0.35)",
            "&:hover": {
              background: "linear-gradient(145deg, #EFD6BA 0%, #D7B08A 100%)",
            },
          }}
        >
          Refresh Page
        </Button>

        {showHomeButton && (
          <Button
            variant="outlined"
            startIcon={<HomeRoundedIcon />}
            onClick={handleGoHome}
            sx={{
              color: "#E8D5C4",
              borderColor: "rgba(215, 190, 165, 0.35)",
              px: 3,
              py: 1,
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "none",
              "&:hover": {
                borderColor: "#E8D5C4",
                backgroundColor: "rgba(215, 190, 165, 0.08)",
              },
            }}
          >
            Go Home
          </Button>
        )}
      </Stack>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </Box>
  );
}

export default PageNotFound;
