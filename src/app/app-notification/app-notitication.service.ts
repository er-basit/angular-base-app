import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { AppAlertService } from '../app-alert/service/app-alert.service';

export type NOTIFICATION_TYPE = 'alert' | 'growl';

@Injectable()
export class AppNotificationService {

  constructor(private growlService: MessageService, private alertService: AppAlertService) { }

  /**
   * Notifies Error
   * @param message message to be displayed inside notification
   * @param type of notification to be displaed
   * @param dismissOnTimeout timeout time for the notification to dismiss automatically
   * @param dismissable whether notification is dismissible or not
   */
  public notifyError(messages: Array<string>, type?: NOTIFICATION_TYPE, dismissOnTimeout?: number, dismissable?: boolean) {
    if (type && type === 'alert') {
      this.alertService.alertError(messages, dismissOnTimeout, dismissable);
    } else {
      if (messages.length === 1) {
        this.growlService.add({ severity: 'error', summary: 'Error', detail: messages[0] });

      } else {
        this.growlService.addAll(messages.map(message => {
          return { severity: 'error', summary: 'Error', detail: message };
        }));
      }
    }
  }

  /**
   * Notifies Info
   * @param messages messages to be displayed inside notification
   * @param type of notification to be displaed
   * @param dismissOnTimeout timeout time for the notification to dismiss automatically
   * @param dismissable whether notification is dismissible or not
   */
  public notifyInfo(messages: Array<string>, type?: NOTIFICATION_TYPE, dismissOnTimeout?: number, dismissable?: boolean) {
    if (type && type === 'alert') {
      this.alertService.alertInfo(messages, dismissOnTimeout, dismissable);
    } else {
      if (messages.length === 1) {
        this.growlService.add({ severity: 'info', summary: 'Info', detail: messages[0] });

      } else {
        this.growlService.addAll(messages.map(message => {
          return { severity: 'info', summary: 'Info', detail: message };
        }));
      }
    }
  }

  /**
   * Notifies Warning
   * @param messages messages to be displayed inside notification
   * @param type of notification to be displaed
   * @param dismissOnTimeout timeout time for the notification to dismiss automatically
   * @param dismissable whether notification is dismissible or not
   */
  public notifyWarning(messages: Array<string>, type?: NOTIFICATION_TYPE, dismissOnTimeout?: number, dismissable?: boolean) {
    if (type && type === 'alert') {
      this.alertService.alertWarning(messages, dismissOnTimeout, dismissable);
    } else {
      if (messages.length === 1) {
        this.growlService.add({ severity: 'warn', summary: 'Warning', detail: messages[0] });

      } else {
        this.growlService.addAll(messages.map(message => {
          return { severity: 'warn', summary: 'Warning', detail: message };
        }));
      }
    }
  }

  /**
   * Notifies Success
   * @param messages messages to be displayed inside notification
   * @param type of notification to be displaed
   * @param dismissOnTimeout timeout time for the notification to dismiss automatically
   * @param dismissable whether notification is dismissible or not
   */
  public notifySuccess(messages: Array<string>, type?: NOTIFICATION_TYPE, dismissOnTimeout?: number, dismissable?: boolean) {
    if (type && type === 'alert') {
      this.alertService.alertSuccess(messages, dismissOnTimeout, dismissable);
    } else {
      if (messages.length === 1) {
        this.growlService.add({ severity: 'success', summary: 'Success', detail: messages[0] });

      } else {
        this.growlService.addAll(messages.map(message => {
          return { severity: 'success', summary: 'Success', detail: message };
        }));
      }
    }
  }
}
