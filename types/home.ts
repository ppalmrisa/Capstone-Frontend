export interface IGetJobList {
  id: string;
  jobName: string;
  status: 'waiting' | 'running' | 'completed' | 'failed';
  jobPeriodStart: string;
  jobPeriodEnd: string;
  camera: string;
}
