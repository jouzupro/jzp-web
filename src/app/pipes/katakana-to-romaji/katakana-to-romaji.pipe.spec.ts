import { KatakanaToRomajiPipe } from './katakana-to-romaji.pipe';

describe('KatakanaToRomajiPipe', () => {
  it('create an instance', () => {
    const pipe = new KatakanaToRomajiPipe();
    expect(pipe).toBeTruthy();
  });
});
