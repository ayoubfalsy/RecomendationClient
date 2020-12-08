import React from "react";
import PureComponent from "../../globalComponents/utilsComponant/PureComponent";
import CardComponent from "../../globalComponents/Card/CardComponent";
import { Comment, Avatar,Tooltip,Radio,Spin,notification,Card} from 'antd';
import { FormFeedback ,Input,Container,Row,Col,Spinner} from 'reactstrap';
import ReactReadMoreReadLess from "react-read-more-read-less";
import {fromJS} from "immutable";
import FormPost from "../../globalComponents/FormulairePost/FormPost";
import {ListTypes} from "../../globalComponents/Constants/Constants";
import {
    addPostRequest, getAllPostUserRequest, getAllPostUserSearchRequest, getPostUserRequest,
    setAllPostSearch, setNotification
} from "./PostAction";
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import {getMomentDateForma, getUnixTime} from "../../globalComponents/utils/DateTimeUtilities";
import SockJsClient from 'react-stomp';
import {BASE_URL} from "../../GeneralConstants";
const gridStyle = {
    width: '100%',
};
// const WebSocket = require('ws');

const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span >
          <span className="comment-action">Like</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-like" title="Votre solution">
      <span >
          <span className="comment-action">Votre solution</span>
      </span>
    </Tooltip>
];

class Posts extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            post:fromJS(this.getInistialePost()),
            addIp:"",
            tabActive:1,
            ListTypes:fromJS(ListTypes),
            postAll:fromJS(this.getInistialeAllPost()),
            country:"",
            search:false
        }
    }

    openNotification = (value) => {
        notification.info({
            message: 'Notification Title',
            description:'Votre publication est bien enregistrer.',
            placement: value
        });
    };

    componentDidMount(){
        try{
            // console.log("this.props.userDetails",JSON.parse(localStorage.getItem("user")))
            if(JSON.parse(localStorage.getItem("user")) != null){
                let users = JSON.parse(localStorage.getItem("user"));
                let postAll = this.state.postAll;
                postAll = postAll.set("lngId",users.id);
                postAll = postAll.set("strPays",users.pays);
                this.setState({postAll,country:users.pays});
                this.props.dispatch(getAllPostUserRequest(postAll.toJS()))

            }
            // if(JSON.parse(localStorage.getItem("user")) != null){
            //     this.props.dispatch(getAllPostUserRequest(this.state.postAll.toJS()))
            // }
            // lngId:JSON.parse(localStorage.getItem("user")).id,
            //     strPays:JSON.parse(localStorage.getItem("user")).pays,

        }catch(e){
            console.log(e)
        }
    };

    componentWillReceiveProps(newProps){
        try{
            if(newProps.loadingPostUserNotification === false){
                this.openNotification("bottomRight");
                this.props.dispatch(setNotification())
            }
            // if(JSON.parse(localStorage.getItem("user")) != null){
            //     console.log("this.props.userDetails",this.props.userDetails)
            //     let users = JSON.parse(localStorage.getItem("user"))
            //     let postAll = this.state.postAll;
            //     postAll = postAll.set("lngId",users.id);
            //     postAll = postAll.set("strPays",users.pays);
            //     this.setState({postAll})
            //     this.props.dispatch(getAllPostUserRequest(postAll.toJS()))
            // }
        }catch (e){
            console.log(e)
        }
    };

    fetchData = ()=>{
        try{
            let postAll = this.state.postAll;
            postAll=postAll.set("lngPage",postAll.get('lngPage')+1);
            if(this.state.search){
                this.setState({postAll},()=> this.props.dispatch(getAllPostUserSearchRequest(this.state.postAll.toJS())))
            }else{
                this.setState({postAll},()=> this.props.dispatch(getAllPostUserRequest(this.state.postAll.toJS())))
            }

        }catch(e){
            console.log(e)
        }
    };

    getInistialePost = ()=>{
        return ({postId:-1,
            message:"",
            datePub:"",
            type:"propos",
            addIP:"",
            appUsers:JSON.parse(localStorage.getItem("user"))
        })
    };

    getInistialeAllPost = ()=>{
        return ({
            lngId:"",
            strPays:"",
            strType:"all",
            lngPage:0,
            lngSize:5
        })
    };

    setSearch= (e) =>{
        const {name,value}=e.target;
        let postAll = this.state.postAll;
        postAll = postAll.set(name,value);
        postAll = postAll.set("lngPage",0);
        this.setState({postAll,search:true},()=>this.props.dispatch(getAllPostUserSearchRequest(postAll.toJS())));
        this.props.dispatch(setAllPostSearch())

    }

    publier = ()=>{
        try{
            const {addIp,country_name}=this.state;
            let postUser = this.state.post;
            postUser= postUser.set('addIP',addIp);
            postUser= postUser.set('pays',country_name);
            postUser= postUser.set('datePub',getUnixTime());
            this.props.dispatch(addPostRequest(postUser.toJS()));
            this.setState({post:fromJS(this.getInistialePost())})
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

    renderPerson = (postDisplay, idx) => {
        return (
            <div className="pt-2" key={idx}>
                <CardComponent isHeader={1} spacing={"p-1"} title={postDisplay.get('type')} cardHeaderClass={"p-1 text-center"} >
                    <Comment
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <>
                                <Card>
                                    <Card.Grid style={gridStyle}>
                                        <ReactReadMoreReadLess
                                            charLimit={200}
                                            readMoreText={"Afficher la suite ▼"}
                                            readLessText={"Désafficher ▲"}
                                            readMoreClassName="read-more-less--more"
                                            readLessClassName="read-more-less--less"
                                            readMoreStyle={{color:" #5891ff",cursor:"pointer"}}
                                            readLessStyle={{color:" #5891ff",cursor:"pointer"}}
                                        >
                                            {postDisplay.get('message')}
                                        </ReactReadMoreReadLess>
                                    </Card.Grid>
                                </Card>
                            </>
                        }
                        datetime={
                            <Tooltip title={getMomentDateForma(postDisplay.get('datePub'))}>
                                <span>{getMomentDateForma(postDisplay.get('datePub'))}</span>
                            </Tooltip>
                        }
                        actions={actions}

                    />

                </CardComponent>
            </div>
        );
    };
  render() {
      const {post,ListTypes,postAll,country,search}= this.state;
      const {listAllPostUser,loadingAllPostUser,lastAllPost,listAllSearchPosts,loadingPost}= this.props;
      const urlWebSocket = `${BASE_URL}/ws-chat`;
    return (
        <Container >
            <SockJsClient url={urlWebSocket}
                          topics={['/topic/group']}
                          onConnect={console.log("coonnecteeed")}
                          onMessage={(msg) => {
                              console.log("msg",msg)
                          }}/>

            <Row className={"m-2"}>
                <Col md={2} lg={2} sm={2} xl={2} xs={2} />
                <Col md={8} lg={8} sm={8} xl={8} xs={8}  >
                    <Spin spinning={loadingPost}>

                    <FormPost
                    post={post}
                    setValues={this.setValues}
                    publier={this.publier}
                    bool={true}
                />
                    </Spin>
             </Col>
                <Col md={2} lg={2} sm={2} xl={2} xs={2} />

            </Row>
          <Row>
              <Col md={3} lg={3} sm={3} xl={3} xs={3}/>
              <Col md={4} lg={4} sm={4} xl={4} xs={4} style={{paddingTop:10}}>
                Publication{" "}
                <Radio.Group name="strPays" value={postAll.get('strPays')} onChange={(e)=> this.setSearch(e)}>
                    <Radio value={country}>Votre Pays</Radio>
                    <Radio value={"autre"}>Autre Pays</Radio>
                </Radio.Group>
            </Col>
              <Col md={5} lg={5} sm={5} xl={5} xs={5} >
                  <Input type="select"
                         name="strType"
                         onChange={(e)=> this.setSearch(e)}
                      style={{width:"50%"}}
                      value={postAll.get('strType')}
                  >
                      <option value="all" disabled>Cherchez avec</option>
                      {
                          ListTypes.map((data,index)=>(
                              <option key={index} value={data.get('value')}>{data.get("title")}</option>
                          ))
                      }
                      <option value="all">TOUS</option>
                  </Input>
                  <FormFeedback className="has-danger">Selectionnez</FormFeedback>
              </Col>


          </Row>
            <Row>
                <Col>
                <InfiniteScroll
                    dataLength={search ? listAllSearchPosts.size :listAllPostUser.size} //This is important field to render the next data
                    next={this.fetchData}
                    hasMore={!lastAllPost}
                    loader={<h4 className={"text-center"}><Spinner color="dark" /></h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {
                        search ? listAllSearchPosts.map(this.renderPerson): listAllPostUser.map(this.renderPerson)
                    }
                </InfiniteScroll>
            </Col>
        </Row>
        </Container>
    );
  }
}
const mapStateToProps = (state)=>({
    listAllPostUser:state.getIn(['PostReducer',"listAllPostUser"]),
    loadingAllPostUser:state.getIn(['PostReducer',"loadingAllPostUser"]),
    lastAllPost: state.getIn(['PostReducer', 'lastAllPost']),
    loadingPostUser: state.getIn(['PostReducer', 'loadingPostUser']),
    loadingPost: state.getIn(['PostReducer', 'loadingPost']),
    listAllSearchPosts: state.getIn(['PostReducer', 'listAllSearchPosts']),
    loadingPostUserNotification: state.getIn(['PostReducer', 'loadingPostUserNotification']),
    userDetails: state.getIn(['LoginReducer', 'userDetails'])
});

export default connect(mapStateToProps)(Posts);
