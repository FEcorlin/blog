import React,{ Component } from 'react';
import {
	NavLink
} from 'react-router-dom'
import './center_list.js.less';
import Apiconfig from '../../../common/Apiconfig';

export default class CenterList extends Component{
	constructor(props){
		super(props);
		this.state = {
			cat_id:this.props.cat_id,//分类id
			lists:[],//文章列表
			page:1,//页数
			activeIndex:0,//选中的文章下标
			settingShow:0,//是否显示设置
			showFloat:0,//是否显示遮罩层
		};
	}
	componentDidMount(){
		this.getLists();
	}
	componentWillReceiveProps(nextProps){
		this.state.cat_id = nextProps.cat_id;
		this.getLists(nextProps.cat_id);
	}
	getLists(id){
		let cat_id = id || this.state.cat_id;
		if(cat_id != 0){
			fetch(new Apiconfig().apiUrl+'articles/lists_id?id='+this.state.cat_id+'&page='+this.state.page)
			.then((res)=>{return res.json()})
			.then((data)=>{
				this.setState({
					lists:this.state.lists.concat(data),
				});
			})
		}
	}
	//列表点击事件
	handleListClick(index){
		this.setState({activeIndex:index});
	}
	//设置
	handleSettingClick(index){
		this.setState({
			settingShow:this.state.settingShow==0?1:0,
			showFloat:this.state.showFloat==0?1:0
		});
	}
	//发布文章
	handlePublish(index,e){
		if (index > -1) {

		}
		e.preventDefault();
		e.stopPropagation();
	}
	render(){
		return (
			<div>
				<div onClick={this.handleSettingClick.bind(this)} className="float_wrap" style={{display:this.state.showFloat==1?'block':'none'}}></div>
				<a type="button" className="new-note-link">
					<i className="icon fa fa-plus-circle"></i>
					<span className="win-text">新建文章</span>
				</a>
				<ul className="notes_list">
					{
						this.state.lists.map((item,index)=>{
							let li_class='',publish_class='share-link';
							li_class=this.state.activeIndex==index?'active ':'';
							li_class+=item.publish_status==1?'published ':'';
							publish_class+=item.publish_status==0?' publishButton':'';
							return (
								<li onClick={this.handleListClick.bind(this,index)} className={li_class} data-id={item.id} key={index}>
									<i className="fa fa-file icon-note"></i>
									<p className="abbreviate">{item.abstract}</p>
									<p className="wordage">字数: {item.text_num}</p>
									<a type="button" className="note-link title">{item.title}</a>
									<a onClick={this.handleSettingClick.bind(this,index)} type="button" className="share-note dropdown-toggle">
										<i className="fa fa-gear"></i>
									</a>
									<ul style={{display:this.state.settingShow==1&&this.state.activeIndex==index?'block':'none'}} className="arrow-top">
										<li>
											<a onClick={item.publish_status==0?this.handlePublish.bind(this,index):this.handlePublish.bind(this,-1)} type="button" className={publish_class}>
												<i className={`fa ${item.publish_status==1?'fa-check':'fa-share'}`}></i>{item.publish_status==1?'已发布':'直接发布'}
											</a>
										</li>
										<li>
											<a type="button" className="open-move-note"><i className="fa fa-folder-open"></i>移动文章 </a>
										</li>
										<li><a type="button" className="delete_article"><i className="fa fa-trash-o"></i>删除文章</a></li>
									</ul>
								</li>
							);
						})
					}
				</ul>
				<div className="one-note new-note-bottom">
					<a type="button" className="new-note bottom" data-cat_id="55">
						<i className="fa fa-plus"></i> 在下方新建文章
					</a>
				</div>
			</div>
		);
	}
}