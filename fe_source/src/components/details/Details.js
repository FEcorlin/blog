import React,{ Component } from 'react';
import './details.less';

export default class Details extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="article">
                <h1 className="title">动端终极适配方案</h1>
                <div className="author">
                    <a href="" className="avatar">
                        <img src="//127.0.0.1/upload/WechatIMG7.jpeg" alt="60" />
                    </a>
                    <div className="info">
                        <span className="tag">作者</span>
                        <a href="" className="name">colin</a>
                        <a href="" className="follow">
                            <i className="fa fa-plus"></i>
                            <span>关注</span>
                        </a>
                        <div className="meta">
                            <span className="publish-time">2017-11-25 05:37:35pm</span>
                            <span className="wordage">字数 1264</span>
                            <span className="views-count">阅读 0</span>
                            <span className="comments-count">评论 0</span>
                            <span className="likes-count">喜欢 0</span>
                        </div>
                    </div>
                </div>
                <div className="show_content">

                </div>
            </div>
        );
    }
}