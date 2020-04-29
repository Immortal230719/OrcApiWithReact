import React from "react";
import Container from "@material-ui/core/Container";

const Layout = ({ children, className, ...props }) => {
  return (
    <Container {...props} className={className} maxWidth="lg">
      {children}
    </Container>
  );
};

export default Layout;
