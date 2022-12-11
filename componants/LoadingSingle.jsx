import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const LoadingSingle = (props) => {
  return (
    <div className="row justify-content-center mt-5">
      <div
        className="col-11 col-lg me-md-3 bg-white p-3"
        style={{ borderRadius: "10px" }}
      >
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={400} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width={60} />
        </Stack>
      </div>
      <div
        className="col-11 col-lg-4 mt-4 mt-lg-0  bg-white p-3"
        style={{ borderRadius: "10px" }}
      >
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width={150} />
        </Stack>
      </div>
    </div>
  );
};

export default LoadingSingle;
