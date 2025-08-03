import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  addMonths,
} from "date-fns";

export const formatDate = (
  date: string | Date,
  formatString: string = "MMM dd, yyyy"
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM dd, yyyy HH:mm");
};

export const formatDateShort = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM dd");
};

export const formatMonthYear = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMMM yyyy");
};

export const getMonthRange = (date: Date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
};

export const getYearRange = (date: Date = new Date()) => {
  return {
    start: startOfYear(date),
    end: endOfYear(date),
  };
};

export const getPreviousMonth = (date: Date = new Date()): Date => {
  return subMonths(date, 1);
};

export const getNextMonth = (date: Date = new Date()): Date => {
  return addMonths(date, 1);
};

export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const today = new Date();
  return format(dateObj, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
};

export const isThisMonth = (date: string | Date): boolean => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const today = new Date();
  return format(dateObj, "yyyy-MM") === format(today, "yyyy-MM");
};

export const getDaysInMonth = (date: Date = new Date()): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getWeekdayName = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "EEEE");
};
