import { jobPosting } from './jobs';

describe('jobPosting ', () => {
  it('should create an instance', () => {
    expect(new jobPosting ('searchInput','searchResults','search', 'title', 'job_logo', 'company_name', 'location', 'description', 'contract_type', 'tags', 0)).toBeTruthy();
  });
});