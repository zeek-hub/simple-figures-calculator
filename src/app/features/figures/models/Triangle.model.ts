import {ITriangle} from './ITriangle.model';

export class Triangle implements ITriangle {
  constructor(public base: number, public height: number) {}
  public calculateArea() {
    return this.base * this.height * .5;
  }
}
