import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
export class SquarePage implements OnInit, OnDestroy {
  private buttonIntervalId?: any;
  private readonly chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  public buttonText: string = 'Go to Triangle Page';
  public rectangle!: Rectangle;

  constructor(private cdf: ChangeDetectorRef) {}

  ngOnInit() {
    this.rectangle = new Rectangle(0, 0);
  }
  onSubmit(event: Rectangle) {
    this.rectangle = event;
  }

  protected textScramble(finalText: string) {
    if (this.buttonIntervalId) clearInterval(this.buttonIntervalId);
    let iteration = 0;
    const textLength = finalText.length;
    this.buttonIntervalId = setInterval(() => {
      this.buttonText = finalText
        .split('')
        .map((c, index) => {
          if (index < iteration) return finalText[index];
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      iteration += 4 / 3;
      if (iteration >= textLength) {
        clearInterval(this.buttonIntervalId);
        this.buttonIntervalId = undefined;
      }
      this.cdf.detectChanges();
    }, 40);
  }

  ngOnDestroy() {
    if (this.buttonIntervalId) clearInterval(this.buttonIntervalId);
  }
}
