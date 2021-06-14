import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapBoxComponent {

  public scale = 100;

  @Output()
  public selectCountry: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();


  public zoom(ev: WheelEvent) {
    const newScale = this.scale - ev.deltaY * 0.2;
    this.scale = Math.max(newScale, 100);
  }

  public handleMapClick($event: MouseEvent) {
    this.selectCountry.emit($event);
  }

}
