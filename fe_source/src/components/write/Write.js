import React,{ Component } from 'react';
import {
	NavLink
} from 'react-router-dom'
import './write.less';
import LeftBar from './left_bar/LeftBar';
import CenterList from './center_list/CenterList';
import Editor from './editor/Editor';

export default class Write extends Component{
	constructor(props){
		super(props);
		this.state = {
			cat_id:0,//选中的分类id
			editor_id:0,//选中的文章id
		};
		this.catChange = this.catChange.bind(this);
	}
	catChange(id){
		this.setState({
			cat_id:id
		});
	}
	render(){
		return (
			<div className="write_container">
				<div className="left_handle">
					<LeftBar clickHandle={this.catChange} />
				</div>
				<div className="center_handle">
					<CenterList cat_id={this.state.cat_id} />
				</div>
				<div className="right_handle">
					<Editor id={this.state.editor_id} />
				</div>
			</div>
		);
	}
}