import { Component, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngu-tile',
  templateUrl: 'ngu-tile.component.html',
  styleUrls: ['ngu-tile.component.css']
})
export class NguTileComponent {
  @HostBinding('class.item') classes = true;
}
