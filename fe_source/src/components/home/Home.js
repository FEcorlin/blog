import React,{Component} from 'react';
import './home.less';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <div className="container">
                <ul className="articles_wrap">
                    <li className="item_article have_img">
                        <a className="wrap-img">
                            <img src="http://pic2.ooopic.com/12/22/94/30b1OOOPIC5c.jpg" alt="tupian" />
                        </a>
                        <div className="content">
                            <div className="author">
                                <a className="avatar" target="_blank" href="">
                                    <img src="//127.0.0.1/upload/WechatIMG7.jpeg" alt="113" />
                                </a>
                                <div className="name">
                                    <a className="blue_link" target="_blank" href="">colin</a>
                                    <span className="time" data-shared-at="2017-08-15T14:04:28+08:00">11-25 05:37</span>
                                </div>
                            </div>
                            <a className="title" target="_blank" href="/p/113"></a>
                            <div className="abstract">
                                以前对于移动端页面处理一般都是采用自适应布局来处理的，所谓自适应就是可以保证页面在所以页面都可以有正确都展示效果，比如横向的四等分、固定左侧导航+内容展示等。但是这种方案使得页面在不同屏幕的展示效果是不一致，主要集中在字体大小和页面内容的高度上的，字体可能会做一些常用终端的适配也不能覆盖全部终端，内容高度上，iphone6第一屏幕展示的内容可能就比iphone5要多。所以这次要介绍的这个终极适配...
                            </div>
                            <div className="meta">
                                <a className="collection_tag" target="_blank" href="">日记本</a>
                                <a target="_blank" href="">
                                    <i className="fa fa-eye"></i>0
                                </a>
                                <a target="_blank" href="">
                                    <i className="fa fa-comment"></i> 0
                                </a>
                                <span><i className="fa fa-heart"></i>0</span>
                            </div>
                        </div>
                    </li>
                    <li className="item_article">
                        <div className="content">
                            <div className="author">
                                <a className="avatar" target="_blank" href="">
                                    <img src="//127.0.0.1/upload/WechatIMG7.jpeg" alt="113" />
                                </a>
                                <div className="name">
                                    <a className="blue_link" target="_blank" href="">colin</a>
                                    <span className="time" data-shared-at="2017-08-15T14:04:28+08:00">11-25 05:37</span>
                                </div>
                            </div>
                            <a className="title" target="_blank" href="/p/113"></a>
                            <div className="abstract">
                                以前对于移动端页面处理一般都是采用自适应布局来处理的，所谓自适应就是可以保证页面在所以页面都可以有正确都展示效果，比如横向的四等分、固定左侧导航+内容展示等。但是这种方案使得页面在不同屏幕的展示效果是不一致，主要集中在字体大小和页面内容的高度上的，字体可能会做一些常用终端的适配也不能覆盖全部终端，内容高度上，iphone6第一屏幕展示的内容可能就比iphone5要多。所以这次要介绍的这个终极适配...
                            </div>
                            <div className="meta">
                                <a className="collection_tag" target="_blank" href="">日记本</a>
                                <a target="_blank" href="">
                                    <i className="fa fa-eye"></i>0
                                </a>
                                <a target="_blank" href="">
                                    <i className="fa fa-comment"></i> 0
                                </a>
                                <span><i className="fa fa-heart"></i>0</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}