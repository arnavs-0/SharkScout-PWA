import React from 'react';
import "./404.css";
import {Button} from "@material-ui/core";

export default function Page404() {
  return (
      <div className="section">
          <h1 className="error">404</h1>
          <div className="page">Page Not Found</div>
          <Button href="/" variant="contained" color="primary">Go Back Home</Button>
      </div>
  );
}