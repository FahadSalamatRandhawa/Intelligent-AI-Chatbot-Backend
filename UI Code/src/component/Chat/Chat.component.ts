import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CONSTANTS } from '../../../constants';

@Component({
  selector: 'ChatBox',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  template: `
    <div class="flex items-center justify-center p-12 absolute bottom-0 right-0">
      <div class="w-full">
        <div
          class="formbold-form-wrapper mx-auto w-full max-w-[550px] rounded-lg border border-[#e0e0e0] bg-white"
          [ngClass]="{ hidden: !isVisible }"
        >
          <div class="flex items-center justify-between rounded-t-lg bg-[#A53412]/90 py-4 px-9">
            <h3 class="text-xl font-bold text-white">Chatbox - Online</h3>
            <button (click)="toggleChatbox()" class="text-white">
              <svg width="17" height="17" viewBox="0 0 17 17" class="fill-current">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z"
                />
              </svg>
            </button>
          </div>

          <div class="py-6 px-9">
            <!-- Show welcome message if messages array is empty -->
            <p
              *ngIf="messages.length === 0"
              class="text-base font-medium text-[#6B7280]"
            >
              Welcome! How can I assist you today?
            </p>

            <!-- Loop through and display messages -->
            <div
              *ngFor="let message of messages"
              class="my-2 p-2 rounded border border-gray-300 w-full"
              [ngClass]="{ ' bg-[#A53412]/90 text-white rounded-sm ': message.role === 'ai', 'bg-gray-200 rounded-sm ': message.role === 'user' }"
            >
              {{ message.content }}
            </div>

            <!-- Input and send button -->
            <div class="flex gap-2 mt-4 items-center">
              <input
                [(ngModel)]="userMessage"
                id="message"
                class="w-full p-2 border border-black/70 rounded-sm"
                placeholder="Type your message"
              />
              <button
                [disabled]="isProcessing"
                (click)="sendMessage()"
                class="flex h-[25px] w-[25px] scale-150 items-center justify-center text-center bg-[#d8623e] pb-1 rounded-full text-white"
              >
                &gt;
              </button>
            </div>
        </div>

        </div>

        <div class="mx-auto mt-12 flex max-w-[550px] items-center justify-end space-x-5">
          <button
            class="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#A53412]/10 text-white"
            (click)="toggleChatbox()"
          >
            <span [ngClass]="{ hidden: isVisible }" class="flex justify-center items-center">
              <img src="/chat_icon.png" alt="Icon 1" class="w-[80%] h-[80%]" />
            </span>

            <span [ngClass]="{ hidden: !isVisible }" class="flex justify-center items-center">
              <img src="/chat_icon.png" alt="Icon 2" class="w-[80%] h-[80%]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .formbold-form-wrapper {
        max-width: 550px;
        width: 100%;
        margin: 0 auto;
      }
      button {
        cursor: pointer;
      }
      .hidden {
        display: none;
      }
    `,
  ],
})
export class ChatboxComponent {
  isVisible = true;
  messages: { role: string; content: string }[] = [];
  userMessage = '';
  isProcessing=false;

  constructor(private http: HttpClient) {}

  toggleChatbox() {
    this.isVisible = !this.isVisible;
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ role: 'user', content: this.userMessage });
    const chatBody = { messages: this.messages, user_id: 'xxxxxxxx' };


    this.isProcessing=true;
    this.userMessage = '';
    this.http.post<any>(CONSTANTS.API_URL+'/chat', chatBody).subscribe({
      next: (response) => {
        this.messages.push({ role: 'ai', content: response.content });
        this.isProcessing=false

      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.isProcessing=false
      },
    });
  }
}
