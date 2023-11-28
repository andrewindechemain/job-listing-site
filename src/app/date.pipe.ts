import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
     
      const inputDate = new Date(value);

      const currentDate = new Date();

      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      const inputYear = inputDate.getFullYear();
      const inputMonth = inputDate.getMonth();
      const inputDay = inputDate.getDate();

   
      if (inputYear === currentYear && inputMonth === currentMonth && inputDay === currentDay) {
        return 'Today';
      }

  
      const currentWeekday = currentDate.getDay();

 
      const weekStart = new Date(currentYear, currentMonth, currentDay - currentWeekday);
      const weekEnd = new Date(currentYear, currentMonth, currentDay + 6 - currentWeekday);

      if (inputDate >= weekStart && inputDate <= weekEnd) {
        return 'This Week';
      }

      const monthStart = new Date(currentYear, currentMonth, 1);
      const monthEnd = new Date(currentYear, currentMonth + 1, 0);

      if (inputDate >= monthStart && inputDate <= monthEnd) {
        return 'This Month';
      }

      const seconds = Math.floor((+currentDate.getTime() - +inputDate.getTime()) / 1000);
      if (seconds < 29) {
        return 'Just now';
      }
      const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };
      let counter;
      for (let i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + '';
          } else {
            return counter + ' ' + i + 's ago';
          }
        }
      }
    }
    return value;
  }

}
