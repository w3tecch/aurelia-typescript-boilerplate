import { autoinject, transient } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

export class EventBusEvents {
  public static IDS = {
    i18n: {
      locale: {
        changed: 'i18n:locale:changed'
      }
    }
  };
}

@transient()
@autoinject
export class EventBusService {

  private disposables: Subscription[] = [];

  constructor(
    public eventAggregator: EventAggregator
  ) { }

  public addSubscription(eventId: string, callback: Function): EventBusService {
    this.disposables.push(this.eventAggregator.subscribe(eventId, callback));
    return this;
  }

  public dispose(): void {
    this.disposables.forEach(d => d.dispose());
  }

}
