import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {Rectangle} from '../../models/Rectangle.model';
import {Triangle} from '../../models/Triangle.model';
import {DecimalPipe} from '@angular/common';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-triangle-figure',
  imports: [
    DecimalPipe
  ],
  templateUrl: './triangle-figure.html',
  styleUrl: './triangle-figure.css',
})
export class TriangleFigure implements AfterViewInit, OnChanges, OnDestroy {
  @Input() public triangle!: Triangle;
  @ViewChild('triangleCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;
  private intervalId?: any;
  private readonly chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  public areaText!: string;

  constructor(private cdf: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.drawTriangle();
  }

  ngOnChanges() {
    this.textScramble(`Area: ${this.getTriangleArea().toFixed(2)} cm²`);
    this.drawTriangle();
  }

  getTriangleArea() {
    const area = this.triangle.calculateArea();
    return area === undefined ? 0 : area;
  }

  protected drawTriangle() {
    if (!this.myCanvas) return;
    const ctx = this.myCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const triangleBase = this.triangle.base > 500 ? 500 : this.triangle.base;
    const triangleHeight = this.triangle.height > 300 ? 300 : this.triangle.height;
    const centerX = width / 2;
    const centerY = height / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#ff8000';
    ctx.fillStyle = 'rgba(255,128,0,0.08)';
    ctx.lineWidth = 2;
    ctx.moveTo(centerX, centerY - triangleHeight / 2);
    ctx.lineTo(centerX - triangleBase / 2, centerY + triangleHeight / 2);
    ctx.lineTo(centerX + triangleBase / 2, centerY + triangleHeight / 2);
    ctx.closePath();
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
