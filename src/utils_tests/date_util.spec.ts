import DateUtil from "../../utils/date_util";

describe('DateUtil', () => {
    describe('getToday', () => {
        it('should return today date', () => {
            const today = DateUtil.getToday();
            const expectedToday = new Date();
            expectedToday.setHours(0, 0, 0, 0);
            expect(today).toEqual(expectedToday);
        });
    });

    describe('getTomorrow', () => {
        it('should return tomorrow date', () => {
            const tomorrow = DateUtil.getTomorrow();
            const expectedTomorrow = new Date();
            expectedTomorrow.setDate(expectedTomorrow.getDate() + 1);
            expectedTomorrow.setHours(0, 0, 0, 0);
            expect(tomorrow).toEqual(expectedTomorrow);
        });
    });

    describe('getYesterday', () => {
        it('should return yesterday date', () => {
            const yesterday = DateUtil.getYesterday();
            const expectedYesterday = new Date();
            expectedYesterday.setDate(expectedYesterday.getDate() - 1);
            expectedYesterday.setHours(0, 0, 0, 0);
            expect(yesterday).toEqual(expectedYesterday);
        });
    });

    describe('getDayAfter', () => {
        it('should return date after 5 days', () => {
            const date = new Date('2022-05-28');
            const dayAfter = DateUtil.getDayAfter(date, 5);
            const expectedDayAfter = new Date('2022-06-02');
            expectedDayAfter.setHours(0, 0, 0, 0);
            expect(dayAfter).toEqual(expectedDayAfter);
        });

        it('should return date after 30 days', () => {
            const date = new Date('2022-05-28');
            const dayAfter = DateUtil.getDayAfter(date, 30);
            const expectedDayAfter = new Date('2022-06-27');
            expectedDayAfter.setHours(0, 0, 0, 0);
            expect(dayAfter).toEqual(expectedDayAfter);
        });

        it('should return date in the next month', () => {
            const date = new Date('2022-05-31');
            const dayAfter = DateUtil.getDayAfter(date, 1);
            const expectedDayAfter = new Date('2022-06-01');
            expectedDayAfter.setHours(0, 0, 0, 0);
            expect(dayAfter).toEqual(expectedDayAfter);
        });
    });

    describe('getDayBefore', () => {
        it('should return date before 5 days', () => {
            const date = new Date('2022-06-02');
            const dayBefore = DateUtil.getDayBefore(date, 5);
            const expectedDayBefore = new Date('2022-05-28');
            expectedDayBefore.setHours(0, 0, 0, 0);
            expect(dayBefore).toEqual(expectedDayBefore);
        });

        it('should return date before 30 days', () => {
            const date = new Date('2022-06-27');
            const dayBefore = DateUtil.getDayBefore(date, 30);
            const expectedDayBefore = new Date('2022-05-28');
            expectedDayBefore.setHours(0, 0, 0, 0);
            expect(dayBefore).toEqual(expectedDayBefore);
        });

        it('should return date in the previous month', () => {
            const date = new Date('2022-06-01');
            const dayBefore = DateUtil.getDayBefore(date, 1);
            const expectedDayBefore = new Date('2022-05-31');
            expectedDayBefore.setHours(0, 0, 0, 0);
            expect(dayBefore).toEqual(expectedDayBefore);
        });

        describe('getDayOfWeekString', () => {
            it('should return the name of the day of the week for the given date', () => {
                const date = new Date('2023-04-23'); // Sunday
                const dayOfWeekString = DateUtil.getDayOfWeekString(date);
                expect(dayOfWeekString).toEqual('Sunday');
            });
        });

        describe('getMonthString', () => {
            it('should return the name of the month for the given date', () => {
                const date = new Date('2023-04-23');
                const monthString = DateUtil.getMonthString(date);
                expect(monthString).toEqual('April');
            });
        });

        describe('getDateStringFormatted', () => {
            it('should return a string formatted as "Month Day, Year" for the given date', () => {
                const date = new Date('2023-04-23');
                const dateString = DateUtil.getDateStringFormatted(date);
                expect(dateString).toEqual('April 23, 2023');
            });
        });
    });
});
