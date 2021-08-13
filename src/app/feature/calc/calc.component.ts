import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  public cardFlipped: boolean;

  constructor() {
    this.cardFlipped = false;
  }

  ngOnInit(): void {
    this.cardFlipped = false;
  }

  flipCard(flipped: boolean) {
    this.cardFlipped = flipped;
  }
}
