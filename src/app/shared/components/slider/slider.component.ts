import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ISliderConfig } from './slider.interface';
import { CalcService } from "../../../feature/calc/calc.service";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class SliderComponent implements OnInit, OnChanges {

  @Input() sliderConfig: ISliderConfig;
  @Input() sliderValue: number;
  @Output() returnValueEvent = new EventEmitter<any>();
  @ViewChild('left') leftSelect: ElementRef;
  @ViewChild('right') rightSelect: ElementRef;

  public defaultConfig: ISliderConfig;

  constructor(private calcService: CalcService) {
    this.defaultConfig = {
      left: {
        labelMin: '',
        labelMax: '',
        min: 0,
        max: 100,
        step: 10
      },
      right: {
        labelMin: '',
        labelMax: '',
        min: 100,
        max: 1000,
        step: 100
      },
      type: ''
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');


    if (changes?.sliderValue) {
      const currentValue = changes.sliderValue.currentValue;
      const previousValue = changes.sliderValue.previousValue;

      // if (currentValue < this.sliderConfig.left.min) {
      //   this.returnValue(this.sliderConfig.left.min);
      // }
      if (currentValue > this.sliderConfig.right.max) {
        this.returnValue(this.sliderConfig.right.max);
      }
      if (currentValue === this.sliderConfig.left.max + 1) {
        this.returnValue(this.sliderConfig.right.min);
      }
      if (currentValue === this.sliderConfig.right.min - 1) {
        this.returnValue(this.sliderConfig.left.max);
      }
      if (currentValue > this.sliderConfig.left.max + 1 && currentValue < this.sliderConfig.right.min - 1) {
        this.returnValue(this.sliderConfig.right.min);
      }

      // if (previousValue < currentValue) {
      //   if (currentValue > this.sliderConfig.left.max && currentValue < this.sliderConfig.right.min) {
      //     // this.sliderValue = this.sliderConfig.right.min;
      //     this.returnValue(this.sliderConfig.left.max);
      //   }
      // }
    }
  }

  ngOnInit(): void {
    this.sliderConfig = this.sliderConfig ? this.sliderConfig : this.defaultConfig;

  }

  onChange(event: any) {
    if (event.value !== null) {
      this.returnValue(event.value);
    }
  }

  changeValue(value: number) {
    // let obj = this.sliderConfig;
    // if (this.sliderConfig.type === 'amount') {
    //   if (this.sliderConfig.value < this.sliderConfig.left.min) {
    //     obj.value = this.sliderConfig.left.min
    //     this.sliderConfig = obj;
    //   } else if (this.sliderConfig.value > this.sliderConfig.right.max) {
    //     obj.value = this.sliderConfig.right.max;
    //     this.sliderConfig = obj;
    //   }
    // } else if (this.sliderConfig.type === 'term') {
    //   if (this.sliderConfig.value < this.sliderConfig.left.min) {
    //     obj.left.min = this.sliderConfig.left.min;
    //     this.sliderConfig = obj;
    //   } else if (this.sliderConfig.value > this.sliderConfig.left.max && this.sliderConfig.value < this.sliderConfig.right.min) {
    //     obj.left.max = this.sliderConfig.left.max;
    //     this.sliderConfig = obj;
    //   } else if (this.sliderConfig.value > this.sliderConfig.right.max) {
    //     obj.right.max = this.sliderConfig.right.max;
    //     this.sliderConfig = obj;
    //   }
    // }
    // this.sliderConfig = obj;

    this.sliderValue = value;
    // this.returnValue(slider, value);
  }

  returnValue(value: number) {
    this.returnValueEvent.emit(value);
  }
}
