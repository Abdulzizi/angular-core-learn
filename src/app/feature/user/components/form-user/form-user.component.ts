import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() userId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  formModel: {
    id: number,
    name: string,
    email: string,
    password: string
  }

  constructor(
    private userService: UserService,
    private landaService: LandaService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  resetForm() {
    this.formModel = {
      id: 0,
      name: '',
      email: '',
      password: ''
    }

    if (this.userId > 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getUser(this.userId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  getUser(userId) {
    this.userService.getUserById(userId).subscribe((res: any) => {
      this.formModel = res.data;
    }, err => {
      console.log(err);
    });
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
  }

  insert() {
    this.userService.createUser(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.userService.updateUser(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

}
