export class jobPosting {
    constructor(public job_title: string,
        public job_logo: string,
        public company_name: string,
        public location: string,
        public description: string,
        public job_type: string,
        public relevance: string,
        public date_posted: Date){
            
        }
    }