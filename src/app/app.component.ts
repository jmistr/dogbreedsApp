import { Component, OnInit } from '@angular/core';
import { DogService } from './doggy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private doggyService: DogService) {}

  selectedValue: string;
  public dogsBreed;

  ngOnInit(): void {
    this.getAllBreeds();
  }

  getAllBreeds() {
    this.doggyService.getAllBreeds().subscribe((response) => {
      if (response.status === 'success') {
        this.dogsBreed = Object.keys(response.message);
      } else {
        console.error('Error retrieving dog breeds.');
      }
      (error) => {
        console.error('Error retrieving dog breeds.', error);
      };
    });
  }

  onOptionsSelected(selectedValue) {
    this.doggyService.searchByBreed(selectedValue).subscribe((res) => {
      const img = document.querySelector('.dog-img');
      img.src = res.message;
    });
  }
}
