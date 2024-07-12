import { Component, OnInit } from '@angular/core';
import { InboxService } from '../../services/inbox/inbox.service';
import { TableColumn } from '../../models/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { GetMessageDetailRequest } from '../../dtos/getMessageDetailRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements OnInit{

  tableTitle = "Messages"
  tableData: any[] = [];
  originalTableData: any[] = [];
  columns: TableColumn[] = [
    { label: "Sender", field: "senderUsername" },
    { label: "Message", field: "messageContent" },
    { label: "Sending Date", field: "sendingDate" },
  ]

  messageDetail: any = {};


  constructor(
    private inboxService: InboxService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(){
    this.inboxService.getMessage().subscribe({
      next: (result) => {
        this.tableData = result.data;
        this.originalTableData = result.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getMessageDetail(id: string){
    const request = new GetMessageDetailRequest(id);
    this.inboxService.getMessageDetail(request).subscribe({
      next: (result) => {
        this.messageDetail = result
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getUnreadMessages() {
    this.inboxService.getUnreadMessages().subscribe({
      next: (result) => {
        this.tableData = result.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onCheckBoxChange(event: any): void {
    if (event.target.checked) {
      this.getUnreadMessages();
    } else {
      this.tableData = this.originalTableData;
    }
  }

  goHome(){
    this.router.navigate(['/home'])
  }

  truncateText(text: string, length: number): string {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + '...';
  }

  isCritical(item: any, fieldName: string): boolean {
    if (fieldName === 'readed') {
      return !item[fieldName];
    }
    return false;
  }

  onModalClose() {
    this.getMessages();
  }

}
