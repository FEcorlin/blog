import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './left_bar.less';
import 'whatwg-fetch';
import Apiconfig from '../../../common/Apiconfig';

export default class LeftBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formHeight: '0px',
			newNoteName: '',
			cat_lists:[],
			activeCatIndex:0,
			settingShow:0,
			cat_change_index:-1,
			cat_change_name:''
		};
		this.newNoteClick = this.newNoteClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.getCatLists = this.getCatLists.bind(this);
		this.catLiClick = this.catLiClick.bind(this);
		this.catSetting = this.catSetting.bind(this);
		this.catNameChangeSubmit = this.catNameChangeSubmit.bind(this);
	}
	componentWillMount(){

	}
	componentDidMount() {
		this.getCatLists();
	}
	//获取个人分类列表
	getCatLists(){
		fetch(new Apiconfig().apiUrl+'articles/cat_lists')
		.then((result)=>{return result.json();})
		.then((json)=>{
			this.setState({
				cat_lists:json
			});
			this.props.clickHandle(this.state.cat_lists[0].id);
		});
	}
	//新建分类from表单提交
	handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		if(this.state.newNoteName==''){
			return false;
		}
		fetch(new Apiconfig().apiUrl+'articles/new_cat',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				cat_name:this.state.newNoteName
			})
		}).then((res)=>{return res.json();})
		.then((d)=>{
			if(d.ok == '1'){
				let lists = this.state.cat_lists;
				lists.unshift(d.data);
				this.setState({
					cat_lists:lists,
					activeCatIndex:0,
					newNoteName:''
				});
			}
			else {
				alert(d.info);
			}
		});
		e.preventDefault();
	}
	//输入分类名称
	inputChange(e) {
		this.setState({
			newNoteName: e.target.value
		});
	}
	//点击新建分类，展示form表单
	newNoteClick(e) {
		this.setState({
			formHeight: this.state.formHeight == '0px' ? "84px" : "0px",
			newNoteName: this.state.formHeight == '0px' ? '' : this.state.newNoteName
		});
		e.preventDefault();
	}
	//选择分类
	catLiClick(index,e){
		this.setState({
			activeCatIndex:index
		});
		this.props.clickHandle(this.state.cat_lists[index].id);
		e.preventDefault();
	}
	//点击分类设置
	catSetting(e){
		this.setState({
			settingShow: this.state.settingShow == 0 ? 1 : 0
		});
		e.preventDefault();
		e.stopPropagation();
	}
	//删除分类
	deleteCat(index,e){
		fetch(new Apiconfig().apiUrl+'articles/delete_cat?id='+this.state.cat_lists[index].id)
		.then((res)=>{return res.json()})
		.then((json)=>{
			if(json.ok==1){
				this.state.cat_lists.splice(index,1);
				this.setState({
					settingShow:0,
					activeCatIndex: index == 0 ? 0 : index - 1
				});
			}
			else {
				alert(json.info);
			}
		});
		e.preventDefault();
		e.stopPropagation();
	}
	//修改分类名称
	changeCat(index,e){
		this.setState({
			settingShow:0,
			cat_change_index:index,
			cat_change_name:this.state.cat_lists[index].name,
		});
		e.preventDefault();
		e.stopPropagation();
	}
	//修改分类名称
	catNameChange(e){
		this.setState({
			cat_change_name:e.target.value
		});
	}
	//取消修改
	cancleChange(){
		this.setState({
			cat_change_index:-1,
			cat_change_name:''
		});
	}
	//保存修改
	catNameChangeSubmit(){
		let id = this.state.cat_lists[this.state.cat_change_index].id;
		let name = this.state.cat_change_name;
		fetch(new Apiconfig().apiUrl+'articles/update_cat',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				id:id,
				name:name
			})
		}).then((res)=>{return res.json()})
		.then((result)=>{
			if(result.ok==1){
				this.state.cat_lists[this.state.cat_change_index].name=name;
				this.setState({
					cat_change_index:-1,
					cat_change_name:''
				});
			}
		})
	}
	render(){
		return (
			<div>
				<div className="modul_float" onClick={this.catSetting} style={{display:this.state.settingShow==1?'block':'none'}}></div>
				<div className="home_wrap">
					<Link to="/" className="go_home"><i className="fa fa-home" aria-hidden="true"></i><span>回首页</span></Link>
				</div>
				<div className="new_notebook">
					<span className="create_note" onClick={this.newNoteClick}>
						<i className="fa fa-plus"></i>
						新建文集
					</span>
					<div className="new_notebook_form" style={{height: this.state.formHeight}}>
						<form onSubmit={this.handleSubmit} className="create_notebook_form">
							<input onChange={this.inputChange} value={this.state.newNoteName} type="text" placeholder="请输入文集名..." />
							<span onClick={this.newNoteClick}>取消</span>
							<button type="submit">提交</button>
						</form>
					</div>
				</div>
				<ul className="notebooks">
					{
						this.state.cat_lists.map((item,index)=>{
							return (
								<li onClick={this.catLiClick.bind(this,index)} data-id={item.id} className={index==this.state.activeCatIndex?'active':''} key={index}>
									<p className="notebook-name"><span>{item.name}</span></p>
									<i onClick={this.catSetting} className="fa fa-cog setting"></i>
									<ul style={{display:this.state.settingShow==1&&this.state.activeCatIndex==index?'block':'none'}} className="dropdown-menu arrow-top">
										<li>
											<a onClick={this.changeCat.bind(this,index)} type="button">
												<i className="fa fa-pencil-square-o"></i> 修改文集名
											</a>
										</li>
										<li className="divider"></li>
										<li>
											<a onClick={this.deleteCat.bind(this,index)} type="button">
												<i className="fa fa-trash-o"></i> 删除文集
											</a>
										</li>
									</ul>
								</li>
							)
						})
					}
				</ul>
				<div className="commercial">
					<a className="btn" href="/recycle">
						<i className="fa fa-trash"></i><span>回收站</span>
					</a>
				</div>
				<div style={{display:this.state.cat_change_index<0?'none':'block'}} className="rename_cat_wrap">
					<div className="box">
						<p className="title">修改文集名称</p>
						<input onChange={this.catNameChange.bind(this)} value={this.state.cat_change_name} type="text"/>
						<span onClick={this.catNameChangeSubmit} className="sure">修改</span>
						<span onClick={this.cancleChange.bind(this)} className="cancle">取消</span>
					</div>
				</div>
			</div>
		);
	}
}