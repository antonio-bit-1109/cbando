import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  public show(severity: string, content: string, summary: string, key: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: content,
      key: key,
      life: 2000,
    });
  }
}
