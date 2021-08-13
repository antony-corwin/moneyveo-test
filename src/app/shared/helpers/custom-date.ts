import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class CustomDate extends Date {

  addDays(days: number) {
    const date = new CustomDate(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

}
