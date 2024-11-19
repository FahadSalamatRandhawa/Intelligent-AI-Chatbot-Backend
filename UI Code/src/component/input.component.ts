
import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

@Component({
  selector: 'Input',
  standalone: true,
  imports: [HlmInputDirective],
  template: `<input class="w-80" hlmInput placeholder='Type here...' type='text' />`,
})
export class Input {}
