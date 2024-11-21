import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'api-key-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4">Enter API Key</h2>
        <form [formGroup]="apiKeyForm" (ngSubmit)="submitApiKey()">
          <div class="mb-4">
            <label for="apiKey" class="block text-sm font-medium">API Key</label>
            <input
              id="apiKey"
              type="text"
              formControlName="apiKey"
              class="w-full p-2 border rounded mt-1"
              placeholder="Enter your API key"
            />
          </div>
          <div class="flex justify-end gap-4">
            <button type="button" class="px-4 py-2 bg-gray-300 rounded" (click)="cancel()">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ApiKeyModalComponent {
  @Output() apiKeySubmitted = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<void>();

  apiKeyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.apiKeyForm = this.fb.group({
      apiKey: [''],
    });
  }

  submitApiKey() {
    if (this.apiKeyForm.valid) {
      this.apiKeySubmitted.emit(this.apiKeyForm.value.apiKey);
    }
  }

  cancel() {
    this.modalClosed.emit();
  }
}
