import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapBoxComponent {

  public scale = 100;
  public top = 0;
  public left = 0;

  @Output()
  public selectCountry: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();


  public zoom(ev: WheelEvent) {
    const newScale = this.scale - ev.deltaY * 0.2;
    this.scale = Math.max(newScale, 100);

    const newTop = this.top - (this.top - ev.clientY) / 10;
    this.top = newTop >= 0 ? newTop : 0;

    const newLeft = this.left - (this.left - ev.clientX) / 10;
    this.left = newLeft >= 0 ? newLeft : 0;
  }

  public handleMapClick($event: MouseEvent) {
    this.selectCountry.emit($event);
  }

}
