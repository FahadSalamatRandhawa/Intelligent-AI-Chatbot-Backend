import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

// Notification Service
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<{ type: 'success' | 'error'; message: string }>();
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    console.log('Show Success received:', message);
    this.notificationSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    console.log('Show Error received:', message);
    this.notificationSubject.next({ type: 'error', message });
  }
}

// Notification Component (standalone)
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notification" [ngClass]="notification.type" class="notification">
      {{ notification.message }}
    </div>
  `,
  styles: [
    `
      .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        margin: 10px;
        border-radius: 5px;
        font-size: 14px;
        color: white;
        z-index: 1000;
        animation: fadeInOut 4s forwards;
      }

      .success {
        background-color: green;
      }

      .error {
        background-color: red;
      }

      @keyframes fadeInOut {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(10px);
        }
        20% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(10px);
        }
      }
    `
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: { type: 'success' | 'error'; message: string } | null = null;
  private notificationSubscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to the notification stream
    this.notificationSubscription = this.notificationService.notification$.subscribe(
      (notification) => {
        this.notification = notification;
        
        // Set a timeout to hide the notification after 3 seconds
        setTimeout(() => {
          this.notification = null;
        }, 3000);  // Hide after 3 seconds
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
