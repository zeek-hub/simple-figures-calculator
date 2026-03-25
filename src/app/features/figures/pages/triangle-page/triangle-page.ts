import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TriangleFigure} from '../../components/triangle-figure/triangle-figure';
import {TriangleForm} from '../../components/triangle-form/triangle-form';
import {Triangle} from '../../models/Triangle.model';

@Component({
  selector: 'app-triangle-page',
  imports: [
    RouterLink,
    TriangleFigure,
    TriangleForm
  ],
  templateUrl: './triangle-page.html',
  styleUrl: './triangle-page.css',
})
export class TrianglePage implements OnInit {
  public triangle!: Triangle;
  ngOnInit() {
    this.triangle = new Triangle(0, 0);
  }

  onSubmit(event: Triangle) {
    this.triangle = event;
  }
}
