import { CheckIfTypoPipe } from './check-if-typo.pipe';

describe('CheckIfTypoPipe', () => {
  let pipe: CheckIfTypoPipe;

  beforeEach(() => {
    pipe = new CheckIfTypoPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "correct" when the answer matches exactly', () => {
    expect(pipe.transform('mountain', ['mount', 'mountain'])).toBe('correct');
  });

  it('should return "typo" when the answer has a slight typo', () => {
    expect(pipe.transform('ten thousandd', ['ten thousand'])).toBe('typo');
    expect(pipe.transform('ten thhoousannd', ['ten thousand'])).toBe('typo');
    expect(pipe.transform('tn thousaand', ['ten thousand'])).toBe('typo');
  });

  it('should return "incorrect" when the answer is completely wrong', () => {
    expect(pipe.transform('ten hundred', ['ten thousand'])).toBe('incorrect');
  });

  it('should handle empty input and return "incorrect"', () => {
    expect(pipe.transform('', ['ten thousand'])).toBe('incorrect');
    expect(pipe.transform('answer', [])).toBe('incorrect');
    expect(pipe.transform(null as any, ['ten thousand'])).toBe('incorrect');
    expect(pipe.transform('answer', null as any)).toBe('incorrect');
  });

  it('should be case-insensitive', () => {
    expect(pipe.transform('Mountain', ['mountain'])).toBe('correct');
    expect(pipe.transform('MOUNTAIN', ['mountain'])).toBe('correct');
    expect(pipe.transform('mOuNtAiN', ['mountain'])).toBe('correct');
  });

  it('should handle multiple correct answers', () => {
    expect(pipe.transform('mount', ['mount', 'mountain'])).toBe('correct');
  });

  it('should handle multiple correct answers with typo', () => {
    expect(pipe.transform('mounnt', ['mount', 'mountain'])).toBe('typo');
  });
});
