import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightFilter'
})
export class FlightFilterPipe implements PipeTransform {
  transform(flights: any[], searchText: string): any[] {
    if (!flights || !searchText) return flights;
    searchText = searchText.toLowerCase();
    return flights.filter(flight =>
      flight.flightNumber.toLowerCase().includes(searchText) ||
      flight.source.toLowerCase().includes(searchText) ||
      flight.destination.toLowerCase().includes(searchText)
    );
  }
}
