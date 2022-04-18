import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ErrorComponentComponent } from "./components/error-component/error-component.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfigurationComponent } from "./components/setting/configuration/configuration.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { Constants } from "./models/constants";

const routes: Routes = [
  { path: "", redirectTo: Constants.LOGIN_PAGE, pathMatch: "full" },
  {
    path: Constants.SETTING,
    component: ConfigurationComponent,
  },
  { path: Constants.LOGIN_PAGE, component: LoginComponent },
  { path: "forgetPassword", component: ForgetPasswordComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  
  // ==> Modules
  // Loyalty Views
  {
    path: Constants.GET_LOYALTY_PAGE,
    loadChildren: () =>
      import("./components/loyalty/loyalty.module").then(
        (m) => m.LoyaltyModule
      ),
  },
  {
    path: Constants.GET_WALLET_PAGE,
    loadChildren: () =>
      import("./components/loyalty/loyalty.module").then(
        (m) => m.LoyaltyModule
      ),
  },
  {
    path: Constants.GET_VOUCHER_PAGE,
    loadChildren: () =>
      import("./components/loyalty/loyalty.module").then(
        (m) => m.LoyaltyModule
      ),
  },
  {
    path: "redeemVoucher",

    loadChildren: () =>
      import("./components/voucher-list/voucher.module").then(
        (m) => m.VoucherModule
      ),
  },

  {
    path: "rewardPoints",
    loadChildren: () =>
      import("./components/reward-points/reward-points.module").then(
        (m) => m.RewardPointsModule
      ),
  },
  {
    path: "main",
    loadChildren: () => import("./main/main.module").then((m) => m.MainModule),
  },
  {
    path: Constants.SYNC_JOBS,
    loadChildren: () =>
      import("./components/setting/syncJob/sync-job.module").then(
        (m) => m.SyncJobModule
      ),
  },
  {
    path: Constants.USERS_CONFIGURATION,
    loadChildren: () =>
      import("./components/setting/admins/admins.module").then(
        (m) => m.AdminsModule
      ),
  },

  // Error Page
  { path: "**", component: ErrorComponentComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
