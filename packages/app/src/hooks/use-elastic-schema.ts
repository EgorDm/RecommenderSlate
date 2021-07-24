import { useQuery } from 'react-query'
import axios from 'axios'

export interface MetaField {
  name: string,
  field: string,
  type: null | 'multilist-dropdown' | 'multilist' | 'knn' | 'dynamic-range'
}

export function useElasticSchema() {
  return useQuery<MetaField[]>('schema', async () => {
    const response = await axios.get(`${process.env.REACT_APP_ES_HOST as string}${process.env.REACT_APP_ES_INDEX as string}`);
    const mapping = response.data[process.env.REACT_APP_ES_INDEX as string].mappings;
    return mapping?._meta.field_order.filter(item => !!item.type);
  })
}
