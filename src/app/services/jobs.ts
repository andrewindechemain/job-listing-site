export class jobPosting {
    constructor(
      public searchInput:string,
      public searchResults:string,
      public search: string,
      public title: string,
      public job_logo: string,
      public display_name: string,
      public location: string,
      public description: string,
      public contract_type: string,
      public tags: string,
      public date_posted: number
    ) {
    }
  }
  