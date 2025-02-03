export default class DateUtil {
    static getToday(): Date {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }

    static getTomorrow(): Date {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return tomorrow;
    }

    static getYesterday(): Date {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        return yesterday;
    }

    static getDayAfter(date: Date, days: number): Date {
        const dayAfter = new Date(date);
        dayAfter.setDate(dayAfter.getDate() + days);
        dayAfter.setHours(0, 0, 0, 0);
        return dayAfter;
    }

    static getDayBefore(date: Date, days: number): Date {
        const dayBefore = new Date(date);
        dayBefore.setDate(dayBefore.getDate() - days);
        dayBefore.setHours(0, 0, 0, 0);
        return dayBefore;
    }

    static getDayOfWeekString(date: Date): string {
        const dayOfWeek = date.getDay();
        switch (dayOfWeek) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default:
                return '';
        }
    }

    static getMonthString(date: Date): string {
        const month = date.getMonth();
        switch (month) {
            case 0:
                return 'January';
            case 1:
                return 'February';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
            default:
                return '';
        }
    }

    static getDateStringFormatted(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${DateUtil.getMonthString(date)} ${day}, ${year}`;
    }
}