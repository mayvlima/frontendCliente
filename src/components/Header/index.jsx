import React from "react";

// reactstrap components
import {  Container } from "reactstrap";
import "./styles.scss"

class Header extends React.Component {
  render() {
    return (
      <>
        <div  className="header header-background pb-6 pb-md-5 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
