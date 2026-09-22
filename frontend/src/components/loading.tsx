import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

function Loading() {
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
        background:
          "linear-gradient(165deg, #241A16 0%, #1A120F 55%, #120C0A 100%)",
      }}
    >
      {/* Logo mark with pulse ring */}
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
          <StorefrontRoundedIcon sx={{ color: "#2F211C", fontSize: 34 }} />
        </Box>
      </Box>

      {/* Spinner dots */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#D7B08A",
              animation: "dotBounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </Box>

      <Typography
        sx={{
          color: "#F1E7DF",
          fontWeight: 600,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
        }}
      >
        Loading your store...
      </Typography>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}

export default Loading;
