import { Component } from '@angular/core';

@Component({
  template: `
    <div class="page-header"><h1>Notifications</h1></div>
    <div class="card empty-state">
      <h3>No notifications</h3>
      <p>You're all caught up!</p>
    </div>
  `
})
export class NotificationsComponent {}
