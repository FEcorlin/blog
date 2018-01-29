import React,{Component} from 'react';
import './login.less';
import 'whatwg-fetch';
import Apiconfig from '../../../common/Apiconfig';
import { hashHistory } from 'react-router'

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            mobile:'',
            password:'',
            info:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mobileChange = this.mobileChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }
    componentDidMount(){}
    mobileChange(e){
        this.setState({
            mobile:e.target.value
        });
        e.preventDefault();
    }
    passwordChange(e){
        this.setState({
            password:e.target.value
        });
        e.preventDefault();
    }
    handleSubmit(event){
        fetch(new Apiconfig().apiUrl+'users/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: this.state.mobile,
                password: this.state.password,
            })
        }).then((result)=>{
            return result.json();
        }).then((json)=>{
            if(json.ok==1){
                this.props.history.push('/');
            }
            else {
                this.setState({
                    info:json.info
                });
            }
        });
        event.preventDefault();
    }
    render(){
        return (
            <div className="login_container">
                <form className="login_form" onSubmit={this.handleSubmit}>
                    <p className="logo">LOGO</p>
                    <input value={this.state.mobile} onChange={this.mobileChange} type="text" placeholder="手机号"/>
                    <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="密码"/>
                    <p className="warm">{this.state.info}</p>
                    <button type="submit">登录</button>
                </form>
            </div>
        );
    }
}