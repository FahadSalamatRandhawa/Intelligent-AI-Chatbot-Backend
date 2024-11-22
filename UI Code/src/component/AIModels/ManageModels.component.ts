// ManageModels.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AddModel } from './AddModel.component';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../../constants';
import { NotificationService } from '../notification.component';

@Component({
  selector: 'ManageModels',
  standalone: true,
  imports: [
    CommonModule,
    AddModel,
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
    Button
  ],
  template: `
    <hlm-dialog class="bg-[#D9D9D9]">
      <button id="edit-profile" class="bg-[#A53412] hover:bg-[#A53412]/90 rounded-none gap-3" brnDialogTrigger hlmBtn>
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_24_245)">
            <path d="M14.7695 1.23642L5.1175 10.8884C4.74885 11.2551 4.4566 11.6912 4.25766 12.1716C4.05871 12.652 3.95703 13.167 3.9585 13.687V14.7502C3.9585 14.9601 4.04191 15.1615 4.19037 15.31C4.33884 15.4584 4.5402 15.5418 4.75017 15.5418H5.81338C6.33331 15.5433 6.84838 15.4416 7.32875 15.2427C7.80912 15.0437 8.24526 14.7515 8.61192 14.3828L18.2639 4.73084C18.7266 4.26705 18.9864 3.63871 18.9864 2.98363C18.9864 2.32854 18.7266 1.7002 18.2639 1.23642C17.7934 0.786668 17.1676 0.535675 16.5167 0.535675C15.8658 0.535675 15.24 0.786668 14.7695 1.23642ZM17.1445 3.61142L7.4925 13.2634C7.0461 13.7071 6.44276 13.9569 5.81338 13.9585H5.54183V13.687C5.54348 13.0576 5.79324 12.4542 6.23692 12.0078L15.8889 2.35584C16.058 2.1943 16.2829 2.10416 16.5167 2.10416C16.7506 2.10416 16.9754 2.1943 17.1445 2.35584C17.3107 2.52249 17.404 2.74826 17.404 2.98363C17.404 3.219 17.3107 3.44476 17.1445 3.61142Z" fill="#F3E4E4"/>
            <path d="M18.2083 7.60838C17.9984 7.60838 17.797 7.69178 17.6485 7.84025C17.5001 7.98872 17.4167 8.19008 17.4167 8.40004V12.375H14.25C13.6201 12.375 13.016 12.6252 12.5706 13.0706C12.1252 13.516 11.875 14.1201 11.875 14.75V17.9167H3.95833C3.32844 17.9167 2.72435 17.6664 2.27895 17.221C1.83356 16.7756 1.58333 16.1716 1.58333 15.5417V4.45833C1.58333 3.82844 1.83356 3.22435 2.27895 2.77895C2.72435 2.33356 3.32844 2.08333 3.95833 2.08333H11.1166C11.3265 2.08333 11.5279 1.99993 11.6764 1.85146C11.8248 1.70299 11.9083 1.50163 11.9083 1.29167C11.9083 1.0817 11.8248 0.88034 11.6764 0.731874C11.5279 0.583408 11.3265 0.5 11.1166 0.5H3.95833C2.9089 0.501257 1.90282 0.918698 1.16076 1.66076C0.418698 2.40282 0.00125705 3.4089 0 4.45833L0 15.5417C0.00125705 16.5911 0.418698 17.5972 1.16076 18.3392C1.90282 19.0813 2.9089 19.4987 3.95833 19.5H12.9382C13.4583 19.5015 13.9735 19.3998 14.454 19.2009C14.9345 19.0019 15.3707 18.7097 15.7375 18.341L17.8402 16.2368C18.2089 15.8701 18.5013 15.434 18.7004 14.9536C18.8994 14.4733 19.0013 13.9582 19 13.4382V8.40004C19 8.19008 18.9166 7.98872 18.7681 7.84025C18.6197 7.69178 18.4183 7.60838 18.2083 7.60838ZM14.6181 17.2216C14.2999 17.539 13.8974 17.7588 13.4583 17.8549V14.75C13.4583 14.54 13.5417 14.3387 13.6902 14.1902C13.8387 14.0417 14.04 13.9583 14.25 13.9583H17.3573C17.2594 14.3965 17.0398 14.7982 16.724 15.1173L14.6181 17.2216Z" fill="#F3E4E4"/>
            </g>
            <defs>
            <clipPath id="clip0_24_245">
            <rect width="19" height="19" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
            </defs>
        </svg>

      Manage AI Models</button>

      <hlm-dialog-content class="sm:max-w-[425px] min-w-[350px]" *brnDialogContent="let ctx">
        <hlm-dialog-header>
          <h3 hlmDialogTitle>Add a new Model</h3>
          <p hlmDialogDescription>Delete or add an OpenAI model</p>
        </hlm-dialog-header>

        <div class="py-6 px-2 grid gap-4 items-start">

          <!-- Headings -->
          <div class="grid grid-cols-5 py-2 font-medium text-lg">
            <p class=" col-span-2">Name</p>
            <p class=" col-span-2">Id</p>

            <div class=" self-end">
            </div>
          </div>

          <!-- Render the models list -->
          <div *ngFor="let model of models" class="grid grid-cols-5 py-2"    [ngClass]="model.id === default_model_id ? 'border-b-[0.5px] border-[#A53412]' : 'border-b-[0.5px] border-black'">
            <p class=" col-span-2">{{ model.name }}</p>
            <p class=" col-span-2">{{ model.id }}</p>

            <div class=" self-end" (click)="deleteModel(model.id)">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.9 9.05C15.72 8.83 13.52 8.72 11.33 8.72C10.03 8.72 8.72997 8.79 7.43997 8.92L6.09998 9.05" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.70996 8.39L9.84996 7.53C9.94996 6.91 10.03 6.44 11.14 6.44H12.86C13.97 6.44 14.0499 6.93 14.1499 7.53L14.2899 8.38" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.49 9.13L16.06 15.73C15.99 16.76 15.93 17.56 14.1 17.56H9.89C8.06 17.56 7.99999 16.76 7.92999 15.73L7.5 9.13" stroke="#BA3D28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Dialog to add new Model -->
          <AddModel (closeParent)="close(ctx)"/>
      </hlm-dialog-content>
    </hlm-dialog>
  `,
})
export class ManageModels {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}
  models:{name:string,id:string}[] = [
  ];
  default_model_id:string="";

  ngOnInit() {
    this.fetchModels()
  }

  close(ctx:any){
    ctx.close()
  }

  deleteModel(id:string){
    this.http.delete(CONSTANTS.API_URL+`/models/remove/${id}`).subscribe(
      () => {
        // After successful deletion, remove the document from the array
        this.models = this.models.filter((model) => model.id !== id);
      },
      (error) => {
        this.notificationService.showError(error.error.detail)
      }
    )
  }

  fetchModels(){
    console.log("Fetchind Models")
    this.http.get<any>(CONSTANTS.API_URL+"/models/available").subscribe(
      (data) => {
        this.models = data.available_models;
        this.default_model_id=data.default_model_id

      },
      (error) => {
        this.notificationService.showError(error.error.detail)
      }
    )
  }
}
