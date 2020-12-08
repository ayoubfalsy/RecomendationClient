import React, { Component } from "react";
import Posts from '../Posts/Posts';
import JsonData from '../../data/data.json';
import Navigation from "../Navigation/navigation";
import Footer from "../footer";
import {connect} from "react-redux";
export class Home extends Component {
    state = {
        landingPageData: {},
        // idUser:JSON.parse(localStorage.getItem("user")).id,
        // lngPage:0,
        // lngSize:10
    };
    getlandingPageData() {
        this.setState({landingPageData : JsonData})
    }

    componentDidMount() {
        this.getlandingPageData();
    }
    render() {
        return (
            <div>
                <Navigation />
                <Posts/>
                <Footer />

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    loadingLogin: state.getIn(['LoginReducer', 'loadingLogin']),
    errorsLogin: state.getIn(['LoginReducer', 'errorsLogin']),
    listPostUser: state.getIn(['PostReducer', 'listPostUser']),

})
export default connect(mapStateToProps)(Home)
