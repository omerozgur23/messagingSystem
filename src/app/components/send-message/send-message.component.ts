import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user/user.service';
import { SendMessageService } from '../../services/send-message/send-message.service';
import { SendMessageRequest } from '../../dtos/sendMessageRequest';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss'
})
export class SendMessageComponent implements OnInit {

  userList: any[] = [];

  constructor(
    private userService: UserService,
    private sendMessageService: SendMessageService,
    private toastr: ToastrService,
    private router: Router
  ){}
    
  messageForm!: FormGroup;

  ngOnInit() {
    this.messageForm = new FormGroup({
      recipientUser: new FormControl('', Validators.required),
      messageContent: new FormControl('', Validators.required),
    });
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getAllUser().subscribe({
      next: (result) => {
        this.userList = result.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sendMessage(){
    const sendMessageRequest = new SendMessageRequest(
      this.messageForm.get('recipientUser')?.value,
      this.messageForm.get('messageContent')?.value
    );

    this.sendMessageService.sendMessage(sendMessageRequest).subscribe({
      next: (response) => {
        this.toastr.success("Your message has been send")
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("An error occurred. Please try again")
      }
    })
  }

  goHome() {
    this.router.navigate(['/home'])
  }
}
