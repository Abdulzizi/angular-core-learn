import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  listUser: any;
  titleModal: string;
  userId: number;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private progressService: ProgressServiceService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.progressService.startLoading();
    this.userService.getUsers([]).subscribe((res: any) => {
      this.listUser = res.data.list;
      this.progressService.finishLoading();
    }, (err: any) => {
      this.progressService.finishLoading();

    });
  }

  createUser(modalId) {
    this.titleModal = 'Tambah User';
    this.userId = 0;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  updateUser(modalId, user) {
    this.titleModal = 'Edit User: ' + user.name;
    this.userId = user.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  deleteUser(userId) {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      text: 'User ini tidak dapat login setelah kamu menghapus datanya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
      if (!result.value) return false;

      this.userService.deleteUser(userId).subscribe((res: any) => {
        this.getUser();
      });
    });
  }

}
