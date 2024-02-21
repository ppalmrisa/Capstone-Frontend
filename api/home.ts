import axios from 'axios';

import { IGetJobList } from '@/types/home';

const baseUrl = process.env.BASE_URL;

export const apiGetJobList = () => {
  const res = axios.get<IGetJobList[]>(`${baseUrl}/job`);
  return res;
};
