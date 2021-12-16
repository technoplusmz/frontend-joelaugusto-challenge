import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  rates: any = [];
  inputValue: String;
  constructor() {
    this.inputValue = '';
  }

  ngOnInit(): void {
    this.rates = this.data.slice(0, 10);
  }

  search(){
    const aux = this.rates = this.data.filter((item: { code: string; }) => item.code.toLowerCase().includes(this.inputValue.toLowerCase()));

    this.rates = aux.length > 5 ? aux.slice(0, 5) : aux;  }

  @Input() public data: any;

}
