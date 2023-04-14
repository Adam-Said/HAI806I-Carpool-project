import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-pic',
  templateUrl: './edit-pic.component.html',
  styleUrls: ['./edit-pic.component.css']
})
export class EditPicComponent {
  file: File | null = null;
  imageUrl: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe(
      (data) => {
        this.imageUrl = data.profile_picture;
      },
      (error) => {
        console.error('Failed to get user info:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit(): void {
    if (this.file) {
      this.apiService.uploadProfilePicture(this.file).subscribe(
        (data) => {
          console.log('Profile picture uploaded successfully');
          // TODO: display success message to user
        },
        (error) => {
          console.error('Failed to upload profile picture:', error);
          // TODO: display error message to user
        }
      );
    }
  }
}