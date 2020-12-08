import React from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import PureComponent from "../utilsComponant/PureComponent";

class CardComponent extends PureComponent {

  render() {
    let cardHeader = "";
    //let style = this.props.cardStyle !== undefined ? this.props.cardStyle : " ";
    if (this.props.isHeader === 1) {
      cardHeader = <CardHeader className={this.props.cardHeaderClass !== undefined ? this.props.cardHeaderClass : ""}>
        <b className={"card-title"}>{this.props.title !== undefined ? this.props.title : " "}</b>

        {this.props.actions !== undefined ? this.props.actions : " "}

      </CardHeader>
    }
    if (this.props.isHeader === 0) {
      cardHeader = " ";
    }
    if (this.props.isHeader === 3) {
      cardHeader = this.props.customHeader;
    }
    return (
      <Card className={this.props.cardClass !== undefined ? this.props.cardClass : " "} style={this.props.cardStyle}>
        {cardHeader}
        {this.props.isHeader === 3 ? <hr className={"mt-0 mb-0"}/> : ""}
        <CardBody
          className={this.props.cardBodyClass !== undefined ? this.props.cardBodyClass : this.props.spacing !== undefined ? this.props.spacing : ""}>
          {this.props.children}
        </CardBody>
      </Card>
    )
  }
}

export default CardComponent;
