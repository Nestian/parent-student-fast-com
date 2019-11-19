import { observable } from 'mobx';

// This component is the context of our application.
//
// The data structure below allows to keep
// track of and renders differently according to the
// relevant state of the current context.

export default class AppContext {
  // To track if the user successfully logged in
  @observable
  public isLoggedIn: boolean = false;

  // Variables to query the database and to refer
  // to student or parent in the application
  @observable
  public email: string = '';

  @observable
  public password: string = '';

  @observable
  public userName: string = 'Student1';

  // To track if the logged in user is parent
  @observable
  public isParent: boolean = false;

  // To track if the according student is well
  @observable
  public isHealthy = true;

  // To track all messages sent from student
  @observable
  public messages: string[] = [];

  // To track if message from student was
  // successfully submitted
  @observable
  public messageSubmitted: boolean = false;

  // TEMP: Variables below for mockup simulation
  @observable
  public parentUserName: string = 'Parent1';

  @observable
  public shortEmail: string = '';
}
