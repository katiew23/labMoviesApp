import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface PaginationControlsProps {
  page: number;
  totalPages?: number;
  isPlaceholderData?: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  isPlaceholderData = false,
  setPage,
}) => {
  const isFirstPage = page === 1;
  const isLastPage = totalPages !== undefined && page >= totalPages;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        my: 3,
      }}
    >
      <Button
        variant="contained"
        onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 1))}
        disabled={isFirstPage}
      >
        Previous
      </Button>

      <Typography>
        Page {page}
        {totalPages ? ` of ${totalPages}` : ""}
      </Typography>

      <Button
        variant="contained"
        onClick={() => setPage((oldPage) => oldPage + 1)}
        disabled={isPlaceholderData || isLastPage}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;