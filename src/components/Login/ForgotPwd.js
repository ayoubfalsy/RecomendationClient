import React  from "react";
import "./loginCss.scss"
import PureComponent from "../../globalComponents/utilsComponant/PureComponent";
import history from "../../history";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import {Spin} from "antd";
import { Col,Row,Input,FormFeedback,Alert} from 'reactstrap';
import {loginForgotRequest} from "./LoginAction";

 class ForgotPwd extends PureComponent {
     constructor(props){
         super(props);
         this.state={
             objInsc:fromJS({email:""}),
             validateEmail:false
         }
     }
    navigation=(e)=>{
        try{
            e.preventDefault();
            history.push("/Inscription")
        }catch(e){
            console.log(e)
        }
    };
     navigationLogin=(e)=>{
         try{
             e.preventDefault();
             history.push("/LoginUser")
         }catch(e){
             console.log(e)
         }
     };
     setEmailPwd =(e)=>{
         try{
             let objInsc = this.state.objInsc;
             let {name,value} = e.target;
             objInsc = objInsc.set(name,value);
             this.setState({objInsc})
         }catch(e){
             console.log(e)
         }
     };
     validateEmail  = (value) =>{
         try{
             if(value.trim() !== "") {
                 this.setState({validateEmail:false});
                 return false;
             }
             this.setState({validateEmail:true});
             return true
         }catch(e){
             console.log(e)
         }
     }
     onCreateUser = ()=>{
         try{
             let  objInsc = this.state.objInsc;
             objInsc = objInsc.set("email",objInsc.get('email').toLowerCase())
             if(!this.validateEmail(objInsc.get('email')))
             {
               this.props.dispatch(loginForgotRequest(objInsc.get('email')));
             }
         }catch (e){
             console.log(e)
         }
     }
    render() {
        const {objInsc,validateEmail}=this.state;
        const {lodingForgot,forgotValue}=this.props;
        return (
            <Spin tip="Veuillez patienter quelques instants" spinning={lodingForgot}>

            <div className="registration-form backLogin"   >
                            <form>
                                {
                                    forgotValue ?
                                        <Alert color="success">
                                            Votre mot de passe a été envoyé a votre email
                                        </Alert> : forgotValue === false ?
                                        <Alert color="danger">
                                        Votre email n'est pas existe
                                        </Alert> :
                                    null
                                }

                                <div className={"pb-2"}>
                                    <Input type="email"
                                           id="username"
                                           name={"email"}
                                           placeholder="Votre Email"
                                           value={objInsc.get('email')}
                                           onChange={(e)=> this.setEmailPwd(e)}
                                           invalid={validateEmail}
                                    />
                                    <FormFeedback className="has-danger">Email ne peut pas etre vide</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <button type="button"
                                            className="btn btn-block create-account"
                                            onClick={()=> this.onCreateUser()}>
                                        Connexion
                                    </button>
                                </div>
                                <Row>
                                    <Col md="6" lg="6" sm="6" xl="6" xs="6">
                                        <a href="/#"  onClick={(e)=> this.navigationLogin(e)}>
                                            <u>Authentification</u>
                                        </a>
                                    </Col>
                                    <Col md="6" lg="6" sm="6" xl="6" xs="6">
                                        <a href="/#" onClick={(e)=> this.navigation(e)}>
                                            <u>Cree un Compte</u>
                                        </a>
                                    </Col>
                                </Row>
                            </form>
                        </div>
            </Spin>

        );
    }
}
const mapStateToProps = (state) => ({
    errorsLogin: state.getIn(['LoginReducer', 'errorsLogin']),
    forgotValue: state.getIn(['LoginReducer', 'forgotValue']),
    lodingForgot: state.getIn(['LoginReducer', 'lodingForgot']),
})
export default connect(mapStateToProps)(ForgotPwd)
