import { SenderService } from './../../../../core/services/sender.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-sender',
  templateUrl: './all-sender.component.html',
  styleUrls: ['./all-sender.component.css']
})
export class AllSenderComponent implements OnInit, OnDestroy {

  @Output() senderName = new EventEmitter<string>();
  listSender: any[];

  private subFindAllInternal: Subscription;

  constructor(
    private senderService: SenderService,
  ) { }

  ngOnInit() {
    this.subFindAllInternal = this.senderService.findAllInternal()
      .subscribe(response => {
        this.listSender = response;
        console.log(this.listSender)
      }, error => {

      });
  }

  ngOnDestroy(): void {
    if (this.subFindAllInternal)
      this.subFindAllInternal.unsubscribe();
  }

}
