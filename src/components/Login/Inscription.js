import React from "react";
import "./loginCss.scss"
import PureComponent from "../../globalComponents/utilsComponant/PureComponent";
import {connect} from "react-redux";
import history from "../../history";
import {inscriptionRequest, setInscriptionValue} from "./LoginAction";
import {fromJS} from 'immutable'
import { Spin,Radio } from 'antd';
import { Input,FormFeedback,Alert} from 'reactstrap';
import {validateEmail} from "../../globalComponents/utils/ValidationUtils";
import axios from "axios/index";

class Inscription extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            objInsc:fromJS({email:"", sexe:"Femme",country:""}),
            validateCountry:false,
            validateEmail:false,
            optionsWithDisabled:[
                { label: 'Femme', value: 'Femme' },
                { label: 'Homme', value: 'Homme' },
            ],
            country_name:""
        }
    }

    onChangeRadio = e => {
        let objInsc = this.state.objInsc;
        objInsc = objInsc.set('sexe',e.target.value);
        this.setState({
            objInsc
        });
    };
    componentDidMount(){
        try{
            this.props.dispatch(setInscriptionValue(null));
            axios("https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8").then(res => {
                let objInsc = this.state.objInsc;
                objInsc = objInsc.set('country',res.data.country_name);
                this.setState({objInsc,country_name:res.data.country_name})
            });
            this.setState({ objInsc:fromJS({email:"", sexe:"Femme",country:""}),
                            validateCountry:false,
                             validateEmail:false},)
        }catch(e){
            console.log(e)
        }
    }
    navigation=(e)=>{
        try{
            e.preventDefault();
            history.push("/LoginUser")
        }catch(e){
            console.log(e)
        }
    };
    setEmailCountry =(e)=>{
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
            this.setState({validateEmail:validateEmail(value)});
            return validateEmail(value)
        }catch(e){
            console.log(e)
        }
    };

    validateSexe  = (value) =>{
        try{
            if(value !== "") {
                this.setState({validateCountry:false});
                return false;
            }
            this.setState({validateCountry:true});
            return true

        }catch(e){
            console.log(e)
        }
    };

    onCreateUser = ()=>{
        try{
            let  objInsc=this.state.objInsc;
            objInsc = objInsc.set("email",objInsc.get('email').toLowerCase());
            objInsc = objInsc.set("country",this.state.country_name);
            if(!this.validateEmail(objInsc.get('email')))
            {
                this.props.dispatch(inscriptionRequest(objInsc.toJS()));
            }
        }catch (e){
            console.log(e)
        }
    }
    render() {
        const {objInsc,validateEmail,optionsWithDisabled}=this.state;
        const {loadingInscription,inscriptionValue}=this.props;
        return (
            <Spin tip="Veuillez patienter quelques instants" spinning={loadingInscription}>
                <div className="registration-form backLogin">
                            <form>
                                <div className="form-icon">
                                    <span ><i  style={{paddingTop:20,fontSize:"150%"}} className="fa fa-users"/></span>
                                </div>
                                {
                                    inscriptionValue === 1 ?
                                        <Alert color="danger">
                                            Votre email déja existe
                                        </Alert> :
                                    inscriptionValue === 0 ?
                                        <Alert color="success">
                                            Votre mot de passe a été envoyé a votre email
                                        </Alert> :
                                        null
                                }
                                <div className={"pb-2"}>
                                    <Input type="email"
                                           id="username"
                                           name={"email"}
                                           placeholder="Votre Email"
                                           value={objInsc.get('email')}
                                           onChange={(e)=> this.setEmailCountry(e)}
                                           invalid={validateEmail}
                                    />
                                    <FormFeedback className="has-danger">Email Vide ou Incorrect</FormFeedback>
                                </div>
                                    {/*<Input type="select"*/}
                                           {/*name="country"*/}
                                           {/*id="exampleSelect"*/}
                                           {/*onChange={(e)=> this.setEmailCountry(e)}*/}
                                           {/*value={objInsc.get('sexe')}*/}
                                           {/*invalid={validateSexe}>*/}
                                        {/*<option value={"pays"}>Selectionnez votre pays</option>*/}
                                    {/*</Input>*/}
                                {/*<FormFeedback className="has-danger">Selectionnez votre pays</FormFeedback>*/}
                                <Radio.Group
                                    options={optionsWithDisabled}
                                    onChange={this.onChangeRadio}
                                    value={objInsc.get('sexe')}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                                <div className="form-group">
                                    <button type="button"
                                            className="btn btn-block create-account"

                                            onClick={()=> this.onCreateUser()}
                                    >
                                         Create Account

                                </button>
                                </div>
                                <a href={"/#"} className="float-right" onClick={(e)=> this.navigation(e)}>Page d'authentification</a>
                            </form>
                        </div>
            </Spin>


        );
    }
}
const mapStateToProps = (state) => ({
    loadingInscription: state.getIn(['LoginReducer', 'loadingInscription']),
    inscriptionValue: state.getIn(['LoginReducer', 'inscriptionValue']),
})
export default connect(mapStateToProps)(Inscription)
