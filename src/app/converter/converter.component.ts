import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  @Input() public data: any;
  @Input() public rates: any[] = [];


  message: String | undefined;
  form: {
    from: String;
    to: String;
    value: Number;
  }


  constructor() {
    this.rates = [];

    this.form = {
      from: 'USD',
      to: 'USD',
      value: 1
    }

    }

  ngOnInit(): void {
    this.message = "";
  }

  convert() {

    console.log(this.form);
    const fromRate = this.rates.find(rate => rate.code === this.form.from);
    const toRate = this.rates.find(rate => rate.code === this.form.to);

    let toValue:number =  0;
    let fromValue:number = 0;
    const value: number = Number.parseFloat(this.form.value.toString());


    if (fromRate?.value) {
    fromValue = fromRate?.value;




    if(toRate?.value)
      toValue = toRate.value;



    const result:number = value * toValue /fromValue;

    console.log(result)

    if (value && toValue && toRate?.code && fromRate?.code) {
      this.message = `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: fromRate.code }).format(value)}  = ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: toRate.code }).format(result)}`;
    }
  }}



}
