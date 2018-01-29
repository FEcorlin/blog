import React,{ Component } from 'react';
import './details.less';
import 'whatwg-fetch';
import Apiconfig from '../../common/Apiconfig';
import utl from '../../common/OwnUtils';

export default class Details extends Component{
    constructor(props){
        super(props);
        this.state = {info:''};
    }
    componentDidMount(){
        const id = this.props.match.params.id;

        fetch(new Apiconfig().apiUrl+'articles?id='+id)
        .then((result)=>{return result.json()})
        .then((json)=>{
            this.setState({
                info:json
            });
        });
    }
    render(){
        return (
            <div className="article">
                <h1 className="title">{this.state.info.title}</h1>
                <div className="author">
                    <a href="" className="avatar">
                        <img src={this.state.info.author_avatar} alt="60" />
                    </a>
                    <div className="info">
                        <span className="tag">作者</span>
                        <a href="" className="name">{this.state.info.author_name}</a>
                        <a href="" className="follow">
                            <i className="fa fa-plus"></i>
                            <span>关注</span>
                        </a>
                        <div className="meta">
                            <span className="publish-time">{utl.timeFormat(this.state.info.publish_time,'m-d H:m')}</span>
                            <span className="wordage">字数 {this.state.info.text_num}</span>
                            <span className="views-count">阅读 {this.state.info.read_num}</span>
                            <span className="comments-count">评论 {this.state.info.comment_num}</span>
                            <span className="likes-count">喜欢 {this.state.info.like_num}</span>
                        </div>
                    </div>
                </div>
                <div ref="content" className="show_content" dangerouslySetInnerHTML={{__html:this.state.info.content}}></div>
            </div>
        );
    }
}