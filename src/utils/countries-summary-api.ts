import {ISummarySuccessResult} from '@src/interfaces/ISummarySuccessResult';
import Axios from 'axios';
let fetchCount = 1;
export const fetchCountriesSummary =
  async (): Promise<ISummarySuccessResult> => {
    let data = await (
      await Axios.get('https://api.covid19api.com/summary')
    ).data;
    console.log('fetch Count', fetchCount++);
    return data;
  };
