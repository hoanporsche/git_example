import { IdentityService } from './../../../../core/services/identity.service';
import { SenderService } from './../../../../core/services/sender.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../../constants/configuration.constant';

@Component({
  selector: 'app-all-sender',
  templateUrl: './all-sender.component.html',
  styleUrls: ['./all-sender.component.css']
})
export class AllSenderComponent implements OnInit, OnDestroy {

  @Output() emitSender = new EventEmitter<any>();
  listInternalSender: any[];
  listNotInternalSender: any[];

  private isAdmin;
  private param = {
    page: 0,
    size: CONFIG.PAGE_MAX_SIZE,
    sort: 'id,desc'
  }

  private subFindAllInternal: Subscription;
  private subFindAllNotInternalIn24H: Subscription;
  private subFindAllNotInternalIn24HInChargeOfUser: Subscription;

  constructor(
    private senderService: SenderService,
    private identityService: IdentityService,
  ) {
    this.isAdmin = this.identityService.isAdmin();
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.subFindAllInternal = this.senderService.findAllInternal(this.param)
      .subscribe(response => {
        this.listInternalSender = response.content;
        this.param.size = CONFIG.PAGE_SIZE;
        this.findAllNotInternalIn24H();
      }, error => {

      });
  }

  private findAllNotInternalIn24H() {
    if (this.isAdmin) {
      this.subFindAllNotInternalIn24H = this.senderService.findAllNotInternalIn24h(this.param)
        .subscribe(response => {
          this.listNotInternalSender = response.content;
        }, error => {

        });
    } else {
      this.subFindAllNotInternalIn24HInChargeOfUser = this.senderService.findAllNotInternalIn24hInChargeOfUser(this.param)
        .subscribe(response => {
          this.listNotInternalSender = response.content;
        }, error => {

        });
    }
  }

  getSender(sender) {
    this.emitSender.emit(sender);
  }
  ngOnDestroy(): void {
    if (this.subFindAllInternal)
      this.subFindAllInternal.unsubscribe();
    if (this.subFindAllNotInternalIn24H)
      this.subFindAllNotInternalIn24H.unsubscribe();
    if (this.subFindAllNotInternalIn24HInChargeOfUser)
      this.subFindAllNotInternalIn24HInChargeOfUser.unsubscribe();
  }

}
