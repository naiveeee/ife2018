export const isDate = function (date) {
    if (date === null || date === undefined) return false;
    if (isNaN(new Date(date).getTime())) return false;
    return true;
};
export const getFirstDayOfMonth = function (date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
};
export const prevDate = function (date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};
export const nextDate = function (date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};
export const getDayCountOfMonth = function (year, month) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    }

    if (month === 1) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return 29;
        } else {
            return 28;
        }
    }

    return 31;
};
//计算出日历上的一个月第一天是几号
export const getStartDateOfMonth = function (year, month) {
    const result = new Date(year, month, 1);
    const day = result.getDay();
    if (day === 0) {
        return prevDate(result, 7);
    } else {
        return prevDate(result, day);
    }
};

export const getWeekNumber = function (src) {
    if (!isDate(src)) return null;
    const date = new Date(src.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};