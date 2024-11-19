import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Button } from '../button.component';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CONSTANTS } from '../../../constants';

@Component({
  selector: 'AddModel',
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
    Button
  ],
  template: `
    <hlm-dialog class="bg-[#D9D9D9]">
      <button id="add-model" class="w-full bg-[#A53412] hover:bg-[#A53412]/90 rounded-none" brnDialogTrigger hlmBtn>Add Model</button>

      <hlm-dialog-content class="sm:max-w-[425px] min-w-[350px]" *brnDialogContent="let ctx">
        <hlm-dialog-header>
          <h3 hlmDialogTitle>Add a new Model</h3>
          <p hlmDialogDescription>Upload a document for the AI chatbot to use</p>
        </hlm-dialog-header>

        <div class="py-6 px-2 grid gap-4 items-start">
          <div class="w-full flex flex-col gap-4">
            <label hlmLabel for="name">Name</label>
            <input hlmInput id="name" placeholder="GPT 3.5 Turbo" class="col-span-3" />
          </div>
          <div class="w-full flex flex-col gap-4">
            <label hlmLabel for="model_id">Id</label>
            <input hlmInput id="model_id" placeholder="gpt-3.5-turbo" class="col-span-3" />
          </div>
        </div>

        <hlm-dialog-footer class="w-full flex justify-center">
          <Button class="w-full" type="submit" (onClick)="handleUpload()">Verify and Add</Button>
        </hlm-dialog-footer>
      </hlm-dialog-content>
    </hlm-dialog>
  `,
})
export class AddModel {
  @Output() modelAddSuccess = new EventEmitter<void>(); // EventEmitter to notify parent

  constructor(private http: HttpClient) {}

  handleUpload() {

    // Get the values using document.getElementById
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const modelId = (document.getElementById('model_id') as HTMLInputElement).value;

    if(!name||!modelId){
      alert("Invalid values")
      return;
    }

    // Create the model data object
    const modelData = {
      name: name,
      id: modelId,
    };

    // Send the API request
    this.http.post(CONSTANTS.API_URL+'/models/add', modelData)
      .subscribe({
        next: (response) => {
          console.log('Model added successfully:', response);
          this.modelAddSuccess.emit()
        },
        error: (error) => {
          console.error('Error adding model:', error);
        },
      });
  }
}
