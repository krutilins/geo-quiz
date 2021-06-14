import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreeDraggingDirective } from './directives/free-dragging.directive';

@NgModule({
  declarations: [
    FreeDraggingDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FreeDraggingDirective
  ]
})
export class SharedModule { }
