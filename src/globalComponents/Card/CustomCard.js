import React from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import PureComponent from "../../utils/PureComponent";

class CustomCard extends PureComponent {

  render() {
    let cardHeader ="";

    if(this.props.isHeader === 1){
      cardHeader= <CardHeader className={this.props.cardHeaderClass!== undefined? this.props.cardHeaderClass : ""}>

        {this.props.customHeader !== undefined ? this.props.customHeader : " "}

      </CardHeader>
    }

    return (
      <Card className={this.props.cardClass !== undefined ?this.props.cardClass:" " + " "} style={this.props.cardStyle}>
        {cardHeader}
        {this.props.isHeader === 3 ?  <hr className={"mt-0 mb-0"}/>:""}
        <CardBody className={this.props.cardBodyClass!== undefined? this.props.cardBodyClass :" " +" "+ this.props.spacing !== undefined ? this.props.spacing : ""}>
          {this.props.children}
        </CardBody>
      </Card>
    )


  }
}

export default CustomCard;
