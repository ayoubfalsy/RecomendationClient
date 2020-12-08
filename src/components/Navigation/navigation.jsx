import React  from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Row,Button,Container
} from 'reactstrap';
import DialogBox from "../../globalComponents/FormValidation/DialogBox";
import {loginCheckPwdRequest, loginOutUserRequest} from "../Login/LoginAction";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import {isImmEmpty} from "../../globalComponents/utils/HelperFunctions";
import PureComponent from "../../globalComponents/utilsComponant/PureComponent";
import history from "../../history";
import FormPassword from "../../globalComponents/FormPassword/FormPassword";

class Navigation extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            isOpenModel:false,
            password: this.passwdInitial(),
            validateOldPwd:false,
            validateNewPwd:false,
            validateConfirmPwd:false,
            validateNewConfirm:false,
            typeResponse:0

        }
    }

    navigationProfile =()=>{
        try{
            history.push("/Profile");
        }catch(e){
            console.log(e)
        }
    }
    navigationHome =()=>{
        try{
            history.push("/");
        }catch(e){
            console.log(e)
        }
    }
    passwdInitial = () =>{
      return fromJS({
          email: localStorage.getItem('email'),
          oldPwd: "",
          newPwd: "",
          confirmPwd: "",
          type: 0
      })
};
    toggle = ()=>{
        this.setState({isOpen:!this.state.isOpen})
    };

    toggleCancel = () => {
        this.setState({isOpenModel:!this.state.isOpenModel,
            password:this.passwdInitial(),
            validateOldPwd:false,
            validateNewPwd:false,
            validateConfirmPwd:false,
            validateNewConfirm:false,
            typeResponse:0})

    };

    deconnexion = () =>{
      try{
        this.props.dispatch(loginOutUserRequest(localStorage.getItem("email")))
      }catch(e){
        console.log(e)
      }
    };

    setPassword = (e) => {
      try{
        let password = this.state.password;
        const{value,name}=e.target;
          password = password.set(name,value);
          this.setState({password})
      }catch(e){
        console.log(e)
      }
    };

    validateNewConfirm = () =>{
      try{
        const {password}=this.state;
        if(password.get('newPwd') !== password.get('confirmPwd'))
        {
            this.setState({validateNewConfirm:true,validateOldPwd:false,
                validateNewPwd:false,
                validateConfirmPwd:false,typeResponse:0});
            return true;
        }
        else
        {
            this.setState({validateNewConfirm:false,validateOldPwd:false,
                validateNewPwd:false,
                validateConfirmPwd:false,typeResponse:0});
            return false;
        }
      }catch(e){
        console.log(e)
      }
};

    resetPassword = () => {
        try{
          const{password}=this.state;
          if(!this.validateOld(password.get('oldPwd')) && !this.validateNew(password.get('newPwd')) && !this.validateConfirm(password.get('confirmPwd')))
          {
            if(!this.validateNewConfirm()){
                this.setState({
                    password:this.passwdInitial(),
                    validateOldPwd:false,
                    validateNewPwd:false,
                    validateConfirmPwd:false,
                    validateNewConfirm:false,
                    typeResponse:0})
                this.props.dispatch(loginCheckPwdRequest(this.state.password.toJS()))

            }
          }
        }catch(e){
            console.log(e)
        }
    };

    validateOld=(value)=>{
        try{
            if(value.trim() !== "") {
                this.setState({validateOldPwd:false,validateNewConfirm:false,typeResponse:0});
                return false;
            }
            this.setState({validateOldPwd:true,validateNewConfirm:false,typeResponse:0});
            return true
        }catch(e){
            console.log(e)
        }
    };
    validateNew=(value)=>{
        try{
            if(value.trim() !== "") {
                this.setState({validateNewPwd:false,validateNewConfirm:false,typeResponse:0});
                return false;
            }
            this.setState({validateNewPwd:true,validateNewConfirm:false,typeResponse:0});
            return true
        }catch(e){
            console.log(e)
        }
    };
    validateConfirm=(value)=>{
        try{
            if(value.trim() !== "") {
                this.setState({validateConfirmPwd:false,validateNewConfirm:false,typeResponse:0});
                return false;
            }
            this.setState({validateConfirmPwd:true,validateNewConfirm:false,typeResponse:0});
            return true
        }catch(e){
            console.log(e)
        }
    };

    componentWillReceiveProps(newProps) {
        try {
            if(!isImmEmpty(newProps.pwdDetails)){
              this.setState({typeResponse:newProps.pwdDetails.get('type')},()=>{
                if(this.state.typeResponse === 1 || this.state.typeResponse === 2){
                  this.setState({validateNewConfirm:false})
                }
              })
            }

        } catch (e) {
            console.log(e)
        }
    }
  render() {
      const {isOpenModel,isOpen,password,validateOldPwd,validateNewPwd,validateConfirmPwd,validateNewConfirm,typeResponse}=this.state;
      const {loadingPwd}=this.props;
      let header = <div className={'mt-1'}>mot de passe</div>;
      let closeBtn = <Button className={"fa fa-times ml-3"}
                             color={"link"}
                             size="sm"
                             onClick={()=>this.toggleCancel()}
                             title={"cancel"}/>;
      let body = <FormPassword
          loadingPwd={loadingPwd}
          validateNewConfirm={validateNewConfirm}
          typeResponse={typeResponse}
          password={password}
          setPassword={this.setPassword}
          resetPassword={this.resetPassword}
          validateOldPwd={validateOldPwd}
          validateNewPwd={validateNewPwd}
          validateConfirmPwd={validateConfirmPwd}
      />;
    return (
        <Container >
            <DialogBox type={"Configuration"}
                       isOpen={isOpenModel}
                       toggleCancel={this.toggleCancel}
                       headerName={header}
                       modalBody={body}
                       closeBtn={closeBtn}
            />
            <Navbar color="light" expand="md">
                <NavbarBrand onClick={()=> this.navigationHome()}>reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                    </Nav>
                    <NavbarText>
                        <Row>
                            <UncontrolledDropdown>
                                <DropdownToggle nav >
                                    <i className={"fa fa-bell"} title={"notification"}
                                        // onClick={() => [this.props.hideNotif(), this.props.hideAlarm(), this.props.showHideUser()]}
                                       style={{cursor: 'pointer',fontSize:20, color:"#5891ff"}}/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Notification
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown style={{textAlign:"right"}}>
                                <DropdownToggle nav >
                                    <i className={"fa fa-user"} title={"parametre"}
                                       style={{cursor: 'pointer',fontSize:20,color:"#5891ff"}}/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <span onClick={()=> this.navigationProfile()}> profile</span>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <span onClick={()=>this.toggleCancel()}> mot de passe</span>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <span onClick={()=>this.deconnexion()}> Deconnexion</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Row>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </Container>
    );
  }
}
const mapStateToProps = (state) => ({
    pwdDetails: state.getIn(['LoginReducer', 'pwdDetails']),
    loadingPwd: state.getIn(['LoginReducer', 'loadingPwd']),

})
export default connect(mapStateToProps) (Navigation);
