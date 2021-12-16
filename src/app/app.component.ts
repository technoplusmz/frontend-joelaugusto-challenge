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

  showT: Boolean = false;


  ngOnInit(): void {
    this.getCurrences();
  }

  constructor(public service: ApiService) {

    this.rates = [];
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
