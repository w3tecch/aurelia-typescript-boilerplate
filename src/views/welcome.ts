//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection'; //or aurelia-framework
import {Router} from 'aurelia-router';

@inject(Router)
export class Welcome {

  public code: string = '';
  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public submit(): void {
    if (this.code === '1234') {
      // go to intro
      this.router.navigate('intro');
    } else {
      $('.welcome form').animateCss('shake');
    }
  }

}
