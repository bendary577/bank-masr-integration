import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Vendor', 'VendorAccount', 'Phone', 'Email', 'OrderVia', 'ChangedBy', 'At'];
  loading = true;
  @Input() dataSource = [
    { Vendor: '	*******Purchasing Abu Dhabi********', VendorAccount: '', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'AMR.MOHAMAD', At: '11/19/2019' },
    { Vendor: '*******Purchasing Dubaii********', VendorAccount: '', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'AMR.MOHAMAD', At: '11/19/2019' },
    { Vendor: 'A to Z World Hospitality Supplies LLC', VendorAccount: '13956', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'MALAM', At: '5/26/2019' },
    { Vendor: 'AAL MIR TRADING CO.L.L.C', VendorAccount: '13480', Phone: '055-9030956', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abdelraouf Chouider', VendorAccount: '14261', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abdul Khader', VendorAccount: '14215', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abdul Khader Karnur Eshwaramangila', VendorAccount: '14264', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abdul Khaliq', VendorAccount: '14182', Phone: '971-2-6446667', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABDUL SALAM EBRAHIM', VendorAccount: '14211', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abdulghani Mallah', VendorAccount: '14063', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABDULLA NAWAF MOHAMMED PLASTRING & PAINT', VendorAccount: '13725', Phone: '971-2-6446667', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abdullah Bin Khatir Foodstuff LLC', VendorAccount: '13780', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Absolute Events-Rentals', VendorAccount: '13761', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abu Asma Automatic Laundry', VendorAccount: '13947', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABU DHABI COMMERCIAL PROPERTIES', VendorAccount: '13512', Phone: '02 406 7444', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abu Dhabi Distribution Company', VendorAccount: '13696', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABU DHABI MARITIME & MERCANTILE INTERNAT', VendorAccount: '13475', Phone: '050-7123962', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abu Dhabi Motors LLC', VendorAccount: '', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'MALAM', At: '4/10/2019' },
    { Vendor: 'Abu Dhabi National foodstuff Co. LLC', VendorAccount: '13432', Phone: '97126731000', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abu Dhabi Ports Company', VendorAccount: '13813', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abu Dhabi Refreshments Co. LTD', VendorAccount: '13426', Phone: '97124447234', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Abu Ghazaleh Intellectual Property', VendorAccount: '13925', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABU TALAL BLACKSMITH & WEDDING SHOP', VendorAccount: '13726', Phone: '02-5547936', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABU TALIB FISH TRADING', VendorAccount: '13727', Phone: '+971 6 5424204', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ABU ZAED VEG', VendorAccount: '14162', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Adam Food Diamond Ray FZC', VendorAccount: '13946', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ADCP', VendorAccount: '14163', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Adel Omar', VendorAccount: '14016', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ADHOLICS PUBLISHING AND ADVERTISING', VendorAccount: '13885', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ADIF EVENTS ORGANIZERS SERVICES', VendorAccount: '13818', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ADLINE ADVERTISING LLC', VendorAccount: '13522', Phone: '02 6317665', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Admirals Trading (L.L.C)', VendorAccount: '14102', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'ADNOC Distribution', VendorAccount: '', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'SANTHOSH.NAIR', At: '4/10/2019' },
    { Vendor: 'Ador Moises', VendorAccount: '14243', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Adroit Real Estate', VendorAccount: '14260', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Advanced Cargo & Shipping L.L.C', VendorAccount: '13957', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AFAMIA AL SHAM CO. L.L.C', VendorAccount: '13659', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AG HOTEL LLC', VendorAccount: '13885', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'SANTHOSH.NAIR', At: '4/9/2019' },
    { Vendor: 'Agrico Middle East General Trading', VendorAccount: '14811', Phone: '971505295447', Email: 'agrico.gt@gmail.com', OrderVia: 'Printout', ChangedBy: 'ASHRAF.AHMED', At: '11/4/2019' },
    { Vendor: 'AHMAD ABDULLA SADEGH TRADING CO. (L.L.C)', VendorAccount: '13482', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmad Al Haraki', VendorAccount: '14144', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmad Aljairoudi', VendorAccount: '14203', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AHMAD AWAD ABU HORAN', VendorAccount: '14164', Phone: '	971-2-6446667', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AHMAD KWIDER', VendorAccount: '14292', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmad Mohamad Khir Kwider', VendorAccount: '14272', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmad Suleiman Al Nawafleh', VendorAccount: '14216	', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmed Almazrouei Services LLC', VendorAccount: '13974', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AHMED AYOUB', VendorAccount: '14209', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AHMED KHALED KAWANDI', VendorAccount: '14165', Phone: '	971-2-6446667	', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmed Mohamed Abdellah Mohamed', VendorAccount: '14050', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Ahmed Mohamed Hussein Mohamed Elbaadany', VendorAccount: '14263', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AHMED SAIED TOLBAH', VendorAccount: '14166', Phone: '971-2-6446667', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AHMED SHEHATA EBEID HASSANEIN', VendorAccount: '14201', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AKC Kaddah International General Trading, LLC', VendorAccount: '14156', Phone: '97165322697', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Akhil Ramanath', VendorAccount: '14066', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Akram Youssef Mansour', VendorAccount: '14024', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Akrom Saydullaev', VendorAccount: '14127', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Akwan General Trading L.L.C', VendorAccount: '14096', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL AFDHAL PACKING AND PAKCKAGING MAT.', VendorAccount: '13854', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Ahli Grains Stores', VendorAccount: '13692', Phone: '	06-5691959', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL AHLIA GENERAL TRADING COMPANY', VendorAccount: '13824', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL AHLIA-GULF LINE GENERAL TRADING CO(PVT)LTD	', VendorAccount: '13491', Phone: '	02-6732191', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Ain Food & Beverages PJSC - Agthia', VendorAccount: '13425', Phone: '97137686500	 ', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL AIN MALL', VendorAccount: '13728', Phone: '	03 766 0333', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Amin Vegetables Trading LLC', VendorAccount: '13427', Phone: '971506825535', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL ANDALUS GARDENS DECOR', VendorAccount: '13524', Phone: '02-6442489	', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL ANDALUS TRADING & REFRIGERATION-SHISH	 ', VendorAccount: '13479', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL ANHAR FOODSTUFF TRADING LLC', VendorAccount: '13514', Phone: '04-2568706', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL Ansari Exchange LLC', VendorAccount: '13759', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL AQILI DISTRIBUTION L.L.C', VendorAccount: '13486', Phone: '02-5543711	', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Arabia For Safety & Security LLC', VendorAccount: '14060', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL ARD AL MUBARAKA FOODSTUFF TRADING LLC', VendorAccount: '13511', Phone: '04-3791019', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL ASWAQ FOODSTUFF TRADING', VendorAccount: '13471', Phone: '	04-2691768', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL ATHEER AUTOMOBILE REPAIR', VendorAccount: '', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'SUBASH.GURUNG', At: '4/10/2019' },
    { Vendor: 'AL AUJAN & OASIS (L.L.C)', VendorAccount: '13495', Phone: '	055-8561727', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Bader Cold Stores For Food Stuff', VendorAccount: '13433', Phone: '97126722333', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Bahi Coals Trading LLC', VendorAccount: '13791', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL BAIT AL FAKHER SMOKING ACCESSORIES	 ', VendorAccount: '13944', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Barakah Dates Factory L.L.C', VendorAccount: '13985', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL BATAL AL ALAM ADV.& PUB.LLC', VendorAccount: '13855', Phone: '06-5344237', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Bayader International', VendorAccount: '13420', Phone: '971-6-5340303', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL BESHARA TURNING LLC', VendorAccount: '14083', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al bustan Farms Foodstuff Trading L.L.C', VendorAccount: '14009', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL CAS L.L.C', VendorAccount: '13825', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Corniche Automatic Bakeries & Markets', VendorAccount: '13428', Phone: '97126333817	', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL DAHRA AGRICULTURAL CO. LLC', VendorAccount: '13525', Phone: '03 7688852', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL DAWAR GENERAL TRADING Establishment', VendorAccount: '13504', Phone: '	02-6733322', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Dieri Spices Flourmills', VendorAccount: '13457', Phone: '97125524462', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Diyafa Hotel & Catering Suplies', VendorAccount: '13989', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL DIYAFAH FOODSTUFF LLC', VendorAccount: '13513', Phone: '04-4472553', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL DOURI FOODSTUFF TRADING EST', VendorAccount: '13477', Phone: '06-5348833', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Douri Group', VendorAccount: '13660', Phone: '0097165348833	', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Eatemad Foodstuff & Meat Est', VendorAccount: '13429', Phone: '97126441224', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Fanar Gas Group', VendorAccount: '13687', Phone: '	97143475958', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Fanar Gen. Cont. LLC', VendorAccount: '13723', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Fateh Trading LLC', VendorAccount: '', Phone: '97126733306', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '4/10/2019' },
    { Vendor: 'Al Finar General Trading Co. LLC', VendorAccount: '13775', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al ghadeer pure drinking water', VendorAccount: '13694', Phone: '555-1324', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'Al Gurg Unilever LLC', VendorAccount: '13799', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '5/29/2019' },
    { Vendor: 'AL HASEEB COMPUTER NETWORKS', VendorAccount: '13885', Phone: '', Email: '', OrderVia: 'Printout', ChangedBy: 'KAMRAN.ALI', At: '4/10/2019' },
  ];
  constructor(private spinner: NgxSpinnerService) {
    this.spinner.show();
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.spinner.hide();
    }, 4000);
  }

}
