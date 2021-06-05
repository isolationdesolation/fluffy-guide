import { Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[activeDirective]',
  exportAs: "activeDirective"
})
export class ActiveDirective {

  @HostBinding('class')
  elementClass = 'custom-theme';

  constructor() {
  }
}