import { Component } from '@angular/core';
import { AppAlertService } from '../app-alert/service/app-alert.service';
import { TestService } from '../test.service';
import { AppLoaderService } from '../app-loader/service/app-loader.service';
import { Router } from '@angular/router';
import { TokenService } from '../security/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../error-handling/error.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  testData: any;

  constructor(private alertService: AppAlertService,
    private testService: TestService,
    private loader: AppLoaderService,
    private router: Router,
    private tokenService: TokenService,
    private errorService: ErrorService) { }

  /**
   * Fetch test data
   */
  getData() {
    this.loader.show();
    this.testService.getTestData().subscribe(data => {
      this.testData = data;
    }, error => {
      this.errorService.handleError(error, true);
    }, () => {
      this.loader.hide();
    });
  }

  /**
   * Show alert message when show alert button is clicked
   */
  showAlert() {
    this.alertService.alertSuccess(['It was successfull', 'I am coming home']);
  }

  /**
   * sign out the user
   */
  signOut() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('login');
  }
}
