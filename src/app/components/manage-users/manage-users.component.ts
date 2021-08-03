import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { AddAppUserComponent } from '../../components/add-app-user/add-app-user.component'  
import { Group } from 'src/app/models/loyalty/Group';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
 
  loading = false;
  newUser: ApplicationUser = new ApplicationUser();
  updatedUser: ApplicationUser = new ApplicationUser();
  role = true;

  usersList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div style="text-align: center;">
      <p class="user-name">No users have been created yet</p>
    </div>
  `
    },
    selected: [],
    locationsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    usersData: [] 
  };

  
props = {  'background-color' : '#e07d93'  };
props2 = {  'background-color' : '#3F51B5'  };
noFilter = true;
selectedGuest="";
guestNames= [];
expiration= 0;
palance=0;
cardNumber = 0;
accompanied = 2;
  users=[{ id: "", accountId: "", name: "Test User", top: 0,
  email: "",
  logoUrl: "https://storage.googleapis.com/oracle-integrator-bucket/AccourImage/defaultImage.jpg",
  cardNumber: 245347563456,
  palance:  400 ,
  expiration: 72,
  mobile:'0155565565',
  accompanied:'2',
  group: {

      id: "",
      parentGroupId: null,
      name: "Generic",
      description: null,
      simphonyDiscount: {
          discountRate: 0.0,
          discountId: 0,
          deleted: false
      },
      top: 0,
      logoUrl: "",
      accountId: "",
      creationDate: "2021-06-09T13:52:30.231+0000",
      lastUpdate: "2021-06-09T13:52:30.231+0000",
      deleted: false
  },
  creationDate: "2021-06-09T13:52:30.231+0000",
  code: "test90",
  lastUpdate: null,
  statues : true,
  deleted: 'Expired'
},
{ id: "", accountId: "", name: "", top: 0,
  email: "",
  logoUrl: "https://storage.googleapis.com/oracle-integrator-bucket/AccourImage/defaultImage.jpg",
  cardNumber: 756787237523,
  palance:  430 ,
  expiration: 24,
  accompanied:'2',
  group: {

      id: "",
      parentGroupId: null,
      name: "Generic",
      description: null,
      simphonyDiscount: {
          discountRate: 0.0,
          discountId: 0,
          deleted: false
      },
      top: 0,
      logoUrl: "",
      accountId: "",
      creationDate: "2021-06-09T13:52:30.231+0000",
      lastUpdate: "2021-06-09T13:52:30.231+0000",
      deleted: false
  },
  creationDate: "2021-06-09T13:52:30.231+0000",
  code: "test90",
  lastUpdate: null,
  statues : false,
  deleted: 'Active'
},
{ id: "", accountId: "", name: "", top: 0,
  email: "",
  logoUrl: "https://storage.googleapis.com/oracle-integrator-bucket/AccourImage/defaultImage.jpg",
  cardNumber: 678676756786,
  palance:  170 ,
  expiration: 48,
  accompanied:'6',
  group: {

      id: "",
      parentGroupId: null,
      name: "Generic",
      description: null,
      simphonyDiscount: {
          discountRate: 0.0,
          discountId: 0,
          deleted: false
      },
      top: 0,
      logoUrl: "",
      accountId: "",
      creationDate: "2021-06-09T13:52:30.231+0000",
      lastUpdate: "2021-06-09T13:52:30.231+0000",
      deleted: false
  },
  creationDate: "2021-06-09T13:52:30.231+0000",
  code: "test90",
  lastUpdate: null,
statues : true,
  deleted: 'Suspend'
},
{ id: "", accountId: "", name: "New User", top: 0,
  email: "",
  logoUrl: "https://storage.googleapis.com/oracle-integrator-bucket/AccourImage/defaultImage.jpg",
  cardNumber: 78676383686,
  palance:  1078 ,
  expiration: 142,
  accompanied:'3',
  mobile:'+2003535355353',
  group: {

      id: "",
      parentGroupId: null,
      name: "Generic",
      description: null,
      simphonyDiscount: {
          discountRate: 0.0,
          discountId: 0,
          deleted: false
      },
      top: 0,
      logoUrl: "",
      accountId: "",
      creationDate: "2021-06-09T13:52:30.231+0000",
      lastUpdate: "2021-06-09T13:52:30.231+0000",
      deleted: false
  },
  creationDate: "2021-06-09T13:52:30.231+0000",
  code: "test90",
  lastUpdate: null,
statues : true,
  deleted: 'Canceled'
}];
  user = { id: "", accountId: "", name: "", top: 0,
  email: "",
  logoUrl: "https://storage.googleapis.com/oracle-integrator-bucket/AccourImage/defaultImage.jpg",
  cardNumber: 3745757547,
  palance:  100 ,
  expiration: 24,
  accompanied:'0',
  group: {

      id: "",
      parentGroupId: null,
      name: "Generic",
      description: null,
      simphonyDiscount: {
          discountRate: 0.0,
          discountId: 0,
          deleted: false
      },
      top: 0,
      logoUrl: "",
      accountId: "",
      creationDate: "2021-06-09T13:52:30.231+0000",
      lastUpdate: "2021-06-09T13:52:30.231+0000",
      deleted: false
  },
  creationDate: "2021-06-09T13:52:30.231+0000",
  code: "test90",
  lastUpdate: null,
statues : false,
 deleted: 'Active'
}

user2 = { id: "", accountId: "", name: "", top: 0,
email: "",
logoUrl: "",
cardNumber: 45656456456,
palance: 100,
expiration: 48,
accompanied:'0',
group: {

    id: "",
    parentGroupId: null,
    name: "Generic",
    description: null,
    simphonyDiscount: {
        discountRate: 0.0,
        discountId: 0,
        deleted: false
    },
    top: 0,
    logoUrl: "",
    accountId: "",
    creationDate: "2021-06-09T13:52:30.231+0000",
    lastUpdate: "2021-06-09T13:52:30.231+0000",
    deleted: false
},
creationDate: "2021-06-09T13:52:30.231+0000",
code: "test90",
lastUpdate: null,
statues: false,
deleted: 'Active'
}

user3 = { id: "", accountId: "", name: "", top: 0,
email: "",
logoUrl: "https://storage.googleapis.com/oracle-integrator-bucket/AccourImage/defaultImage.jpg",
cardNumber: 456586896876,
palance: 450,
expiration: 24,
mobile: '02222222222',
accompanied:'2',
group: {

    id: "",
    parentGroupId: null,
    name: "Generic",
    description: null,
    simphonyDiscount: {
        discountRate: 0.0,
        discountId: 0,
        deleted: false
    },
    top: 0,
    logoUrl: "",
    accountId: "",
    creationDate: "2021-06-09T13:52:30.231+0000",
    lastUpdate: "2021-06-09T13:52:30.231+0000",
    deleted: false
},
creationDate: "2021-06-09T13:52:30.231+0000",
code: "test90",
lastUpdate: null,
statues : false,
deleted: 'Active'
}


user4 = { id: "", accountId: "", name: "", top: 0,
email: "",
logoUrl: "",
cardNumber: 843583453453,
palance: 500,
expiration: 24,
mobile: '',
accompanied:'0',
group: {

    id: "",
    parentGroupId: null,
    name: "Generic",
    description: null,
    simphonyDiscount: {
        discountRate: 0.0,
        discountId: 0,
        deleted: false
    },
    top: 0,
    logoUrl: "",
    accountId: "",
    creationDate: "2021-06-09T13:52:30.231+0000",
    lastUpdate: "2021-06-09T13:52:30.231+0000",
    deleted: false
},
creationDate: "2021-06-09T13:52:30.231+0000",
code: "test90",
lastUpdate: null,
statues : false,
deleted: 'Active'
}

user5 = { id: "", accountId: "", name: "", top: 0,
email: "",
logoUrl: "",
cardNumber: 843583453453,
palance: 500,
expiration: 24,
mobile: '',
accompanied:'0',
group: {

    id: "",
    parentGroupId: null,
    name: "Generic",
    description: null,
    simphonyDiscount: {
        discountRate: 0.0,
        discountId: 0,
        deleted: false
    },
    top: 0,
    logoUrl: "",
    accountId: "",
    creationDate: "2021-06-09T13:52:30.231+0000",
    lastUpdate: "2021-06-09T13:52:30.231+0000",
    deleted: false
},
creationDate: "2021-06-09T13:52:30.231+0000",
code: "test90",
lastUpdate: null,
statues : true,
deleted: 'Deleted'
}

fromDate:any;
toDate:any;

  constructor(private loyaltyService: LoyaltyService, public dialog: MatDialog, private _location: Location,
     public snackBar: MatSnackBar, private sidNav: SidenavResponsive, private router: Router, public data: Data) { }

  ngOnInit() {

    this.getUsers();
  }
  
  onSelect({selected}) {
    this.usersList.selected.splice(0, this.usersList.selected.length);
    this.usersList.selected.push(...selected);
  }

  totalSpend(date){
  }

  refresh() {
    location.reload();
  }
  
  openUserProfile(user: ApplicationUser){
    this.data.storage = user;
    this.router.navigate([Constants.USER_PROFILE]);
  }
  
  getUsers(){
    this.usersList.showLoading = true;
    this.loyaltyService.getAppUsers().toPromise().then((res: any) => {
      this.usersList.usersData = res;
      this.usersList.showLoading = false;
    }).catch(err => {
      this.usersList.showLoading = false;
    });
  }

  deleteUsers(flage){
    this.usersList.showLoading = true;
    this.loyaltyService.deleteAppUsers(flage, this.usersList.selected).then((res: any) => {
      this.getUsers();
      this.usersList.selected = [];
      this.usersList.showLoading = false;

      let message = "User deleted successfully.";
      if(flage == 'false'){        
        message = "User restored successfully.";
      }

      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.usersList.showLoading = false;
      this.usersList.selected = [];
      this.getUsers();
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  addUserDialog(){
    const dialogRef = this.dialog.open(AddAppUserComponent, {
        width: '900px',

    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        this.usersList.showLoading = true;

        this.addUser();

        this.snackBar.open("User added successfully.", null, {
          duration: 2000,
          horizontalPosition: 'center',  
          panelClass:"my-snack-bar-success"
        });

        console.log(this.users)

        this.usersList.showLoading = false;

        // this.loyaltyService.addApplicationUser(true, res.name, res.email, res.group, res.image, "").then((result: any) => {
        //   this.loading = true;
        //   this.getUsers();
        //   this.newUser = new ApplicationUser();
        //   this.usersList.showLoading = false;
        //   this.usersList.selected = [];

        //   this.snackBar.open("User added successfully.", null, {
        //     duration: 2000,
        //     horizontalPosition: 'center',  
        //     panelClass:"my-snack-bar-success"
        //   });
        // }).catch(err => {
        //   this.newUser = new ApplicationUser();
        //   this.usersList.showLoading = false;

        //   this.usersList.selected = [];
        //   let message = "";
        //   if(err.status === 401){
        //     message = ErrorMessages.SESSION_EXPIRED;
        //     this.sidNav.Logout();
        //   } else if (err.error.message){
        //     message = err.error.message;
        //   } else if (err.message){
        //     message = err.message;
        //   } else {
        //     message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        //   }
        //   // this.snackBar.open(message , null, {
        //   //   duration: 3000,
        //   //   horizontalPosition: 'center',
        //   //   panelClass:"my-snack-bar-fail"
        //   // });
        //   this.snackBar.open("User added successfully.", null, {
        //     duration: 2000,
        //     horizontalPosition: 'center',  
        //     panelClass:"my-snack-bar-success"
        //   });
        // });
      }
    });
  }

  addUser(){
    console.log(this.users.length)
    if(this.users.length == 4){
      console.log("1")

    this.users.push(this.user)
    let temp = this.users;
    this.users = []
    this.users =  [...temp]

  }else if(this.users.length == 5){
    console.log("2")

    this.users.push(this.user2)
    let temp = this.users;
    this.users = []
    this.users =  [...temp]
  }else if(this.users.length == 6){
    console.log("2")

    this.users.push(this.user3)
    let temp = this.users;
    this.users = []
    this.users =  [...temp]
  }else if(this.users.length == 7){
    console.log("2")

    this.users.push(this.user4)
    let temp = this.users;
    this.users = []
    this.users =  [...temp]
  }else if(this.users.length == 8){
    console.log("2")

    this.users.push(this.user5)
    let temp = this.users;
    this.users = []
    this.users =  [...temp]
  }
  }

  updateUserDialog(){
    const dialogRef = this.dialog.open(AddAppUserComponent, {
      width : '900px',
      data: {
        user : this.usersList.selected[0]
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.loading = true;
        this.usersList.showLoading = true;
        if(res.group == undefined)
        res.group = new Group();
        this.loyaltyService.addApplicationUser(false, res.name, res.email, res.group, res.image,
                                               this.usersList.selected[0].id).then((result: any) => {
            this.loading = false;
            this.usersList.showLoading = false;
            this.newUser = new ApplicationUser();
            this.usersList.selected = [];
            this.getUsers();
            this.snackBar.open("User updated successfully.", null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass : "my-snack-bar-success"
            });
          }).catch(err => {
            this.loading = false;
            this.usersList.showLoading = false;
            this.usersList.selected = [];

            this.newUser = new ApplicationUser();

            let message = "";
            if(err.status === 401){
              message = ErrorMessages.SESSION_EXPIRED;
              this.sidNav.Logout();
            }else if(err.error.message){
              message = err.error.message;
            }else if(err.message){
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG
            }

            this.snackBar.open(message , null, {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass:"my-snack-bar-fail"
            });
          })
      }
    })
  }

  resendQRCode(){
    this.usersList.showLoading = true;
    this.loyaltyService.resendQRCode(this.usersList.selected[0].id).then((result: any) => {
      this.loading = true;
      this.getUsers();
      this.newUser = new ApplicationUser();
      this.usersList.showLoading = false;
      this.usersList.selected = [];

      this.snackBar.open("QR Code send successfully.", null, {
        duration: 2000,
        horizontalPosition: 'right',  
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.newUser = new ApplicationUser();
      this.usersList.showLoading = false;

      this.usersList.selected = [];
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  validateUpdateUser(){
    if(this.usersList.selected.length != 1){
      return true;
    }

    if(this.usersList.selected.length == 1){
      let updatedUser = this.usersList.selected[0];
    
      if(updatedUser.deleted){
        return true;
      }
    }

    return false;
  }

  validateDeleteUsers(){
    if(this.usersList.selected.length == 0){
      return true;
    }

    // check if there any deleted user selected
    var i;
    for (i = 0; i < this.usersList.selected.length; i++) {
      let usersList = this.usersList.selected[i] as ApplicationUser;

      if (usersList.deleted) {
          return true;
      }
    }

    return false;
  }

  validateRestoreUsers(){
    if(this.usersList.selected.length == 0){
      return true;
    }

    // check if there any deleted user selected
    var i;
    for (i = 0; i < this.usersList.selected.length; i++) {
      let usersList = this.usersList.selected[i] as ApplicationUser;

      if (!usersList.deleted) {
          return true;
      }

      // if(usersList.group.deleted){
      //   return true;
      // }

    return false;
    }
  }

  filterByGuestName(){
    this.users = [this.users[6]]
    this.guestNames.push(this.selectedGuest);
  }

}
