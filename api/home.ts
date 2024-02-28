import axios from 'axios';

import { ICreateJob, IGetJobList, IRequestList } from '@/types/home';

const baseUrl = process.env.BASE_URL;

export const apiGetJobList = async (params: {
  page: number;
  pageSize: number;
  jobName: string;
}) => {
  const res = await axios.get<IRequestList<IGetJobList>>(`${baseUrl}/job/asPage`, { params });
  return res;
};

export const apiGetJobDetail = async (id: string) => {
  const res = await axios.get<IGetJobList[]>(`${baseUrl}/job/byID`, {
    params: {
      id,
    },
  });
  return res;
};

export const apiCreateJob = async (data: ICreateJob) => {
  const res = await axios.post(`${baseUrl}/job`, data);
  return res;
};

export const apiDeleteJob = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/job`, {
    params: {
      id,
    },
  });
  return res;
};

export const apiUpdateJob = async (data: ICreateJob) => {
  const res = await axios.put(`${baseUrl}/job`, data);
  return res;
};
