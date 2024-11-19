import { Component, ViewChild, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { AddDocument } from '../component/DocumentManagement/AddDocument.component';
import { ManageModels } from '../component/AIModels/ManageModels.component';
import { DefaultModel } from '../component/AIModels/DefaultModel.component';
import { Documents } from './documents.component';

@Component({
  selector: 'top-layer',
  standalone: true,
  imports: [AddDocument, ManageModels, DefaultModel, Documents],
  template: `
    <div class='flex gap-5 justify-between pl-4'>
      <div class="flex gap-5">
      <add-document #addDoc (uploadSuccess)="onUploadSuccess()"/>
        <ManageModels/>
      </div>
      <div class="flex gap-3 items-center mr-[10%]">
        <div>Default AI Model</div>
        <DefaultModel/>
      </div>
    </div>
  `
})
export class TopLayer {
  @Output() refetchDocuments = new EventEmitter<void>(); // EventEmitter to notify parent on success

  // This method is triggered when the event is emitted from AddDocument
  onUploadSuccess() {
    console.log("Passing event from AddDocument to App");

    this.refetchDocuments.emit()
  }
}
