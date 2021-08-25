import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalcService} from "../calc.service";
import {ISliderConfig} from "../../../shared/components/slider/slider.interface";

@Component({
  selector: 'app-calc-controls',
  templateUrl: './calc-controls.component.html',
  styleUrls: ['./calc-controls.component.scss']
})
export class CalcControlsComponent implements OnInit {

  @Output() flipCardEvent = new EventEmitter<boolean>();

  public amountSliderConfig: ISliderConfig;
  public termSliderConfig: ISliderConfig;

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
    regularPaymentAmount: number,
    calculationScheme: string,
  }
  public dayTerm: number;
  public weekTerm: number;

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
      regularPaymentAmount: 0,
      calculationScheme: 'pdl',
    }
  }

  ngOnInit(): void {

    this.calcService.Sliders$.subscribe(data => {
      if (data) {
        this.amountSliderConfig = data.find((el: any) => el.type === 'amount');
        this.termSliderConfig = data.find((el: any) => el.type === 'term');
      }
    });

    this.calcService.State$.subscribe(data => {
      if (data) {
        this.localState = data;
        this.localState.term >= this.termSliderConfig.right.min ? this.weekTerm = Math.round(this.localState.term / 7) : this.dayTerm = this.localState.term;
      }
    })

    this.calcService.calculateTotalAmount(this.localState.amount, this.localState.term);
  }

  onAmountChange(event: any) {
    if (+event.target.value !== null) {
      const value = +event.target.value;

      this.calcService.updateState('amount', value);


      if (value < this.amountSliderConfig.left.max) {
        this.calcService.calculateTotalAmount(value, this.localState.term);
        this.emitCardFlip(false);
      }
      if (value >= this.amountSliderConfig.right.min) {
        this.calcService.calculateRegularPaymentAmount(value, this.localState.term);
        this.emitCardFlip(true)
      }
      this.alignSliders('amount');
    }
  }

  onDayChange(event: any) {

    if (+event.target.value !== null) {
      const value = +event.target.value;

      if (value < this.termSliderConfig.left.min) {
        this.dayTerm = this.termSliderConfig.left.min;
      } else if (value >= this.termSliderConfig.left.max) {
        this.dayTerm = this.termSliderConfig.left.max;
      }
      this.calcService.updateState('term', this.dayTerm);
      this.calcService.calculateTotalAmount(this.localState.amount, this.dayTerm);
      this.alignSliders('term');
      this.emitCardFlip(false);
    }
  }

  onWeekChange(event: any) {

    if (+event.target.value !== null) {
      const value = +event.target.value * 7;

      if (value < this.termSliderConfig.right.min) {
        this.calcService.updateState('term', this.termSliderConfig.right.min);
        this.weekTerm = this.termSliderConfig.right.min / 7;
      } else if (value > this.termSliderConfig.right.min && value < this.termSliderConfig.right.max) {

        if (value%2 === 0) {
          this.weekTerm = value / 7;
          this.calcService.updateState('term', value);
        } else {
          this.weekTerm = value / 7 + 1;
          this.calcService.updateState('term', this.weekTerm * 7);
        }

      } else if (value > this.termSliderConfig.right.max) {
        this.calcService.updateState('term', this.termSliderConfig.right.max);
        this.weekTerm = this.termSliderConfig.right.max / 7;
      }

      this.calcService.calculateRegularPaymentAmount(this.localState.amount, this.localState.term);
      this.alignSliders('term');
      this.emitCardFlip(true);
    }
  }

  alignSliders(type: string) {
    const amount = this.localState.amount;
    const term = this.localState.term;

    switch (type) {
      case 'amount': {

        if (amount <= this.amountSliderConfig.left.max && term > this.termSliderConfig.left.max) {
          this.calcService.updateState('term', this.termSliderConfig.left.max);
        }
        if (amount >= this.amountSliderConfig.right.min && term < this.termSliderConfig.right.min) {
          this.calcService.updateState('term', this.termSliderConfig.right.min + this.termSliderConfig.right.step);
        }

        break;
      }
      case 'term': {

        if (term <= this.termSliderConfig.left.max && amount > this.amountSliderConfig.left.max) {
          this.calcService.updateState('amount', this.amountSliderConfig.left.max);

        }
        if (term >= this.termSliderConfig.right.min && amount < this.amountSliderConfig.right.min) {
          this.calcService.updateState('amount', this.amountSliderConfig.right.min + this.termSliderConfig.right.step);
        }

        break;
      }
    }
  }

  onChanges(type: string, value: number) {
    switch (type) {
      case 'amount': {

        this.calcService.updateState('amount', value);

        if (value <= this.amountSliderConfig.left.max) {
          if (this.localState.term > this.termSliderConfig.right.min) {
            this.calcService.updateState('term', this.termSliderConfig.left.max);
          }
          this.calcService.calculateTotalAmount(value, this.localState.term);
          this.emitCardFlip(false);
        } else {
          if (this.localState.term < this.termSliderConfig.right.min) {
            this.calcService.updateState('term', this.termSliderConfig.right.min);
          }
          this.calcService.calculateRegularPaymentAmount(value, this.localState.term);
          this.emitCardFlip(true)
        }

        this.alignSliders('amount');
        break;
      }
      case 'term': {

        this.calcService.updateState('term', value);

        if (value < this.termSliderConfig.left.max || value < this.termSliderConfig.right.min) {
          this.weekTerm = 0;
          this.calcService.calculateTotalAmount(this.localState.amount, value);
          this.emitCardFlip(false);
        }
        if (value >= this.termSliderConfig.right.min) {
          this.weekTerm = Math.round(value / 7);
          this.calcService.calculateRegularPaymentAmount(this.localState.amount, value);
          this.emitCardFlip(true);
        }

        this.alignSliders('term');
        break;
      }
    }
  }

  emitCardFlip(value: boolean) {
    this.flipCardEvent.emit(value);
  }

  ngOnDestroy() {
    this.calcService.State$.unsubscribe();
    this.calcService.Sliders$.unsubscribe();
  }
}
