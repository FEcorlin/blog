import React,{ Component } from 'react';
import './editor.less';
import Apiconfig from '../../../common/Apiconfig';


export default class Write extends Component{
	constructor(props){
		super(props);
		this.state = {
			id:this.props.id
		};
	}
	componentDidMount(){
		this.getDetails();
	}
	componentWillReceiveProps(nextProps){
		//this.
	}
	getDetails(){
		fetch(new Apiconfig().apiUrl+'articles?id='+this.state.id)
		.then((res)=>{return res.json();})
		.then((data)=>{
			console.log(data);
		});
	}
	render(){
		return (
			<div>
				<div className="no-notes" style={{display:this.state.id==0?"block":"none"}}><span>NOTE</span></div>
				<div className="note_form" style={{display:this.state.id==0?"none":"block"}}>
					<input type="text" className="title" value="" />
					<ul className="toolbar clearfix">
						<li className="menu">
							<a type="button" className="fa fa-bold" data-toggle="tooltip" data-original-title="粗体"></a>
							<ul className="inline_menu">
								<li><a type="button" className="fa fa-bold" data-toggle="tooltip" data-original-title="粗体"></a></li>
								<li><a className="fa fa-italic" data-toggle="tooltip" data-original-title="斜体"></a></li>
								<li><a className="fa fa-strikethrough" data-toggle="tooltip" data-original-title="删除线"></a></li>
								<li><a className="fa fa-quote-left" data-toggle="tooltip" data-original-title="引用"></a></li>
							</ul>
						</li>
						<li className="menu">
							<a className="fa font1" data-toggle="tooltip" data-original-title="标题一">H1</a>
							<ul className="inline_menu">
								<li><a className="fa font1" data-toggle="tooltip" data-original-title="标题一">H1</a></li>
								<li><a className="fa font2" data-toggle="tooltip" data-original-title="标题二">H2</a></li>
								<li><a className="fa font3" data-toggle="tooltip" data-original-title="标题三">H3</a></li>
								<li><a className="fa font4" data-toggle="tooltip" data-original-title="标题四">H4</a></li>
							</ul>
						</li>
						<li><a className="fa fa-picture-o" data-toggle="tooltip" data-original-title="插入图片"></a></li>
						<li><a className="fa fa-link" data-toggle="tooltip" data-original-title="插入链接"></a></li>
						<li><a className="fa fa-minus-no-use" data-toggle="tooltip" data-original-title="分割线">—</a></li>
						<li><a className="fa fa-youtube-play" data-toggle="tooltip" data-original-title="插入视频"></a></li>
						<li className="menu">
							<a className="fa fa-undo" data-toggle="tooltip" data-original-title="撤销"></a>
							<ul className="inline_menu">
								<li><a className="fa fa-undo" data-toggle="tooltip" data-original-title="撤销"></a></li>
								<li><a className="fa fa-repeat" data-toggle="tooltip" data-original-title="重做"></a></li>
							</ul>
						</li>
						<li className="pull-right publish-button-item">
							<a type="button" className="publishButton"><i className="fa fa-mail-forward"></i>发布文章</a>
						</li>
						<li className="pull-right">
							<a type="button" data-action="trigger-writing-mode" data-toggle="tooltip" data-original-title="切换到写作模式"><i className="fa fa-expand"></i> </a>
						</li>
						<li className="pull-right">
							<a className="fa save" type="button" data-action="trigger-save" data-toggle="tooltip" data-original-title="保存"><i className="fa fa-floppy-o"></i></a>
						</li>
						<li className="history-btn">
							<a type="button" data-action="trigger-history-mode" data-toggle="tooltip" data-original-title="历史版本"><i className="fa fa-clock-o"></i></a>
						</li>
					</ul>
					<div className="kalamu-area" contentEditable="true">
					</div>
				</div>
			</div>
		);
	}
}