import { Component, ElementRef, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { NotificationService } from '../notification.component';

@Component({
  selector: 'UpdateDocument',
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
    <hlm-dialog class="bg-[#D9D9D9]">
      <button id="edit-profile" class="gap-2 bg-[#D9D9D9] hover:bg-[#D9D9D9]" brnDialogTrigger hlmBtn>
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <g clip-path="url(#clip0_24_245)">
        <path d="M14.7695 1.23642L5.1175 10.8884C4.74885 11.2551 4.4566 11.6912 4.25766 12.1716C4.05871 12.652 3.95703 13.167 3.9585 13.687V14.7502C3.9585 14.9601 4.04191 15.1615 4.19037 15.31C4.33884 15.4584 4.5402 15.5418 4.75017 15.5418H5.81338C6.33331 15.5433 6.84838 15.4416 7.32875 15.2427C7.80912 15.0437 8.24526 14.7515 8.61192 14.3828L18.2639 4.73084C18.7266 4.26705 18.9864 3.63871 18.9864 2.98363C18.9864 2.32854 18.7266 1.7002 18.2639 1.23642C17.7934 0.786668 17.1676 0.535675 16.5167 0.535675C15.8658 0.535675 15.24 0.786668 14.7695 1.23642ZM17.1445 3.61142L7.4925 13.2634C7.0461 13.7071 6.44276 13.9569 5.81338 13.9585H5.54183V13.687C5.54348 13.0576 5.79324 12.4542 6.23692 12.0078L15.8889 2.35584C16.058 2.1943 16.2829 2.10416 16.5167 2.10416C16.7506 2.10416 16.9754 2.1943 17.1445 2.35584C17.3107 2.52249 17.404 2.74826 17.404 2.98363C17.404 3.219 17.3107 3.44476 17.1445 3.61142Z" fill="#121010"/>
        <path d="M18.2083 7.60838C17.9984 7.60838 17.797 7.69178 17.6485 7.84025C17.5001 7.98872 17.4167 8.19008 17.4167 8.40004V12.375H14.25C13.6201 12.375 13.016 12.6252 12.5706 13.0706C12.1252 13.516 11.875 14.1201 11.875 14.75V17.9167H3.95833C3.32844 17.9167 2.72435 17.6664 2.27895 17.221C1.83356 16.7756 1.58333 16.1716 1.58333 15.5417V4.45833C1.58333 3.82844 1.83356 3.22435 2.27895 2.77895C2.72435 2.33356 3.32844 2.08333 3.95833 2.08333H11.1166C11.3265 2.08333 11.5279 1.99993 11.6764 1.85146C11.8248 1.70299 11.9083 1.50163 11.9083 1.29167C11.9083 1.0817 11.8248 0.88034 11.6764 0.731874C11.5279 0.583408 11.3265 0.5 11.1166 0.5H3.95833C2.9089 0.501257 1.90282 0.918698 1.16076 1.66076C0.418698 2.40282 0.00125705 3.4089 0 4.45833L0 15.5417C0.00125705 16.5911 0.418698 17.5972 1.16076 18.3392C1.90282 19.0813 2.9089 19.4987 3.95833 19.5H12.9382C13.4583 19.5015 13.9735 19.3998 14.454 19.2009C14.9345 19.0019 15.3707 18.7097 15.7375 18.341L17.8402 16.2368C18.2089 15.8701 18.5013 15.434 18.7004 14.9536C18.8994 14.4733 19.0013 13.9582 19 13.4382V8.40004C19 8.19008 18.9166 7.98872 18.7681 7.84025C18.6197 7.69178 18.4183 7.60838 18.2083 7.60838ZM14.6181 17.2216C14.2999 17.539 13.8974 17.7588 13.4583 17.8549V14.75C13.4583 14.54 13.5417 14.3387 13.6902 14.1902C13.8387 14.0417 14.04 13.9583 14.25 13.9583H17.3573C17.2594 14.3965 17.0398 14.7982 16.724 15.1173L14.6181 17.2216Z" fill="#121010"/>
        </g>
        <defs>
        <clipPath id="clip0_24_245">
        <rect width="19" height="19" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
        </defs>
        </svg>
      </button>

        <hlm-dialog-content class="sm:max-w-[425px] min-w-[350px]" *  ="let ctx">
          <hlm-dialog-header>
            <h3 hlmDialogTitle>{{documentName}} Document</h3>
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

                <p *ngIf="missingInfo" class=" text-red-400 px-2 py-2">{{missingInfo}}</p>
          </div>
          <hlm-dialog-footer>
            <Button class="w-full" type="submit" (click)="handleUpload(ctx)">Upload</Button>
          </hlm-dialog-footer>
        </hlm-dialog-content>
    </hlm-dialog>
  `,
})

export class UpdateDocument {
    @ViewChild('apikeyInput') apiKeyInput?: ElementRef<HTMLInputElement>;
    @Input() documentName: string = 'Add'; // Input property for document name
    showDialog: boolean = true;  // To manage dialog visibility
    @Output() uploadSuccess = new EventEmitter<void>(); // EventEmitter to notify parent
    missingInfo=""
  
    constructor(private http: HttpClient, private notificationService: NotificationService) {}

    handleUpload(ctx:any) {
      const apiKey = this.apiKeyInput?.nativeElement.value;
      this.uploadSuccess.emit();
      // Check if API key is provided


    if (!apiKey) {
      this.missingInfo = 'API key is required'; // Update the missing info message
      return;
    }

    const fileInput = (document.getElementById('document') as HTMLInputElement).files?.[0];

    if (!fileInput) {
      this.missingInfo = 'File is missing'; // Update the missing info message
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput);
    formData.append('apiKey', apiKey);
    formData.append('filename',this.documentName)

    ctx.close()
    this.http.put(CONSTANTS.API_URL+`/update`, formData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess("Document updated successfully")

      },
      error: (error) => {
        console.error('Upload failed:', error.error.detail);
        this.notificationService.showError(error.error.detail)

      },
    });

    }
  }