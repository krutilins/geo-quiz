import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appFreeDragging]'
})
export class FreeDraggingDirective implements OnInit, OnDestroy {
  private element: HTMLElement;

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.element = this.elementRef.nativeElement as HTMLElement;
  }

  public ngOnInit(): void {
    this.initDrag();
  }

  public initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.element.classList.add('free-dragging');

      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        this.element.style.transformOrigin = currentX + 'px ' + currentY + 'px';
      });
      this.subscriptions.push(dragSub);
    });

    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.element.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push(dragStartSub);
    this.subscriptions.push(dragEndSub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
