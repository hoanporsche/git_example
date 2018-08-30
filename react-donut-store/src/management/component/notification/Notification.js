import React, { Component } from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import './Notification.css';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
import * as NotiService from './NotificationApiCaller';
import { PAGE_MAIN_NAME } from '../../../enviroment';
import { connect } from 'react-redux';
import { fetListOrder } from '../../../redux/action/order.constant';

let stompClient;
const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER));

class Notification extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showNotiInfo: false,
			listNoti: [],
			countNotSeen: 0,
		}
		const socket = new SockJS(NotiService.notificationUrl);
		stompClient = Stomp.over(socket);
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside, true);
		NotiService.findList().then(({ data }) => {
			this.setState({
				listNoti: data.content,
			}, () => {
				this.setState({
					countNotSeen: this.countNotSeen(),
				});
			})
			this.connect();
		});
	}

	handleClickOutside = (event) => {
		const className = event.target.className;
		const approvedClassName = ["far fa-bell","noti-content","noti-text","noti-timeline","noti-single-noti "];
		if (approvedClassName.indexOf(className) === -1) {
			this.setState({showNotiInfo: false})
		}
	}

	connect = () => {
		stompClient.connect({}, frame => {
			stompClient.subscribe(NotiService.subcriceUrl + currentUser.email, notification => {
				this.setState({
					listNoti: [].concat(JSON.parse(notification.body)).concat(this.state.listNoti),
				}, () => {
					this.setState({
						countNotSeen: this.countNotSeen(),
					})
				})
			})
		})
	}

	onSetupNotiInfo = () => {
		this.setState({
			showNotiInfo: !this.state.showNotiInfo,
		})
	}

	showNotiInfo = () => {
		return this.state.showNotiInfo ? (
			<div className="noti-info">
				<div className="noti-content">
					{this.showSingleNoti()}
				</div>
			</div>
		) : null;
	}

	showSingleNoti = () => {
		const { listNoti } = this.state;
		return listNoti.length > 0 ? listNoti.map((noti, index) => {
			const redNoti = noti.seen ? '' : 'red-noti'
			return (
				<div key={index} className={`noti-single-noti ${redNoti}`} onClick={() => this.onSetHasSeen(noti)}>
					<span className="noti-text">{noti.text}</span>
					<span className="noti-timeline"><i className="far fa-clock"></i> {NotiService.elapsedTime(noti.time)}</span>
					<hr />
				</div>
			)
		}) : null;
	}

	onSetHasSeen = (noti) => {
		if (!noti.seen) {
			NotiService.userHasSeen({ id: noti.id }).then(({ data }) => {
				const { listNoti } = this.state;
				const index = listNoti.findIndex(i => +i.id === +data.id);
				this.setState({
					listNoti: [].concat(listNoti.slice(0, index)).concat(data).concat(listNoti.slice(index + 1)),
				}, () => {
					this.setState({
						countNotSeen: this.countNotSeen(),
					});
				})
			}).catch((error) => {
				console.log(error);
			});
		}
		this.props.fetchListOrder({searchString: noti.text.substring(13,33),size: 15, sort: 'code,desc'});
	}
	countNotSeen = () => {
		let count = 0;
		if (this.state.listNoti.length > 0) {
			this.state.listNoti.forEach(i => {
				if (!i.seen) count = count + 1;
			});
		}
		document.title = count === 0 ? PAGE_MAIN_NAME : `(${count}) Thông báo mới`;
		return count;
	}
	render() {
		const { countNotSeen } = this.state;
		const redBell = countNotSeen === 0 ? '' : 'red-bell';
		return (
			<div id="notification-custom">
				<div className={`noti-icon active ${redBell}`} onClick={this.onSetupNotiInfo}>
					<span>{countNotSeen} </span>
					<i className="far fa-bell"></i>
				</div>
				{this.showNotiInfo()}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchListOrder: (params) => {
			dispatch(fetListOrder(params));
		}
	}
}
export default connect(null, mapDispatchToProps)(Notification);