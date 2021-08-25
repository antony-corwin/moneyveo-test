import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CustomDate } from "../../shared/helpers/custom-date";
import { ISliderConfig } from "../../shared/components/slider/slider.interface";

@Injectable({
  providedIn: 'root'
})

export class CalcService {

  private initialState = {
    amount: 5000,
    amountOfPayments: 0,
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

  public State$: BehaviorSubject<any> = new BehaviorSubject(this.initialState);

  private slidersData = [
    {
      left: {
        labelMin: '50',
        labelMax: '14999',
        min: 50,
        max: 14999,
        step: 50
      },
      right: {
        labelMin: '15000',
        labelMax: '30000',
        min: 15000,
        max: 30000,
        step: 100
      },
      type: 'amount',
      value: this.State$.getValue().amount
    },
    {
      left: {
        labelMin: '1 день',
        labelMax: '30 дней',
        min: 1,
        max: 30,
        step: 1
      },
      right: {
        labelMin: '8 недель',
        labelMax: 'до 18 недель',
        min: 56,
        max: 126,
        step: 14
      },
      type: 'term',
      value: this.State$.getValue().term
    }
  ];

  public Sliders$: BehaviorSubject<any> = new BehaviorSubject<Array<ISliderConfig>>(this.slidersData);

  constructor(private customDate: CustomDate) {
  }

  calculateTotalAmount(amount: number, term: number) {
    const newState = this.State$.getValue();
    newState.percent = term * newState.ratePdl;
    newState.returnDate = this.customDate.addDays(term);
    newState.totalAmount = amount;
    newState.totalAmount = (newState.totalAmount + (newState.amount * newState.percent)).toFixed(2);
    this.State$.next(newState)
  }

  calculateRegularPaymentAmount(amount: number, term: number) {
    const weeks = term / 7
    const newState = this.State$.getValue();
    newState.percent = ((amount / 100) * newState.rateInstallment) * term;
    newState.returnDate = this.customDate.addDays(term);
    newState.amountOfPayments = Math.round(weeks / 2);
    newState.totalAmount = amount;
    newState.totalAmount = (newState.totalAmount + newState.percent).toFixed(2);
    newState.regularPaymentAmount = (newState.totalAmount / (weeks / 2)).toFixed(2);
    this.State$.next(newState)
  }

  updateState(key: string, value: any) {
    const newState = this.State$.getValue();
    newState[key] = value;
    this.State$.next(newState);
  }
}
