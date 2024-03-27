import { Component, OnInit } from '@angular/core';

import { DOCUMENT, Location } from "@angular/common";
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-forbidden',
  templateUrl: './page-forbidden.component.html',
  styleUrls: ['./page-forbidden.component.scss']
})
export class PageForbiddenComponent implements OnInit {

  constructor(
    private _location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  back(){
    // this._location.back();
    this.router.navigate(['']);
  }

}
