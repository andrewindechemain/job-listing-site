import { jobPosting } from './jobs';

describe('jobPosting ', () => {
  it('should create an instance', () => {
    expect(new jobPosting ("Software Engineer",
    "logo.png",
    "Microsoft",
    "Redmond, WA",
    "Develop and maintain software products",
    "Full-time",
    "High",
    new Date())).toBeTruthy();
  });
});