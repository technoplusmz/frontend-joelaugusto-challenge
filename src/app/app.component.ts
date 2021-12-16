import { Component } from '@angular/core';
import { ApiService } from './shared/service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  data:any;
  rates: {code: String, value: Number}[];
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

    const value: any = this.form.value;
    const fromValue:any = fromRate?.value;
    const toValue:any = toRate?.value;

    const result = value * toValue /fromValue;

    if (value && toValue) {
      this.message = `${this.form.value} ${this.form.from} = ${result.toFixed(3)} ${this.form.to}`;
    }
  }

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
