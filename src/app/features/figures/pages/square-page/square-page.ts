import {Component, OnInit} from '@angular/core';
import {SquareForm} from '../../components/square-form/square-form';
import {SquareFigure} from '../../components/square-figure/square-figure';
import {RouterLink} from '@angular/router';
import {Triangle} from '../../models/Triangle.model';
import {Rectangle} from '../../models/Rectangle.model';

@Component({
  selector: 'app-square-page',
  imports: [
    RouterLink,
    SquareFigure,
    SquareForm
  ],
  templateUrl: './square-page.html',
  styleUrl: './square-page.css',
})
export class SquarePage implements OnInit {
  public rectangle!: Rectangle;
  ngOnInit() {
    this.rectangle = new Rectangle(0, 0);
  }

  onSubmit(event: Rectangle) {
    this.rectangle = event;
  }
}
