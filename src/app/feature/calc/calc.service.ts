import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CustomDate } from "../../shared/helpers/custom-date";

@Injectable({
  providedIn: 'root'
})

export class CalcService {

  public State$: BehaviorSubject<any> = new BehaviorSubject({
    amount: 5000,
    amountOfPayments: 0,
    percent: 0,
    promoCode: '',
    ratePdl: 0.01,
    rateInstallment: 0.69,
    returnDate: new Date(),
    term: 1,
    totalAmount: 0,
    regularPaymentAmount: 0
  })

  constructor(private customDate: CustomDate) {}

  calculateTotalAmount(amount: number, term: number) {
    const newState = this.State$.getValue();
    newState.percent = term * newState.ratePdl;
    newState.returnDate = this.customDate.addDays(term);
    newState.totalAmount = amount;
    newState.totalAmount = (newState.totalAmount + (newState.amount * newState.percent)).toFixed(2);
    this.State$.next(newState)
    console.log('newState', newState)
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
    console.log('newState', newState)
  }

  updateState(key: string, value: any) {
    const newState = this.State$.getValue();
    newState[key] = value;
    this.State$.next(newState);
  }
}
