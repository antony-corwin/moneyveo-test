import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CalcService } from '../calc.service';

@Component({
  selector: 'app-calc-details',
  templateUrl: './calc-details.component.html',
  styleUrls: ['./calc-details.component.scss']
})
export class CalcDetailsComponent implements OnInit {

  @Input() cardFlipped: boolean = false;

  // public details: {
  //   returnDate: Date;
  //   amount: number;
  //   percent: number;
  //   totalAmount: number;
  //   amountOfPayments: number;
  //   promoCode: string;
  // }

  public localState: {
    amount: 5000,
    amountOfPayments: 5,
    percent: 0,
    promoCode: '',
    ratePdl: 0.01,
    rateInstallment: 0.69,
    returnDate: Date,
    term: 1,
    totalAmount: 0,
    regularPaymentAmount: 0
  }

  constructor(private calcService: CalcService) {
  }

  ngOnInit(): void {
    this.calcService.State$.subscribe(data => {
      if (data) {
        this.localState = data;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy() {
    this.calcService.State$.unsubscribe();
  }

}
