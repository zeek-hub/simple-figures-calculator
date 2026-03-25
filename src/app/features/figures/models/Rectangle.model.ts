import {IRectangle} from './IRectangle.model';

export class Rectangle implements IRectangle {
  constructor(public width: number, public height: number) {}
  public calculateArea() {
    return this.width * this.height;
  }
}
