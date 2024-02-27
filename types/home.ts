export interface IGetJobList {
  id: string;
  jobName: string;
  status: 'waiting' | 'running' | 'working' | 'failed';
  jobPeriodStart: string;
  jobPeriodEnd: string;
  camera: string;
  description: string;
}

export interface ICreateJob {
  jobName: string;
  jobPeriodStart: Date | string;
  jobPeriodEnd: Date | string;
  camera: string;
  description: string;
}
