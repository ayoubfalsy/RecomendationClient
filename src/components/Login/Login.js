import React  from "react";
import "./loginCss.scss"
import PureComponent from "../../globalComponents/utilsComponant/PureComponent";
import history from "../../history";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import {Spin} from "antd";
import { Col,Row,Input,FormFeedback,Alert} from 'reactstrap';
import {loginUserRequest, setErrorsMsg} from "./LoginAction";


 class Login extends PureComponent {
     constructor(props){
         super(props);
         this.state={
             objInsc:fromJS({email:"", password:""}),
             validatePwd:false,
             validateEmail:false
         }
     }
     componentDidMount(){
         this.props.dispatch(setErrorsMsg())
     }
    navigation=(e)=>{
        try{
            e.preventDefault();
            history.push("/Inscription")
        }catch(e){
            console.log(e)
        }
    };
     navigationMdpOublie=(e)=>{
        try{
            e.preventDefault();
            history.push("/Mdpoublier")
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
     validatePwd  = (value) =>{
         try{
             if(value.trim() !== "") {
                 this.setState({validatePwd:false});
                 return false;
             }
             this.setState({validatePwd:true});
             return true

         }catch(e){
             console.log(e)
         }
     }
     onCreateUser = ()=>{
         try{
             let  objInsc = this.state.objInsc;
             objInsc = objInsc.set("email",objInsc.get('email').toLowerCase());
             if(!this.validateEmail(objInsc.get('email')) && !this.validatePwd(objInsc.get('password')))
             {
               this.props.dispatch(loginUserRequest(objInsc.toJS()));
             }
         }catch (e){
             console.log(e)
         }
     }
    render() {
        const {objInsc,validatePwd,validateEmail}=this.state;
        const {loadingLogin,errorsLogin}=this.props;
        return (
            <Spin tip="Veuillez patienter quelques instants" spinning={loadingLogin}>

            <div className="registration-form backLogin">
                            <form>
                                <div className="form-icon">
                                    <span ><i  style={{paddingTop:20,fontSize:"150%"}} className="fa fa-user"/></span>
                                </div>
                                {
                                    errorsLogin ?
                                     <Alert color="danger">
                                        Email/Mot de passe incorrect
                                    </Alert> : null
                                }

                                <div className={"pb-2"}>
                                    <Input type="email"
                                           name={"email"}
                                           placeholder="Votre Email"
                                           value={objInsc.get('email')}
                                           onChange={(e)=> this.setEmailPwd(e)}
                                           invalid={validateEmail}
                                    />
                                    <FormFeedback className="has-danger">Email ne peut pas etre vide</FormFeedback>
                                </div>
                                <div>
                                    <Input type="password"
                                           name={"password"}
                                           placeholder="Votre Mot de passe"
                                           value={objInsc.get('password')}
                                           onChange={(e)=> this.setEmailPwd(e)}
                                           invalid={validatePwd}
                                    />
                                    <FormFeedback className="has-danger">Mot de passe ne peut pas etre vide</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <button type="button"
                                            className="btn btn-block create-account"
                                            onClick={()=> this.onCreateUser()}>
                                        Connexion
                                    </button>
                                </div>
                                <Row>
                                    <Col md="5" lg="5" sm="5" xl="5" xs="5">
                                        <a href="/#"  onClick={(e)=> this.navigation(e)}>
                                            <u>Cree Compte</u>
                                        </a>
                                    </Col>
                                    <Col md="7" lg="7" sm="7" xl="7" xs="7">
                                        <a href="/#" onClick={(e)=> this.navigationMdpOublie(e)} >
                                            <u>Mot de passe Oublier</u>
                                        </a>
                                    </Col>
                                </Row>
                            </form>
                            {/*<div className="social-media">*/}
                                {/*<h5>Sign up with social media</h5>*/}
                                {/*<div className="social-icons">*/}
                                    {/*<a href="/#" style={{paddingTop:10}}><i className="fa fa-facebook" title="Facebook"/></a>*/}
                                    {/*<a href="/#" style={{paddingTop:10}}><i className="fa fa-google" title="Google"/></a>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        </div>
            </Spin>

        );
    }
}
const mapStateToProps = (state) => ({
    loadingLogin: state.getIn(['LoginReducer', 'loadingLogin']),
    errorsLogin: state.getIn(['LoginReducer', 'errorsLogin']),
})
export default connect(mapStateToProps)(Login)
