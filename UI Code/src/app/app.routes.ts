import { Routes } from '@angular/router';
import { ConversationViewerComponent } from './conversations/conversations.component';
import { DocumentsManage } from './Home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: 'documents', component: DocumentsManage }, // Home Page
  { path: 'conversations', component: ConversationViewerComponent }, // Conversations Page
];
