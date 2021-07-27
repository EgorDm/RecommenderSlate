import { useQuery } from 'react-query'
import axios from 'axios'

export interface MetaField {
  name: string,
  field: string,
  type: null | 'multilist-dropdown' | 'multilist' | 'knn' | 'dynamic-range'
}

export function getElasticIndex() {
 const path = window.location.pathname.replace('/', '');
 const index = path.length > 0 ? path : (process.env.REACT_APP_ES_INDEX as string);
 return index;
}

export function useElasticSchema() {
  return useQuery<MetaField[]>('schema', async () => {
    const index = getElasticIndex();
    const response = await axios.get(`${process.env.REACT_APP_ES_HOST as string}${index}`);
    const mapping = response.data[index].mappings;
    return mapping?._meta.field_order.filter(item => !!item.type);
  })
}
