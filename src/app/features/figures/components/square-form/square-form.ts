import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Rectangle} from '../../models/Rectangle.model';

@Component({
  selector: 'app-square-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './square-form.html',
  styleUrl: './square-form.css',
})
export class SquareForm implements OnInit, OnDestroy, AfterViewInit {
  @Output() onSubmit = new EventEmitter<Rectangle>();
  public texts: string[] = ["Side A:", "Side B:"];
  private buttonIntervalId?: any;
  private paragraphIntervalIds?: any[] = [];
  private readonly chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  public triangle!: FormGroup;
  public buttonText: string = 'Calculate';
  public rectangle!: FormGroup;

  constructor(private fb: FormBuilder, private cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.rectangle = this.fb.group({
      width: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
    })
  }

  submit() {
    if (!this.rectangle.valid) return;
    const width = this.rectangle.get('width')?.value;
    const height = this.rectangle.get('height')?.value;
    const rect: Rectangle = new Rectangle(width, height);
    this.onSubmit.emit(rect);
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
      iteration += 2 / 3;
      if (iteration >= textLength) {
        clearInterval(this.buttonIntervalId);
        this.buttonIntervalId = undefined;
      }
      this.cdf.detectChanges();
    }, 40);
  }

  async rotateTextsOnLoad(texts: string[], delay = 1500, speed = 40, step =  2/3){
    let i = 0;
    while (true){
      await this.scrambleTextPromise(texts[i], i, speed, step);
      await this.sleep(delay);
      i = (i + 1) % texts.length;
    }
  }
  protected scrambleTextPromise(finalText: string, index: number, speed = 40, step = 2/3): Promise<void> {
    return new Promise(resolve => {
      if(!this.paragraphIntervalIds) this.paragraphIntervalIds = [];
      if (this.paragraphIntervalIds[index] != null) {
        clearInterval(this.paragraphIntervalIds[index]);
        this.paragraphIntervalIds[index] = undefined;
      }
      let iteration = 0;
      const textLength = finalText.length;
      this.paragraphIntervalIds[index] = setInterval(() => {
        this.texts[index] = finalText
          .split('')
          .map((c, index) => (index < iteration ? finalText[index] : this.chars[Math.floor(Math.random() * this.chars.length)]))
          .join('');
        iteration += step;
        if (iteration >= textLength) {
          if (this.paragraphIntervalIds && this.paragraphIntervalIds[index] !== undefined) {
            clearInterval(this.paragraphIntervalIds[index]);
            this.paragraphIntervalIds[index] = undefined;
          }
          resolve();
        }
        this.cdf.detectChanges();
      }, speed);
    });
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngAfterViewInit() {
    this.rotateTextsOnLoad(this.texts);
  }

  ngOnDestroy() {
    if (this.buttonIntervalId) clearInterval(this.buttonIntervalId);
    this.paragraphIntervalIds?.forEach(id => id && clearInterval(id))
  }
}
