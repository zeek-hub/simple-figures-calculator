import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
export class TrianglePage implements OnInit, OnDestroy {
  private buttonIntervalId?: any;
  private readonly chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  public buttonText: string = 'Go to Triangle Page';
  public triangle!: Triangle;

  constructor(private cdf: ChangeDetectorRef) {}

  ngOnInit() {
    this.triangle = new Triangle(0, 0);
  }

  onSubmit(event: Triangle) {
    this.triangle = event;
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
