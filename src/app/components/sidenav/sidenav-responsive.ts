import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { Constants } from 'src/app/models/constants';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {NavigationEnd, Router} from "@angular/router";
import {interval} from "rxjs";



/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'sidenav-responsive.html',
  styleUrls: ['sidenav-responsive.css'],
})
export class SidenavResponsive implements OnDestroy,OnInit {
  shouldRun: boolean=false;
  selectedTab = Constants.CURRENT_TAB;
  mobileQuery: MediaQueryList;
  syncJobTypes: SyncJobType[] = [];
  private _mobileQueryListener: () => void;
  
  constructor(private syncJobService: SyncJobService, changeDetectorRef: ChangeDetectorRef,
              private router: Router, media: MediaMatcher, location: Location) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.shouldRun = location.path() !== "/login"&&location.path() !=="/";
    router.events.subscribe((val) => {
      // see also
      if(val instanceof NavigationEnd) {
        if (val.url == "/" || val.url == "/login")
          this.shouldRun = false;
        else
          this.shouldRun = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getSyncJobTypes()
  }

  changeCurrentTab(cuurentTab){
    Constants.CURRENT_TAB = cuurentTab;
    this.selectedTab = cuurentTab;
  }
  Logout(){
    // localStorage.setItem("auth-token","");
    // localStorage.setItem("user","");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    localStorage.clear();
    this.router.navigate(["/"]);


  }

  getSyncJobTypes(){
    this.syncJobService.getSyncJobTypesDB().toPromise().then((res: any) => {
      this.syncJobTypes = res;
    }).catch(err => {
      console.error(err);
    });
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
