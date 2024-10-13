
export interface Booking {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string; // Make sure this is a number
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}
