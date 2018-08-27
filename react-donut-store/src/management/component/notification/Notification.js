import React, { Component } from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import './Notification.css';
import { LOCAL_STORAGE } from '../../../share/constant/local-storage.constant';
import * as NotiService from './NotificationApiCaller';
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
		NotiService.findList().then(({ data }) => {
			this.setState({
				listNoti: data.content,
			}, () => {
				this.setState({
					countNotSeen: this.countNotSeen(),
				})
				console.log(this.state);
			})
			this.connect();
		})
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
				<div key={index} className={`noti-single-noti ${redNoti}`} onClick={() => this.onSetHasSeen(noti.id)}>
					<span className="noti-text">{noti.text}</span>
					<span className="noti-timeline"><i className="far fa-clock"></i> {NotiService.elapsedTime(noti.time)}</span>
					<hr/>
				</div>
			)
		}) : null;
	}

	onSetHasSeen = (id) => {
		NotiService.userHasSeen({ id: id }).then(({ data }) => {
			this.setState({
				countNotSeen: this.countNotSeen(),
			})
		}).catch((error) => {
			console.log(error);
		})
	}
	countNotSeen = () => {
		let count = 0;
		if (this.state.listNoti.length > 0) {
			this.state.listNoti.forEach(i => {
				if (!i.seen) count = count + 1;
			});
		}
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

export default Notification;