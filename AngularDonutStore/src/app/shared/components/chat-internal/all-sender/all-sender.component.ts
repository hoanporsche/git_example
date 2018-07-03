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

  @Output() senderName = new EventEmitter<string>();
  listInternalSender: any[];
  listNotInternalSender: any[];

  private param = {
    page: 0,
    size: CONFIG.PAGE_MAX_SIZE,
    sort: 'id,desc'
  }

  private subFindAllInternal: Subscription;
  private subFindAllNotInternalToday: Subscription;

  constructor(
    private senderService: SenderService,
  ) { }

  ngOnInit() {
    this.subFindAllInternal = this.senderService.findAllInternal(this.param)
      .subscribe(response => {
        this.listInternalSender = response.content;
        this.param.size = CONFIG.PAGE_SIZE;
        this.subFindAllNotInternalToday = this.senderService.findAllNotInternalToday(this.param)
          .subscribe(response => {
            this.listNotInternalSender = response.content;
          }, error => {

          });
      }, error => {

      });
  }

  ngOnDestroy(): void {
    if (this.subFindAllInternal)
      this.subFindAllInternal.unsubscribe();
  }

}
