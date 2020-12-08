import React from 'react'
import { Button ,Input,FormFeedback,Row,Col} from 'reactstrap';
import PureComponent from "../utilsComponant/PureComponent";
import CardComponent from "../Card/CardComponent";
import { Card  } from 'antd';
import {DeleteTwoTone,EditTwoTone ,QuestionCircleOutlined } from '@ant-design/icons';
import { Comment, Avatar, Form, Button as Btn,Tooltip,Popconfirm} from 'antd';
import {getMomentDateForma} from "../utils/DateTimeUtilities";
import ReactReadMoreReadLess from "react-read-more-read-less";
import {ListTypes} from "../Constants/Constants";
import {fromJS} from "immutable";

const gridStyle = {
    width: '100%',
};
class FormPost extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            ListTypes:fromJS(ListTypes),
            validateMsg:false,
            validateType:false,
        }
    }
    validateMsg  = (value) =>{
        try{
            if(value.trim() !== "") {
                this.setState({validateMsg:false});
                return false;
            }
            this.setState({validateMsg:true});
            return true
        }catch(e){
            console.log(e)
        }
    }
    validateType  = (value) =>{
        try{
            if(value !== "propos" && value !== "" ) {
                this.setState({validateType:false});
                return false;
            }
            this.setState({validateType:true});
            return true

        }catch(e){
            console.log(e)
        }
    };
    publierPost = ()=>{
        try{
            const {post}=this.props;
            if(!this.validateMsg(post.get('message')) && !this.validateType(post.get('type')))
            {
                this.props.publier()
            }
        }catch(e){
            console.log(e)
        }
    }
    render() {
        const {post,bool,modeEdit,postDisplay}=this.props;
        const {ListTypes,validateMsg,validateType}=this.state;
        return (
            <>
                { bool ?
                    <div className="">
                    <CardComponent isHeader={0} spacing={"p-2"} cardHeaderClass={"p-1 text-center"}>
                    <Comment
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <>
                                    <Form.Item>
                                        <Input rows={3} value={post.get('message')}
                                                  placeholder="Créer une publication"
                                                  onChange={(e)=> this.props.setValues(e)}
                                                  name="message"
                                                  type={"textarea"}
                                                  invalid={validateMsg}
                                        />
                                        <FormFeedback className="has-danger">ne peut pas etre vice</FormFeedback>
                                        <Row>
                                            <Col md={"8"} lg={"8"} sm={"8"} xl={"8"} xs={"8"} className={"mt-2 mr-10"}>
                                                <Input type="select"
                                                       name="type"
                                                       onChange={(e)=> this.props.setValues(e)}
                                                       style={{width:"100%"}}
                                                       value={post.get('type')}
                                                       invalid={validateType}
                                                >
                                                    <option value="propos">À PROPOS DE</option>
                                                    {
                                                        ListTypes.map((data,index)=>(
                                                            <option key={index} value={data.get('value')}>{data.get("title")}</option>
                                                        ))
                                                    }
                                                </Input>
                                                <FormFeedback className="has-danger">Selectionnez</FormFeedback>
                                            </Col>
                                            <Col md={"4"} lg={"4"} sm={"4"} xl={"4"} xs={"4"} style={{textAlign:"right",paddingTop:10}} >
                                                <Btn  type="primary"  onClick={()=>this.publierPost()}  >
                                                    {
                                                        modeEdit ? "Modifier" : "Publier"
                                                    }
                                                </Btn>
                                            </Col>
                                        </Row>

                                    </Form.Item>
                                </>
                            }
                        />

                    </CardComponent>
                    </div>
                    :
                    <div>
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
                                            <Card actions={[
                                                <Tooltip placement="bottom" title={"Modifier"}>
                                                    <Button color={"link"}
                                                            style={{color:"#5891ff"}}
                                                            onClick={()=> this.props.editPost(postDisplay.get('postId'))}
                                                            disabled={this.props.modeEdit}>
                                                        <EditTwoTone />
                                                    </Button>
                                                </Tooltip>,
                                                <Tooltip placement="bottom" title={"Supprimer"}>
                                                        <Popconfirm
                                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                            title="Voullez vous Supprimer ?"
                                                            onConfirm={this.props.toggleYes}
                                                            onCancel={this.props.toggleNo}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                        <Button color={"link"}
                                                                onClick={()=> this.props.deletePost(postDisplay.get('postId'))}
                                                                disabled={this.props.modeEdit}>

                                                            <DeleteTwoTone/>
                                                        </Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                            ]}>
                                                <Card.Grid style={gridStyle}>
                                                    <u>{postDisplay.get('postId')}</u>
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
                                />

                            </CardComponent>
                    </div>
                }

            </>
        )
    }
}

export default FormPost
