import {DailyStat} from 'src/shared/types/daily-stat';

export const dateMapper = (e: DailyStat): DailyStat => {
  e.Date = new Date(e.Date).toLocaleDateString();
  return e;
};
