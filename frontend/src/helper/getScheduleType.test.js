import { getScheduleType } from './getScheduleType';
import { FULL, GROUP, TEACHER, DEPARTMENT } from '../constants/scheduleTypes';

describe('getScheduleType', () => {

    // =========================
    // ✅ БАЗОВІ ВИПАДКИ
    // =========================

    test('returns GROUP when group id exists', () => {
        const values = { group: { id: 1 } };
        expect(getScheduleType(values)).toBe(GROUP);
    });

    test('returns TEACHER when teacher id exists', () => {
        const values = { teacher: { id: 2 } };
        expect(getScheduleType(values)).toBe(TEACHER);
    });

    test('returns DEPARTMENT when department id exists', () => {
        const values = { department: { id: 3 } };
        expect(getScheduleType(values)).toBe(DEPARTMENT);
    });

    // =========================
    // 🔥 ПРІОРИТЕТ (ДУЖЕ ВАЖЛИВО)
    // =========================

    test('priority: GROUP > TEACHER > DEPARTMENT', () => {
        const values = {
            group: { id: 1 },
            teacher: { id: 2 },
            department: { id: 3 }
        };

        expect(getScheduleType(values)).toBe(GROUP);
    });

    test('priority: TEACHER over DEPARTMENT', () => {
        const values = {
            teacher: { id: 2 },
            department: { id: 3 }
        };

        expect(getScheduleType(values)).toBe(TEACHER);
    });

    // =========================
    // 🟡 EDGE CASES
    // =========================

    test('returns FULL when nothing is provided', () => {
        expect(getScheduleType({})).toBe(FULL);
    });

    test('returns FULL when values is null', () => {
        expect(getScheduleType({ group: null, teacher: null, department: null })).toBe(FULL);
    });

    test('returns FULL when objects have no id', () => {
        const values = {
            group: {},
            teacher: {},
            department: {}
        };

        expect(getScheduleType(values)).toBe(FULL);
    });

    test('returns FULL when id is falsy (0)', () => {
        const values = {
            group: { id: 0 }
        };

        expect(getScheduleType(values)).toBe(FULL);
    });

    test('handles undefined fields safely', () => {
        const values = {
            group: undefined,
            teacher: undefined,
            department: undefined
        };

        expect(getScheduleType(values)).toBe(FULL);
    });

    // =========================
    // 🧠 LODASH GET BEHAVIOR
    // =========================

    test('handles nested undefined safely', () => {
        expect(getScheduleType({ group: undefined })).toBe(FULL);
    });
});