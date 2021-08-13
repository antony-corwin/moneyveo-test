import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalcService } from "../calc.service";

@Component({
  selector: 'app-calc-controls',
  templateUrl: './calc-controls.component.html',
  styleUrls: ['./calc-controls.component.scss']
})
export class CalcControlsComponent implements OnInit {

  @Output() flipCardEvent = new EventEmitter<boolean>();

  public PdlAmountControl: {
    min: 50,
    max: 15000,
    step: 50
  };
  public InstallmentAmountControl: {
    min: 14999,
    max: 30000,
    step: 100
  };
  public PdlTermControl: {
    min: 1,
    max: 31,
    step: 1
  };
  public InstallmentTermControl: {
    min: 55,
    max: 126,
    step: 7
  };

  // public calcAmount = 50;
  // public calcTerm = 1;
  // public totalAmount = 0;

  public localState: {
    amount: number,
    amountOfPayments: number,
    percent: number,
    promoCode: string,
    ratePdl: number,
    rateInstallment: number,
    returnDate: Date,
    term: number,
    totalAmount: number,
    regularPaymentAmount: number
  }

  public showPdlControl = true;

  constructor(private calcService: CalcService) {
  this.localState = {
      amount: 5000,
        amountOfPayments: 5,
        percent: 0,
        promoCode: '',
        ratePdl: 0.01,
        rateInstallment: 0.69,
        returnDate: new Date(),
        term: 1,
        totalAmount: 0,
        regularPaymentAmount: 0
    }
  }

  ngOnInit(): void {
    this.PdlAmountControl = {
      min: 50,
      max: 15000,
      step: 50
    };
    this.InstallmentAmountControl = {
      min: 14999,
      max: 30000,
      step: 100
    }
    ;
    this.PdlTermControl = {
      min: 1,
      max: 31,
      step: 1
    }
    ;
    this.InstallmentTermControl = {
      min: 55,
      max: 126,
      step: 7
    };

    this.calcService.calculateTotalAmount(this.localState.amount, this.localState.term);

    this.calcService.State$.subscribe(data => {
      if (data) {
        this.localState = data;
      }
    })
  }

  getTerm(value: number): number {
    return Math.ceil(value / 7)
  }

  updateTerm(value: number) {
    if (value < 15000 && this.localState.term > 30) {
      this.localState.term = 30;
      this.showPdlControl = true;
    }
    if (value >= 15000 && this.localState.term <= 30) {
      this.localState.term = 56;
      this.showPdlControl = false;
    }
  }

  updateAmount(value: number) {
    if (value >= 31 && this.localState.amount < 15000) {
      this.localState.amount = 15000;
      this.showPdlControl = false;
    }

    if (value === 55 && this.localState.amount >= 15000) {
      this.localState.amount = 14999;
      this.showPdlControl = true;
    }

    value === 31 ? this.localState.term = 56 : this.localState.term
    value === 55 ? this.localState.term = 30 : this.localState.term
  }

  onChanges(type: string, value: number) {
    switch (type) {
      case 'amount': {
        if (value < 15000) {
          this.calcService.calculateTotalAmount(value, this.localState.term);
          this.calcService.updateState('amount', value);
          this.emitCardFlip(false);
        } else {
          this.calcService.calculateRegularPaymentAmount(value, this.localState.term);
          this.emitCardFlip(true)
        }
        break;
      }
      case 'term': {
        if (value >= 56) {
          this.calcService.calculateRegularPaymentAmount(this.localState.amount, value);
          this.emitCardFlip(true);
        } else if (value > 30 && value < 55) {
          this.calcService.updateState('term', value);
          this.calcService.calculateTotalAmount(this.localState.amount, value);
          this.emitCardFlip(true);
        } else {
          this.calcService.updateState('term', value);
          this.calcService.calculateTotalAmount(this.localState.amount, value);
          this.emitCardFlip(false);
        }
        break;
      }
    }
  }

  emitCardFlip(value: boolean) {
    this.flipCardEvent.emit(value);
  }

  ngOnDestroy() {
    this.calcService.State$.unsubscribe();
  }
}
