import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';


/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'sidenav-responsive.html',
  styleUrls: ['sidenav-responsive.css'],
})
export class SidenavResponsive implements OnDestroy,OnInit {
  shouldRun: boolean=false;
  selectedTab = " - Suppliers";
  mobileQuery: MediaQueryList;
  syncJobTypes: SyncJobType[] = [];
  private _mobileQueryListener: () => void;
  
  constructor(private syncJobService: SyncJobService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, location: Location) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.shouldRun = location.path() !== "/login"&&location.path() !=="/";
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getSyncJobTypes()
  }

  changeCurrentTab(cuurentTab){
    this.selectedTab = cuurentTab;
  }

  getSyncJobTypes(){
    this.syncJobService.getSyncJobTypesDB().toPromise().then((res: any) => {
      this.syncJobTypes = res[0].syncJobTypes;
      console.log(this.syncJobTypes)
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
