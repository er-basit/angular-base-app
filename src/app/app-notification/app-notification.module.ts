import { NgModule } from '@angular/core';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppAlertModule } from '../app-alert/app-alert.module';
import { AppNotificationService } from './app-notitication.service';


@NgModule({
  imports: [AppAlertModule, GrowlModule],
  providers: [MessageService, AppNotificationService],
  exports: [AppAlertModule, GrowlModule]
})
export class AppNotificationModule { }
