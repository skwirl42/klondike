import { Component, Input } from '@angular/core';
import { Card } from '../models/card';

@Component({ selector: 'app-card', template: '' })
export class AppCardStubComponent {
  @Input() card: Card;
}
