import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../../constants';
import { PopupComponent } from '../../component/popup.component';

@Component({
  selector: 'app-conversation-viewer',
  standalone: true,
  imports: [CommonModule,PopupComponent],
  template: `
    <div class="container bg-green-200 w-full">
      <div class="sidebar">
        <div
          *ngFor="let conversation of conversations; let i = index"
          class="item"
          [ngClass]="{ active: i === selectedIndex }"
          (click)="selectConversation(i)"
        >
          {{ conversation.user_id }}
        </div>
      </div>
      <div class="content h-full overflow-y-scroll bg-white/80 ">
        <h2 class=" mt-3 mb-5">Messages</h2>
        <div
          class="message"
          *ngFor="let message of selectedMessages"
          [ngClass]="{ user: message.role === 'user', 'ai text-white bg-opacity-80 ': message.role === 'assistant' }"
        >
          {{ message.content }}
        </div>
      </div>

      <!-- Reusable Popup Component -->
      <app-popup [message]="errorMessage"></app-popup>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        background-color: #e6e6e6;
        padding: 16px;
        font-family: Arial, sans-serif;
        height: 100vh;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-right: 16px;
        width: 220px;
      }

      .item {
        padding: 8px;
        border: 1px solid #9d3934;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }

    .item.active {
        background-color: #A53412;
        color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adding shadow */
        }


      .content {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  max-height: 100%; /* Adjust this based on your design needs */
  overflow-y-auto: scroll; /* Enables vertical scrolling */
}


      .message {
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 8px;
        font-size: 14px;
      }

      .message.user {
      }

      .message.ai {
        background-color: #A53412;
        border: 1px solid #ccc;
      }
    `,
  ],
})

export class ConversationViewerComponent {
    
  errorMessage: string = '';

    constructor(private http: HttpClient) { }  
    
    conversations:{  _id: string;
        user_id: string;
        conversation_on: string;
        messages: {role: 'user' | 'assistant';
            content: string;}[];}[] = [];

  selectedMessages: { role: string; content: string }[] = [];
  selectedIndex = -1;

  selectConversation(index: number): void {
    this.selectedIndex = index;
    this.selectedMessages = this.conversations[index].messages;
  }

  ngOnInit(){
    this.http.get<any>(CONSTANTS.API_URL+"/conversations").subscribe(
        (data) => {
            this.conversations = data.conversations;  // Store the documents in the component property
            console.log("conversations : ", data)
          },
          (error) => {
            console.error('Error fetching documents:', error);  // Handle any error
            this.showError('Error fetching conversations');
          }
    )
  }
  private showError(message: string): void {
    this.errorMessage = message;

    // Reset the error message after 2 seconds
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }
}
