import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tambmanpuzzle';
  public ctr: number = 0;


  public failures: string[] = [];
  message: any;
  found = false;

  ngOnInit(): void {
    setInterval(this.test.bind(this), 100);
  }

  test(): void {

    if (this.found) {
      return;
    }

    let units = Math.floor(this.ctr % 10);
    let tens = Math.floor((this.ctr / 10) % 10);
    let hundreds = Math.floor((this.ctr / 100) % 10);


    let result = this.checkIfTrue(hundreds, tens, units);


    if (result) {


      this.found = true;
      this.message = "The answer is " + this.ctr;
    } else {
      this.message = "Trying out " + this.ctr;
    }


    this.ctr++;


  }

  checkIfTrue(i: number, j: number, k: number): boolean {

    if (this.rule1(i, j, k) && this.rule2(i, j, k) && this.rule3(i, j, k) && this.rule4(i, j, k) && this.rule5(i, j, k))
      return true;
    return false;
  }

  getRandomInt(max: number): number {

    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
  }

  rule1(a: number, b: number, c: number): boolean {

    let count = this.counter(2, 9, 1, a, b, c);
    if (count == 1) {
      if (a == 2 && b != 9 && c != 1)
        return true;
      if (a != 2 && b == 9 && c != 1)
        return true;
      if (a != 2 && b != 9 && c == 1)
        return true;
    }

    this.failures.push("" + a + b + c + " failed rule 1");
    return false;
  }

  rule2(a: number, b: number, c: number): boolean {

    let count = this.counter(2, 4, 5, a, b, c);
    if (count == 1) {

      if (a != 2 && b != 4 && c != 5)
        return true;
    }
    this.failures.push("" + a + b + c + " failed rule 2");
    return false;
  }

  counter(a: number, b: number, c: number, x: number, y: number, z: number): number {
    let counter = 0
    if (a == x || a == y || a == z)
      counter++;
    if (b == x || b == y || b == z)
      counter++;
    if (c == x || c == y || c == z)
      counter++;

    return counter;
  }

  rule3(a: number, b: number, c: number): boolean {
    let count = this.counter(4, 6, 3, a, b, c);

    if (count == 2)
      if (a != 4 && b != 6 && c != 3) {

        return true;
      }
    this.failures.push("" + a + b + c + " failed rule 3");
    return false;
  }

  rule4(a: number, b: number, c: number): boolean {
    let count = this.counter(2, 4, 5, a, b, c);

    if (a != 5 && a != 7 && a != 8 && b != 5 && b != 7 && b != 8 && c != 5 && c != 7 && c != 8) {
      return true;
    }
    this.failures.push("" + a + b + c + " failed rule 4");
    return false;
  }

  rule5(a: number, b: number, c: number): boolean {

    let count = this.counter(5, 6, 9, a, b, c);
    if (count == 1) {
      if (a != 5 && b != 6 && c != 5) {
        return true;
      }
    }
    this.failures.push("" + a + b + c + " failed rule 5");
    return false;
  }

}
