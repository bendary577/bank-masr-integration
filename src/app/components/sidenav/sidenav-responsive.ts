import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';


/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'sidenav-responsive.html',
  styleUrls: ['sidenav-responsive.css'],
})
export class SidenavResponsive implements OnDestroy,OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  shouldRun: boolean=false;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, location: Location) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    console.info(location.path());


   this.shouldRun = location.path() !== "/login"&&location.path() !=="/";
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



  ngOnInit(): void {

  }
/*  public set setshouldRun(shouldRun:boolean){
    this.shouldRun=shouldRun;
  }*/
  public get getshouldRun(){
    return this.shouldRun;
  }


  setshouldRun(shouldRun: boolean) {
    this.shouldRun=shouldRun;
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
