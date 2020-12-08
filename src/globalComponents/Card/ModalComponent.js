/**
 * Created by Ahlam on 24/01/2019.
 */
import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


class DialogBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }


    render() {
        if (this.props.type === "yesNo") {
            return (
                <div>
                    <Modal isOpen={this.props.isOpen}>
                        <ModalBody>
                            {this.props.message}
                        </ModalBody>
                        <ModalFooter>
                            <Button className={"btn-sm"} style={{paddingTop: 1, paddingBottom: 1}}
                                    onClick={e => this.props.toggleYes(e)}>yes</Button>{' '}
                            <Button className={"btn-sm"} style={{paddingTop: 1, paddingBottom: 1}}
                                    onClick={e => this.props.toggleNo(e)}>No</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
        else if (this.props.type === "Configuration") {
            return (
                <Modal className="modal-dialog modal-lg" isOpen={this.props.isOpen} modalTransition={{timeout: 1}}
                       backdropTransition={{timeout: 1}} style={this.props.style}>
                    <ModalHeader style={{padding: 5}} close={this.props.closeBtn}>
                        <span className={"card-title m-0"}> {this.props.headerName}</span>
                    </ModalHeader>
                    <ModalBody className={this.props.bodyStyle !== undefined ? this.props.bodyStyle : ''}>
                        {this.props.modalBody}
                    </ModalBody>
                    <ModalFooter>
                        <Button className={"btn-sm"} style={{paddingTop: 1, paddingBottom: 1}}
                                onClick={() => this.props.toggleSave()}>Save</Button>{' '}
                        <Button className={"btn-sm"} style={{paddingTop: 1, paddingBottom: 1}}
                                onClick={() => this.props.toggleCancel()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }
        // else if (this.props.type === "dashModalsXL") {
        //   return (
        //     <Modal className="modal-dialog modal-xl " isOpen={this.props.isOpen} modalTransition={{timeout: 1}}
        //            backdropTransition={{timeout: 1}}>
        //       <ModalHeader style={{padding: 5}} close={this.props.closeBtn}>
        //         <span className={"card-title m-0"}> {this.props.headerName}</span>
        //       </ModalHeader>
        //       <ModalBody
        //         className={this.props.darkMode ? "bg-dark" : "" + " " + this.props.bodyStyle !== undefined ? this.props.bodyStyle : ''}>
        //         {this.props.modalBody}
        //       </ModalBody>
        //     </Modal>
        //   )
        // }
        // else {
        //   return (
        //     <div>
        //       <Modal isOpen={this.props.isOpen} modalTransition={{timeout: 1}} backdropTransition={{timeout: 1}}>
        //         <ModalBody>
        //           {this.props.message}
        //         </ModalBody>
        //         <ModalFooter>
        //           <Button color={constantIcon.PRIMARY} className={"btn-sm"}
        //                   onClick={e => this.toggleYes(e)}>OK</Button>{' '}
        //         </ModalFooter>
        //       </Modal>
        //     </div>
        //   )
        // }

    }
}

export default DialogBox;

