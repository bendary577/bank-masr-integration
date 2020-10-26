import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Constants } from 'src/app/models/constants';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'Entries': myworksheet }, SheetNames: ['Entries'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

  exportInvoicesToExcel(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_APPROVED_INVOICES + '?syncJobId=' + syncJobID , {headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportSalesToExcel(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_SALES + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportTransfersToExcel(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_BOOKED_TRANSFERS + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportWastageToExcel(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_WATAGE + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportConsumptionToExcel(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CONSUMPTION + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportBookedProductionToExcel(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_BOOKED_PRODUCTION + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportSalesToCSV(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CSV_SALES + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }
}