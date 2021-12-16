import { Component } from '@angular/core';
import { ApiService } from './shared/service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  data:any;
  rates: {code: string, value: number}[];
  message: String | undefined;

  form: {
    from: String;
    to: String;
    value: Number;
  }

  showT: Boolean = false;


  ngOnInit(): void {
    this.message = "";
    this.getCurrences();
  }

  constructor(public service: ApiService) {
    this.form = {
      from: 'USD',
      to: 'USD',
      value: 1
    }
    this.rates = [];
  }

  convert() {

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

    if (value && toValue && toRate?.code && fromRate?.code) {
      this.message = `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: fromRate.code }).format(value)}  = ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: toRate.code }).format(result)}`;
    }
  }}

  showTable() {
    this.showT = !this.showT;
  }

  getCurrences() {
    this.service.getCurrences().subscribe(data => {
      this.data = data;
      for (let key in data.rates) {
        this.rates.push({code: key, value: data.rates[key]});
      }
    });
  }

  title = 'angular';
}
