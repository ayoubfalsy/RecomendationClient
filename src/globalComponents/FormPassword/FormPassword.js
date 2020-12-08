import React from 'react'
import {Spin,Button} from "antd"
import PureComponent from "../utilsComponant/PureComponent";
import {Form,Input,Alert,FormFeedback} from "reactstrap"

class FormPassword extends PureComponent {
    render() {
        const {loadingPwd,password, validateOldPwd,validateNewPwd,
            validateConfirmPwd,validateNewConfirm,typeResponse}= this.props;
        return (
            <Spin tip="Veuillez patienter quelques instants" spinning={loadingPwd}>
                <Form>
                    {
                        validateNewConfirm ?
                            <Alert color="danger">
                                nouveau Mot de passe et confirme ne sont pas les memes
                            </Alert> : null
                    }
                    {
                        typeResponse === 1 ?
                            <Alert color="success">
                                Mot de passe est changer avec succes
                            </Alert> :
                            typeResponse === 2 ?
                                <Alert color="danger">
                                    Mot de passe est incorrect
                                </Alert> :
                                null
                    }
                    <div className={"pb-2"}>
                        <Input type="password"
                               name={"oldPwd"}
                               placeholder="Votre Mot de passe"
                               value={password.get('oldPwd')}
                               onChange={(e)=> this.props.setPassword(e)}
                               invalid={validateOldPwd}
                        />
                        <FormFeedback className="has-danger">ne peut pas etre vide</FormFeedback>
                    </div>
                    <div className={"pb-2"}>
                        <Input type="password"
                               name={"newPwd"}
                               placeholder="Nouveau Mot de passe"
                               value={password.get('newPwd')}
                               onChange={(e)=> this.props.setPassword(e)}
                               invalid={validateNewPwd}
                        />
                        <FormFeedback className="has-danger">ne peut pas etre vide</FormFeedback>
                    </div>
                    <div>
                        <Input type="password"
                               name={"confirmPwd"}
                               placeholder="Confirmer Mot de passe"
                               value={password.get('confirmPwd')}
                               onChange={(e)=> this.props.setPassword(e)}
                               invalid={validateConfirmPwd}
                        />
                        <FormFeedback className="has-danger">ne peut pas etre vide</FormFeedback>
                    </div>
                    <div className={"float-right mt-2"}>
                        <Button
                            type={"primary"}
                            onClick={(e)=>this.props.resetPassword(e)}
                            title={"Modifer"}>
                            Modifier
                        </Button>
                    </div>
                </Form>
            </Spin>
        )
    }
}

export default FormPassword;
