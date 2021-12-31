import {ISummarySuccessResult} from '@src/interfaces/ISummarySuccessResult';
import Axios from 'axios';
export const fetchCountriesSummary =
  async (): Promise<ISummarySuccessResult> => {
    let data = await (
      await Axios.get('https://api.covid19api.com/summary')
    ).data;
    return data;
  };
