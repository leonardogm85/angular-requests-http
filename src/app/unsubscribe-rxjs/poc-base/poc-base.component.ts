import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  templateUrl: './poc-base.component.html',
  styleUrls: ['./poc-base.component.css']
})
export class PocBaseComponent {

  @Input() name?: string;
  @Input() value?: string;
  @Input() color?: string;

}
