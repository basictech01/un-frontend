import { getInitials } from './utils';

describe('getInitials', () => {
  it('should extract initials from a two-word name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should extract initial from a single-word name', () => {
    expect(getInitials('Jane')).toBe('J');
  });

  it('should extract only first two initials from a multi-word name', () => {
    expect(getInitials('John Paul Smith')).toBe('JP');
  });

  it('should return empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });

  it('should return empty string for whitespace-only input', () => {
    expect(getInitials('   ')).toBe('');
  });

  it('should handle names with extra whitespace', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });

  it('should return uppercase initials', () => {
    expect(getInitials('john doe')).toBe('JD');
  });

  it('should handle mixed case names', () => {
    expect(getInitials('jOhN dOe')).toBe('JD');
  });

  it('should handle special characters in names', () => {
    expect(getInitials("O'Brien")).toBe('O');
  });

  it('should handle hyphenated names as single word', () => {
    expect(getInitials('Mary-Jane Watson')).toBe('MW');
  });

  it('should handle names with multiple spaces between words', () => {
    expect(getInitials('John     Doe')).toBe('JD');
  });

  it('should return empty string for non-string input', () => {
    // @ts-expect-error Testing runtime behavior with invalid input
    expect(getInitials(null)).toBe('');
    // @ts-expect-error Testing runtime behavior with invalid input
    expect(getInitials(undefined)).toBe('');
    // @ts-expect-error Testing runtime behavior with invalid input
    expect(getInitials(123)).toBe('');
  });

  it('should handle single character names', () => {
    expect(getInitials('A')).toBe('A');
  });

  it('should handle names with numbers', () => {
    expect(getInitials('John Doe 3rd')).toBe('JD');
  });

  it('should handle unicode characters', () => {
    expect(getInitials('José María')).toBe('JM');
  });
});
