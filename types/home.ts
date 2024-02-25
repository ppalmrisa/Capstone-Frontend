export interface IGetJobList {
  id: string;
  jobName: string;
  status: 'waiting' | 'running' | 'working' | 'failed';
  jobPeriodStart: string;
  jobPeriodEnd: string;
  camera: string;
}

export interface ICreateJob {
  jobName: string;
  jobPeriodStart: string;
  jobPeriodEnd: string;
  camera: string;
  description: string;
}
