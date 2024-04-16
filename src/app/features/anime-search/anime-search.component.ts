import { Component } from '@angular/core';
import { Genre } from '../../shared/models/genre';

@Component({
  selector: 'app-anime-search',
  standalone: true,
  imports: [],
  templateUrl: './anime-search.component.html',
  styleUrl: './anime-search.component.scss',
})
export class AnimeSearchComponent {
  genres: Genre[] = [];

  generateSeasons(): string[] {
    const currentYear = new Date().getFullYear();
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    const currentMonth = new Date().getMonth() + 1; // Adding 1 since getMonth() returns zero-based index

    const result: string[] = [];

    // Iterate through three years: current, previous, and next
    for (let year = currentYear - 1; year <= currentYear + 1; year++) {
      // Loop through seasons
      for (const season of seasons) {
        // Add the season to the result
        result.push(`${season} ${year}`);
      }
    }

    return result;
  }

  // Example usage
  seasons: string[] = this.generateSeasons();
}
