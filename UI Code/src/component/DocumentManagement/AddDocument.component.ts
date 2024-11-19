
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { Button } from '../button.component';
import { CONSTANTS } from '../../../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-document',
  standalone: true,
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    Button,
    CommonModule
  ],
  template: `
    <hlm-dialog  class=" bg-[#D9D9D9]" >
      <button id="edit-profile" class=" gap-2 bg-[#A53412] hover:bg-[#A53412]/90 rounded-none" brnDialogTrigger hlmBtn>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_4_125)">
          <path d="M9 18C8.20435 18 7.44129 17.6839 6.87868 17.1213C6.31607 16.5587 6 15.7956 6 15V12H3C2.20435 12 1.44129 11.6839 0.87868 11.1213C0.316071 10.5587 0 9.79565 0 9C0 8.20435 0.316071 7.44129 0.87868 6.87868C1.44129 6.31607 2.20435 6 3 6H6V3C6 2.20435 6.31607 1.44129 6.87868 0.87868C7.44129 0.316071 8.20435 0 9 0C9.79565 0 10.5587 0.316071 11.1213 0.87868C11.6839 1.44129 12 2.20435 12 3V6H15C15.7956 6 16.5587 6.31607 17.1213 6.87868C17.6839 7.44129 18 8.20435 18 9C18 9.79565 17.6839 10.5587 17.1213 11.1213C16.5587 11.6839 15.7956 12 15 12H12V15C12 15.7956 11.6839 16.5587 11.1213 17.1213C10.5587 17.6839 9.79565 18 9 18ZM3 7.5C2.60218 7.5 2.22064 7.65804 1.93934 7.93934C1.65804 8.22064 1.5 8.60218 1.5 9C1.5 9.39782 1.65804 9.77936 1.93934 10.0607C2.22064 10.342 2.60218 10.5 3 10.5H6.75C6.94891 10.5 7.13968 10.579 7.28033 10.7197C7.42098 10.8603 7.5 11.0511 7.5 11.25V15C7.5 15.3978 7.65804 15.7794 7.93934 16.0607C8.22064 16.342 8.60218 16.5 9 16.5C9.39782 16.5 9.77936 16.342 10.0607 16.0607C10.342 15.7794 10.5 15.3978 10.5 15V11.25C10.5 11.0511 10.579 10.8603 10.7197 10.7197C10.8603 10.579 11.0511 10.5 11.25 10.5H15C15.3978 10.5 15.7794 10.342 16.0607 10.0607C16.342 9.77936 16.5 9.39782 16.5 9C16.5 8.60218 16.342 8.22064 16.0607 7.93934C15.7794 7.65804 15.3978 7.5 15 7.5H11.25C11.0511 7.5 10.8603 7.42098 10.7197 7.28033C10.579 7.13968 10.5 6.94891 10.5 6.75V3C10.5 2.60218 10.342 2.22064 10.0607 1.93934C9.77936 1.65804 9.39782 1.5 9 1.5C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3V6.75C7.5 6.94891 7.42098 7.13968 7.28033 7.28033C7.13968 7.42098 6.94891 7.5 6.75 7.5H3Z" fill="#F3E4E4" fill-opacity="0.8"/>
          </g>
          <defs>
          <clipPath id="clip0_4_125">
          <rect width="18" height="18" fill="white"/>
          </clipPath>
          </defs>
        </svg>

        Add Document
      </button>


<ng-template [ngIf]="showDialog">
  <hlm-dialog-content class="sm:max-w-[425px] min-w-[350px]" *brnDialogContent="let ctx">
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Add Document</h3>
      <p hlmDialogDescription>Upload a document for the AI chatbot to use</p>
    </hlm-dialog-header>
    <div class="py-6 px-2 grid gap-4 items-start">
      <div class="w-full flex flex-col gap-4">
        <label hlmLabel for="document">Document</label>
        <input hlmInput id="document" type="file" class="col-span-3" />
      </div>
      <div class="w-full flex flex-col gap-4">
        <label hlmLabel for="api">API Key</label>
        <input hlmInput #apikeyInput placeholder="Your API key here" type="password" id="api" class="col-span-3" />
      </div>
    </div>
    <hlm-dialog-footer>
      <Button class="w-full" type="submit" (click)="handleUpload()">Upload</Button>
    </hlm-dialog-footer>
  </hlm-dialog-content>
</ng-template>

    </hlm-dialog>
  `,
})
export class AddDocument {
  @ViewChild('apikeyInput') apiKeyInput?: ElementRef<HTMLInputElement>;
  showDialog: boolean = true;  // To manage dialog visibility
  @Output() uploadSuccess = new EventEmitter<void>(); // EventEmitter to notify parent

  constructor(private http: HttpClient) {}

  handleUpload() {
    const apiKey = this.apiKeyInput?.nativeElement.value;
    this.uploadSuccess.emit();
    // Check if API key is provided
    if (!apiKey) {
      alert('API key is required');
      return;
    }
    const fileInput = (document.getElementById('document') as HTMLInputElement).files?.[0];

    if (!fileInput) {
      alert('File is missing');
      return;
    }


    const formData = new FormData();
    formData.append('file', fileInput);
    formData.append('apiKey', apiKey);

    this.http.post(CONSTANTS.API_URL+"/upload", formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        // Emit success event to parent component
        // Close the dialog before sending the API request
         this.showDialog =false;
      },
      error: (error) => {
        console.error('Upload failed:', error);
        // Close the dialog before sending the API request
        this.showDialog =false;
      },
    });
  }
}
