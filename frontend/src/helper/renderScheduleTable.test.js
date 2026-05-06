import {
    checkSemesterEnd,
    isWeekOdd,
    getWeekParity
} from './renderScheduleTable';

const MOCK_DATE = new Date('2024-10-10T12:00:00');

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_DATE);
});

afterAll(() => {
    jest.useRealTimers();
});

describe('checkSemesterEnd', () => {

    test('семестр вже закінчився', () => {
        expect(checkSemesterEnd('01/10/2024')).toBe(true);
    });

    test('семестр ще триває', () => {
        expect(checkSemesterEnd('20/10/2024')).toBe(false);
    });

    test('сьогодні останній день семестру', () => {
        
        expect(checkSemesterEnd('10/10/2024')).toBe(true);
    });

    test('майбутня дата', () => {
        expect(checkSemesterEnd('01/12/2024')).toBe(false);
    });

});

describe('isWeekOdd', () => {

    test('непарні тижні', () => {
        expect(isWeekOdd(1)).toBe(true);
        expect(isWeekOdd(3)).toBe(true);
        expect(isWeekOdd(101)).toBe(true);
    });

    test('парні тижні', () => {
        expect(isWeekOdd(2)).toBe(false);
        expect(isWeekOdd(100)).toBe(false);
    });

    test('нуль', () => {
        expect(isWeekOdd(0)).toBe(false);
    });

});

describe('getWeekParity', () => {

    test('дата ДО семестру → 0', () => {
        const startDate = '15/10/2024';
        const currentDate = new Date('2024-10-10');

        expect(getWeekParity(startDate, currentDate)).toBe(0);
    });

    test('дата = старт семестру → 1', () => {
        const startDate = '10/10/2024';
        const currentDate = new Date('2024-10-10');

        expect(getWeekParity(startDate, currentDate)).toBe(1);
    });

    test('початок семестру (звичайний випадок)', () => {
        const startDate = '07/10/2024';
        const currentDate = new Date('2024-10-08');

        expect(getWeekParity(startDate, currentDate)).toBe(1);
    });

    test('кінець першого тижня (boundary)', () => {
        const startDate = '07/10/2024';
        const currentDate = new Date('2024-10-13');

        expect(getWeekParity(startDate, currentDate)).toBe(2);
    });

    test('початок другого тижня', () => {
        const startDate = '07/10/2024';
        const currentDate = new Date('2024-10-14');

        expect(getWeekParity(startDate, currentDate)).toBe(2);
    });

    test('другий тиждень', () => {
        const startDate = '07/10/2024';
        const currentDate = new Date('2024-10-15');

        expect(getWeekParity(startDate, currentDate)).toBe(2);
    });

    test('третій тиждень', () => {
        const startDate = '07/10/2024';
        const currentDate = new Date('2024-10-22');

        expect(getWeekParity(startDate, currentDate)).toBe(3);
    });

    test('ігнор часу (fix setHours мутант)', () => {
        const startDate = '07/10/2024';
        const currentDate = new Date('2024-10-08T23:59:59');

        expect(getWeekParity(startDate, currentDate)).toBe(1);
    });

    test('семестр стартує в неділю', () => {
        const startDate = '06/10/2024'; 
        const currentDate = new Date('2024-10-07');

        expect(getWeekParity(startDate, currentDate)).toBe(1);
    });

    test('робота з Date обʼєктами', () => {
        const startDate = new Date('2024-10-07');
        const currentDate = new Date('2024-10-15');

        expect(getWeekParity(startDate, currentDate)).toBe(2);
    });

});