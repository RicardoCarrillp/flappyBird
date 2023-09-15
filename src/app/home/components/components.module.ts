import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirdComponent } from './bird/bird.component';
import { ObstacleComponent } from './obstacle/obstacle.component';

const Components=[
  BirdComponent,
  ObstacleComponent
]

@NgModule({
  declarations: [Components],
  exports: [Components],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
