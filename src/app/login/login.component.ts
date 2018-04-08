import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { TokenService } from '../security/token.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../constants/app.constants';
import { AppLoaderService } from '../app-loader/service/app-loader.service';
import { AuthorizationService } from '../security/authorization.service';
import { ErrorService } from '../error-handling/error.service';
import { AppNotificationService } from '../app-notification/app-notitication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  /**
   * Username
   */
  userName: String;

  /**
   * Password
   */
  password: String;

  /**
   * Denotes whether login was successful or not
   */
  loginFailed = false;

  /**
   * Subscription of the authenticate observable
   */
  authenticateSubscription: Subscription;


  constructor(private authenticationService: AuthenticationService,
      private authorizationService: AuthorizationService,
    private tokenService: TokenService,
    private router: Router,
    private loader: AppLoaderService,
    private errorService: ErrorService) {

  }

  /**
   * Login user
   */
  login() {
    this.loader.show();
    this.authenticateSubscription = this.authenticationService.authenticate({
      userName: this.userName,
      password: this.password
    }).subscribe((token) => {
      // Save token in local storage
      this.tokenService.saveToken(token);
      const userRoles = this.authorizationService.getUserRoles();
      const isAdmin = userRoles.some(role => role === APP_CONSTANTS.USER_ROLES.ADMIN);

      // Depending on the role redirect user to appropriate landing page
      if (isAdmin) {
        this.router.navigateByUrl('dashboard');
      } else {
        this.router.navigateByUrl('home');
      }
    }, (error) => {
      this.errorService.handleError(error, true);
    },
      () => {
        // For demo purposes
        setTimeout(() => {
          this.loader.hide();

        }, 2000);
      });
  }

  /**
   * Unsubscribe to observables not needed when component is destroyed
   */
  ngOnDestroy() {
    if (this.authenticateSubscription) {
      this.authenticateSubscription.unsubscribe();
    }
  }
}
