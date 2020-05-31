import { Component } from '@angular/core';

@Component({
  selector: 'layout-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.less'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.alain-fullscreen]': 'true',
  },
})
export class LayoutFullScreenComponent {}
