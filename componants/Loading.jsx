import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Loading = (props) => {
  return (
    <div className="row">
      <div className={props.grid} style={{borderRadius:'10px'}}>
        <Stack spacing={1} >
          <Skeleton variant="rectangular" height={150} /> 
          <Skeleton variant="text" />
          <Skeleton variant="text" width={60}/>
        </Stack>
      </div>
      <div className={props.grid} style={{borderRadius:'10px'}}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={150} /> 
          <Skeleton variant="text" />
          <Skeleton variant="text" width={60}/>
        </Stack>
      </div>
      <div className={props.grid} style={{borderRadius:'10px'}}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={150} /> 
          <Skeleton variant="text" />
          <Skeleton variant="text" width={60}/>
        </Stack>
      </div>
      <div className={props.grid} style={{borderRadius:'10px'}}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={150} /> 
          <Skeleton variant="text" />
          <Skeleton variant="text" width={60}/>
        </Stack>
      </div>
      <div className={props.grid} style={{borderRadius:'10px'}}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={150} /> 
          <Skeleton variant="text" />
          <Skeleton variant="text" width={60}/>
        </Stack>
      </div>
    </div>
  );
};

export default Loading;
