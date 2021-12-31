import ICountry from './ICountry';
import IGlobal from './IGlobal';

export interface ISummarySuccessResult {
  Global: IGlobal;
  Countries: ICountry[];
  Date: string;
}
