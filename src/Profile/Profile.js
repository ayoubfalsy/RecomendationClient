import React  from "react";
import "../components/Login/loginCss.scss"
import PureComponent from "../globalComponents/utilsComponant/PureComponent";
import history from "../history";
import {connect} from "react-redux";
import {fromJS,List} from "immutable";
import {Spin} from "antd";
import Navigation from "../components/Navigation/navigation";
import Footer from "../components/footer";
import { Tabs } from 'antd';
import {Spinner} from "reactstrap"
import {getMomentDate, getUnixTime} from "../globalComponents/utils/DateTimeUtilities";
import axios from 'axios';
import {addPostRequest, deletePostUserRequest, getPostUserRequest} from "../components/Posts/PostAction";
import FormPost from "../globalComponents/FormulairePost/FormPost";
import InfiniteScroll from 'react-infinite-scroll-component';
import {isImmEmpty} from "../globalComponents/utils/HelperFunctions";
import { Skeleton ,Button as Btn,Radio} from 'antd';
import {ListTypes} from "../globalComponents/Constants/Constants"
import {Row,Col,Form,Input,FormFeedback,Alert} from "reactstrap"
import {loginChangeEmailRequest, loginCheckPwdRequest} from "../components/Login/LoginAction";
import CardComponent from "../globalComponents/Card/CardComponent";
import FormPassword from "../globalComponents/FormPassword/FormPassword";
const { TabPane } = Tabs;
 class Profile extends PureComponent {
     constructor(props){
         super(props);
         this.state={
             objInsc:fromJS({email:"", password:""}),
             validatePwd:false,
             validateEmail:false,
             post:fromJS(this.getInistialePost()),
             addIp:"",
             idUser:JSON.parse(localStorage.getItem("user")).id,
             lngPage:0,
             lngSize:15,
             tabActive:1,
             modeEdit:false,
             listPostUser:List(),
             isOpen:false,
             postId:-1,
             postIdEdit:-1,
             ListTypes:fromJS(ListTypes),
             password: this.passwdInitial(),
             email: this.emailInitial(),
             validateOldPwd:false,
             validateNewPwd:false,
             validateConfirmPwd:false,
             validateNewConfirm:false,
             typeResponse:0,
             validateOldPwdEmail:false,
             validateNewPwdEmail:false,
             typeResponseEmail:0,
             optionsWithDisabled:[
                 { label: 'Femme', value: 'Femme' },
                 { label: 'Homme', value: 'Homme' },
             ],
             country_name:""
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

     emailInitial = () =>{
         return fromJS({
             email: localStorage.getItem('email'),
             oldPwd: "",
             newPwd: JSON.parse(localStorage.getItem("user")).email,
             confirmPwd:JSON.parse(localStorage.getItem("user")).sexe,
             type: 0
         })
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

     callback =(key)=> {
         let state = this.state;
         state["isOpen" + this.state.postIdEdit] = false;
         this.setState({tabActive:key,
            post:fromJS(this.getInistialePost()),
            modeEdit:false,
            isOpen:false,
             state
        })
     };

     onChangeRadio = e => {
         let email = this.state.email;
         email = email.set('confirmPwd',e.target.value);
         this.setState({
             email
         });
     };
    componentDidMount(){
         try{
             const {idUser,lngPage,lngSize}=this.state;
             axios("https://geolocation-db.com/json/09ba3820-0f88-11eb-9ba6-e1dd7dece2b8").then(res => this.setState({addIp:res.data.IPv4,country_name:res.data.country_name}));
             if(isImmEmpty(this.props.listPostUser))
             {
                 this.props.dispatch(getPostUserRequest(idUser,lngPage,lngSize))
             }
         }catch(e){
             console.log(e)
         }
     }

    componentWillReceiveProps(newProps){
         try{
             let state = this.state;
             if(!newProps.loadingPost){
                 state["isOpen" + this.state.postIdEdit] = this.state["isOpen" + this.state.postIdEdit] !== undefined ? !this.state["isOpen" + this.state.postIdEdit] : true;
                 this.setState({state,modeEdit:false})
            }
             if(newProps.pwdDetails !== this.props.pwdDetails){
                 this.setState({typeResponse:newProps.pwdDetails.get('type')},()=>{
                     if(this.state.typeResponse === 1 || this.state.typeResponse === 2){
                         this.setState({validateNewConfirm:false})
                     }
                 })
             }
             if(newProps.EmailDetails !== this.props.EmailDetails){
                 this.setState({typeResponseEmail:newProps.EmailDetails.get('type'),
                 email:this.emailInitial()})
             }
         }catch(e){
             console.log(e)
         }
     }

     editPost = (id) =>{
        try{
            let state = this.state;
            let listPostUser = this.props.listPostUser;
            let post = listPostUser.find(data => data.get('postId') === id);
            state["isOpen" + id] = this.state["isOpen" + id] !== undefined ? !this.state["isOpen" + id] : true;
            this.setState({post,modeEdit:!this.state.modeEdit,state,postIdEdit:id})
        } catch(e){
            console.log(e)
        }
     };

    getInistialePost = ()=>{
         return ({postId:-1,
             message:"",
             datePub:"",
             type:"propos",
             addIP:"",
             pays:"",
             appUsers:JSON.parse(localStorage.getItem("user"))
         })
     };

    navigation=(e)=>{
        try{
            e.preventDefault();
            history.push("/Inscription")
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
     };

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
     };

     setValues = (e)=>{
         try{
           let  post = this.state.post;
           const {name,value}=e.target;
           post = post.set(name,value);
           this.setState({post})
         }catch (e){
            console.log(e)
         }
     };

     publier = ()=>{
         try{
             const {addIp}=this.state;
             let postUser = this.state.post;
             postUser= postUser.set('addIP',addIp);
             postUser= postUser.set('pays',JSON.parse(localStorage.getItem('user')).pays);
             postUser= postUser.set('datePub',getUnixTime());
             this.props.dispatch(addPostRequest(postUser.toJS()));
             this.setState({post:fromJS(this.getInistialePost()),modeEdit:!this.state.modeEdit,tabActive:2})
         }catch(e){
             console.log(e)
         }
     };

     deletePost = (postId) =>{
         try{
            this.setState({postId,isOpen:!this.state.isOpen})
         }catch(e){
             console.log(e)
         }
     };

     renderPerson = (post, idx) => {
         return (
             <FormPost
                 key={idx}
                 post={this.state.post}
                 postDisplay={post}
                 bool={this.state["isOpen" + post.get('postId')]}
                 editPost={this.editPost}
                 modeEdit={this.state.modeEdit}
                 setValues={this.setValues}
                 publier={this.publier}
                 deletePost={this.deletePost}
                 toggleYes={this.toggleYes}
                 toggleNo={this.toggleNo}

             />
         );
     };

     fetchData = ()=>{
         try{
             const {idUser,lngSize}=this.state;
             this.setState({lngPage:this.state.lngPage+1},()=> this.props.dispatch(getPostUserRequest(idUser,this.state.lngPage,lngSize)))
         }catch(e){
             console.log(e)
         }
     };

     toggleYes = ()=> {
         this.props.dispatch(deletePostUserRequest(this.state.postId));
         this.setState({isOpen:!this.state.isOpen})
     };

     toggleNo = ()=> {
         this.setState({isOpen:!this.state.isOpen})
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

     resetPassword = (e) => {
         try{
             const{password}=this.state;
             e.preventDefault();
             if(!this.validateOld(password.get('oldPwd')) && !this.validateNew(password.get('newPwd')) && !this.validateConfirm(password.get('confirmPwd')))
             {
                 if(!this.validateNewConfirm()){
                     this.setState({
                         password:this.passwdInitial(),
                         validateOldPwd:false,
                         validateNewPwd:false,
                         validateConfirmPwd:false,
                         validateNewConfirm:false,
                         typeResponse:0});

                     this.props.dispatch(loginCheckPwdRequest(this.state.password.toJS()))

                 }
             }
         }catch(e){
             console.log(e)
         }
     };

     resetEmail = () => {
         try{
             let email=this.state.email;
             if(!this.validateOldEmail(email.get('oldPwd')) && !this.validateNewEmail(email.get('newPwd')))
             {
                 email = email.set("newPwd",email.get('newPwd').toLowerCase());
                 email = email.set("email",localStorage.getItem('email'));
                 if(!this.validateNewConfirm()){
                     this.setState({
                         validateOldPwdEmail:false,
                         validateNewPwdEmail:false,
                         typeResponseEmail:0});

                     this.props.dispatch(loginChangeEmailRequest(email.toJS()))

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

     validateOldEmail=(value)=>{
         try{
             if(value.trim() !== "") {
                 this.setState({validateOldPwdEmail:false,validateNewConfirmEmail:false,typeResponseEmail:0});
                 return false;
             }
             this.setState({validateOldPwdEmail:true,validateNewConfirmEmail:false,typeResponse:0});
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

     validateNewEmail=(value)=>{
         try{
             if(value.trim() !== "") {
                 this.setState({validateNewPwdEmail:false,validateNewConfirmEmail:false,typeResponseEmail:0});
                 return false;
             }
             this.setState({validateNewPwdEmail:true,validateNewConfirmEmail:false,typeResponseEmail:0});
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

     setEmail = (e) => {
         try{
             let email = this.state.email;
             const{value,name}=e.target;
             email = email.set(name,value);
             this.setState({email})
         }catch(e){
             console.log(e)
         }
     };
    render() {
        const {loadingPostUser,lastPost,loadingPost,listPostUser,loadingPwd,loadingEmail}= this.props;
        const {post,tabActive,password, validateOldPwd,validateNewPwd,
            validateConfirmPwd,validateNewConfirm,typeResponse,email,
            validateOldPwdEmail,validateNewPwdEmail,typeResponseEmail,optionsWithDisabled}= this.state;
        return (
            <Spin tip="Veuillez patienter quelques instants" spinning={loadingPostUser|| loadingPost}>
             <Navigation />
                <div  className="container"  >


                    <div className="row">
                        <div className="col-md-12">
                            <div className="card m-b-30">
                                <div className="card-body">
                                    <div className="xp-social-profile">
                                        <div className="xp-social-profile-top">
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="xp-social-profile-star py-3">
                                                        <i className="mdi mdi-star font-24"/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="xp-social-profile-avatar text-center">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                             alt="user-profile" className="rounded-circle img-fluid"
                                                            height={80} width={80}
                                                        />
                                                            <span className="xp-social-profile-live"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="xp-social-profile-menu text-right py-3">
                                                        <i className="mdi mdi-dots-horizontal font-24"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xp-social-profile-middle text-center">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="xp-social-profile-title">
                                                        <h5 className="my-1 text-black">{JSON.parse(localStorage.getItem("user")).email}</h5>
                                                    </div>
                                                    <div className="xp-social-profile-subtitle">
                                                        <p className="mb-3 text-muted">{JSON.parse(localStorage.getItem("user")).sexe}</p>
                                                    </div>
                                                    <div className="xp-social-profile-desc">
                                                        <p className="text-muted">Date creation<br/>{getMomentDate(JSON.parse(localStorage.getItem("user")).timeCreate)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xp-social-profile-bottom text-center">
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="xp-social-profile-media pt-3">
                                                        <h5 className="text-black my-1">45</h5>
                                                        <p className="mb-0 text-muted">Posts</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="xp-social-profile-followers pt-3">
                                                        <h5 className="text-black my-1">278k</h5>
                                                        <p className="mb-0 text-muted">Fans</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="xp-social-profile-following pt-3">
                                                        <h5 className="text-black my-1">552</h5>
                                                        <p className="mb-0 text-muted">Likes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card-container" style={{background:"#f5f5f5"}}>
                                    <Tabs type="card" defaultActiveKey={tabActive.toString()}
                                          onChange={this.callback}
                                          activeKey={tabActive.toString()}
                                          centered>
                                        <TabPane tab="Publier votre poste" key="1" className={"backLogin"}>
                                            <FormPost
                                                post={post}
                                                setValues={this.setValues}
                                                publier={this.publier}
                                                bool={true}
                                            />
                                        </TabPane>
                                        <TabPane tab="Déja posté" key="2">
                                            {!loadingPostUser || !loadingPost ?
                                                <InfiniteScroll
                                                    dataLength={listPostUser.size} //This is important field to render the next data
                                                    next={this.fetchData}
                                                    hasMore={!lastPost}
                                                    loader={<h4>      <Spinner color="dark" />
                                                    </h4>}
                                                    endMessage={
                                                        <p style={{ textAlign: 'center' }}>
                                                            <b>Yay! You have seen it all</b>
                                                        </p>
                                                    }
                                                >
                                                    {
                                                        listPostUser.map(this.renderPerson)
                                                    }
                                                </InfiniteScroll>
                                                :
                                               <> <Skeleton avatar paragraph={{ rows: 4 }} /></>
                                            }
                                        </TabPane>
                                        <TabPane tab="Favorite" key="3">
                                            <p>Content of Tab Pane 3</p>
                                            <p>Content of Tab Pane 3</p>
                                            <p>Content of Tab Pane 3</p>
                                        </TabPane>
                                        <TabPane tab="Parameter" key="4" className={"backLogin"}>
                                           <Row>
                                               <Col>
                                                   <CardComponent isHeader={1} cardStyle={{margin:10}} title={"Changer Password"} cardHeaderClass={"p-1"}>
                                                     <FormPassword
                                                         loadingPwd={loadingPwd}
                                                         validateNewConfirm={validateNewConfirm}
                                                         typeResponse={typeResponse}
                                                         password={password}
                                                         setPassword={this.setPassword}
                                                         resetPassword={this.resetPassword}
                                                         validateOldPwd={validateOldPwd}
                                                         validateNewPwd={validateNewPwd}
                                                         validateConfirmPwd={validateConfirmPwd}
                                                     />
                                                   </CardComponent>
                                               </Col>
                                               <Col>
                                                   <CardComponent isHeader={1} cardStyle={{margin:10}} title={"Changer informations"}  cardHeaderClass={"p-1"}>
                                                       <Spin tip="Veuillez patienter quelques instants" spinning={loadingEmail}>
                                                           <Form>
                                                               {
                                                                   typeResponseEmail === 1 ?
                                                                       <Alert color="success">
                                                                           Succes !
                                                                       </Alert> :
                                                                       typeResponseEmail === 2 ?
                                                                           <Alert color="danger">
                                                                               Mot de passe est incorrect !
                                                                           </Alert> :
                                                                           typeResponseEmail === 3 ?
                                                                           <Alert color="danger">
                                                                               Email déja exist !
                                                                           </Alert> :
                                                                           null
                                                               }
                                                               <div className={"pb-2"}>
                                                                   <Input type="password"
                                                                          name={"oldPwd"}
                                                                          placeholder="Votre Mot de passe"
                                                                          value={email.get('oldPwd')}
                                                                          onChange={(e)=> this.setEmail(e)}
                                                                          invalid={validateOldPwdEmail}
                                                                   />
                                                                   <FormFeedback className="has-danger">ne peut pas etre vide</FormFeedback>
                                                               </div>
                                                               <div className={"pb-2"}>
                                                                   <Input type="email"
                                                                          name={"newPwd"}
                                                                          placeholder="Nouveau Email"
                                                                          value={email.get('newPwd')}
                                                                          onChange={(e)=> this.setEmail(e)}
                                                                          invalid={validateNewPwdEmail}
                                                                          disabled={true}
                                                                   />
                                                                   <FormFeedback className="has-danger">ne peut pas etre vide</FormFeedback>
                                                               </div>
                                                               <div className={"pb-2"}>
                                                               <Radio.Group
                                                                   options={optionsWithDisabled}
                                                                   onChange={this.onChangeRadio}
                                                                   value={email.get('confirmPwd')}
                                                                   optionType="button"
                                                                   buttonStyle="solid"
                                                               />
                                                               </div>
                                                               <div className={"float-right mt-2"}>
                                                                   <Btn
                                                                       type={"primary"}
                                                                       onClick={()=>this.resetEmail()}
                                                                       title={"Modifer"}>
                                                                       Modifier
                                                                   </Btn>
                                                               </div>
                                                           </Form>
                                                       </Spin>
                                                   </CardComponent>
                                               </Col>
                                           </Row>
                                        </TabPane>
                                    </Tabs>
                    </div>
                </div>
            <Footer/>

            </Spin>

        );
    }
}
const mapStateToProps = (state) => ({
    loadingPostUser: state.getIn(['PostReducer', 'loadingPostUser']),
    errorsLogin: state.getIn(['LoginReducer', 'errorsLogin']),
    listPostUser: state.getIn(['PostReducer', 'listPostUser']),
    loadingPost: state.getIn(['PostReducer', 'loadingPost']),
    lastPost: state.getIn(['PostReducer', 'lastPost']),
    pwdDetails: state.getIn(['LoginReducer', 'pwdDetails']),
    loadingPwd: state.getIn(['LoginReducer', 'loadingPwd']),
    loadingEmail: state.getIn(['LoginReducer', 'loadingEmail']),
    EmailDetails: state.getIn(['LoginReducer', 'EmailDetails']),


});
export default connect(mapStateToProps)(Profile)
