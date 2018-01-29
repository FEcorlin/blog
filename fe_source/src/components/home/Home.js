import React,{Component} from 'react';
import './home.less';
import 'whatwg-fetch';
import Apiconfig from '../../common/Apiconfig';
import utl from '../../common/OwnUtils';
import {NavLink} from 'react-router-dom';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            lists:[],
            page:1,
            showNext:false
        };
        this.more_handle = this.more_handle.bind(this);
        this.getLists = this.getLists.bind(this);
    }
    componentWillMount(){
    }
    componentDidMount(){
        this.getLists();
    }
    getLists(){
        fetch(new Apiconfig().apiUrl+'articles/lists?page='+this.state.page)
            .then((res)=>{return res.json();})
            .then((json)=>{
                if(json.length > 0){
                    this.setState({
                        lists:this.state.lists.concat(json),
                        page:this.state.page+1,
                        showNext:true
                    });
                }
                else {
                    this.setState({
                        lists:this.state.lists.concat(json),
                        showNext:false
                    });
                }
            })
            .catch((err)=>{console.log("请求出错："+err);});
    }
    more_handle(){
        this.getLists();
    }
    render(){
        return (
            <div className="container">
                <ul className="articles_wrap">
                    {
                        this.state.lists.map((list, index)=>{
                            return (
                                <li className={list.img ? "item_article have_img" : "item_article"} key={index}>
                                    {list.img ? <a className="wrap-img" dangerouslySetInnerHTML={{__html:list.img}}></a> : ''}
                                    <div className="content">
                                        <div className="author">
                                            <a className="avatar" target="_blank" href={list.author_id}>
                                                <img src={list.userinfo.avatar} alt={list.author_id} />
                                            </a>
                                            <div className="name">
                                                <a className="blue_link" target="_blank" href={list.author_id}>{list.userinfo.name}</a>
                                                <span className="time" data-shared-at="2017-08-15T14:04:28+08:00">
                                                    {utl.timeFormat(list.publish_time,'m-d h:s')}
                                                </span>
                                            </div>
                                        </div>
                                        <NavLink className="title" to={'/p/'+list.id}>{list.title}</NavLink>
                                        <div className="abstract">
                                            {list.abstract}
                                        </div>
                                        <div className="meta">
                                            <a className="collection_tag" target="_blank" href={list.cat_id}>{list.cat_name}</a>
                                            <a target="_blank" href=""><i className="fa fa-eye"></i>{list.read_num}</a>
                                            <a target="_blank" href=""><i className="fa fa-comment"></i> {list.comment_num}</a>
                                            <span><i className="fa fa-heart"></i>{list.like_num}</span>
                                        </div>
                                    </div>
                                </li>);
                        })
                    }
                </ul>
                <div className="get_more" style={{display:this.state.showNext ? "block" : "none"}} onClick={this.more_handle}>查看更多</div>
            </div>
        );
    }
}