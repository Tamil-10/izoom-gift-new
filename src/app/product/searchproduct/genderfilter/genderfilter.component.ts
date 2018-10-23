import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genderfilter',
  templateUrl: './genderfilter.component.html',
  styleUrls: ['./genderfilter.component.css']
})
export class GenderfilterComponent implements OnInit {

  brands = ["All", "yte", "dfgfd", "fgfs"];

  selectedBrand: "All";
  constructor() { }

  ngOnInit() {
  }

}
