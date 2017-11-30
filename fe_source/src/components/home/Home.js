import React,{Component} from 'react';
import './home.less';
import 'whatwg-fetch';
import Userinfo from '../../common/Userinfo';
import Apiconfig from '../../common/Apiconfig';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            lists:[],
        };
    }
    componentWillMount(){
    }
    componentDidMount(){
        fetch(new Apiconfig().apiUrl+'articles/lists')
            .then((res)=>{return res.json();})
            .then((json)=>{
                this.setState({
                    lists:json
                });
            })
            .catch((err)=>{console.log("请求出错："+err);});
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
                                                <span className="time" data-shared-at="2017-08-15T14:04:28+08:00">11-25 05:37</span>
                                            </div>
                                        </div>
                                        <a className="title" target="_blank" href={list.id}>{list.title}</a>
                                        <div className="abstract">
                                            {list.abstract}
                                        </div>
                                        <div className="meta">
                                            <a className="collection_tag" target="_blank" href={list.cat_id}>日记本</a>
                                            <a target="_blank" href="">
                                                <i className="fa fa-eye"></i>0
                                            </a>
                                            <a target="_blank" href="">
                                                <i className="fa fa-comment"></i> 0
                                            </a>
                                            <span><i className="fa fa-heart"></i>0</span>
                                        </div>
                                    </div>
                                </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}