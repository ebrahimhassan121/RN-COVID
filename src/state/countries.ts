import {fetchCountriesSummary} from '@src/utils/countries-summary-api';
import {useQuery} from 'react-query';

export const useCountriesData = () =>
  useQuery('countriesData', fetchCountriesSummary, {staleTime: 1000 * 60 * 24});
