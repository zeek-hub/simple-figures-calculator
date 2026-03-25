import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  ViewChild
} from '@angular/core';
import {Rectangle} from '../../models/Rectangle.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-square-figure',
  imports: [
    DecimalPipe
  ],
  templateUrl: './square-figure.html',
  styleUrl: './square-figure.css',
})
export class SquareFigure implements AfterViewInit, OnChanges, OnDestroy {
  @Input() public rectangle!: Rectangle;
  @ViewChild('rectangleCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  private intervalId?: any;
  private readonly chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  public areaText!: string;

  constructor(private cdf: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.drawRectangle();
  }

  ngOnChanges() {
    this.textScramble(`Area: ${this.getRectangleArea().toFixed(2)} cm²`);
    this.drawRectangle();
  }

  getRectangleArea() {
    const area = this.rectangle.calculateArea();
    return area === undefined ? 0 : area;
  }
  protected drawRectangle() {
    if(!this.myCanvas) return;
    const ctx = this.myCanvas.nativeElement.getContext('2d');
    if(!ctx) return;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const rectWidth = this.rectangle.width > 500 ? 500 : this.rectangle.width;
    const rectHeight = this.rectangle.height >  300 ? 300 : this.rectangle.height;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#ff8000';
    ctx.fillStyle = 'rgba(255,128,0,0.08)';
    ctx.lineWidth = 2;
    ctx.rect(
      width / 2 - rectWidth / 2,
      height / 2 - rectHeight / 2,
      rectWidth,
      rectHeight,
    );
    ctx.stroke();
    ctx.fill();
  }

  protected textScramble(finalText: string) {
    if (this.intervalId) clearInterval(this.intervalId);
    let iteration = 0;
    const textLength = finalText.length;
    this.intervalId = setInterval(() => {
      this.areaText = finalText
        .split('')
        .map((c, index) => {
          if (index < iteration) return finalText[index];
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      iteration += 2 / 3;
      if (iteration >= textLength) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      this.cdf.detectChanges();
    }, 40);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
