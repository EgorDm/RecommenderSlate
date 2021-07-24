import {
  MultiDropdownList,
  MultiList,
  DynamicRangeSlider,
  ReactiveComponent,
} from '@appbaseio/reactivesearch';
import React from 'react';
import { KNNSort } from "../../components/search/KNNSort";
import { MetaField } from "../../hooks";

type Props = {
  meta: MetaField,
  react: string[],
}

const Filter = ({
  meta: { name, field, type }, react
}: Props) => {
  switch (type) {
    case "multilist-dropdown":
      return (<MultiDropdownList
        componentId={field}
        dataField={field}
        title={name}
        placeholder={`Select ${name}`}
        themePreset='dark'
        innerClass={{
          title: 'filter-title',
          select: 'filter-select',
          list: 'filter-list'
        }}
        URLParams
        react={{ and: react }}
      />)
    case "multilist":
      return (<MultiList
        componentId={field}
        dataField={field}
        title={name}
        size={1000}
        placeholder={`Search ${name}`}
        queryFormat="and"
        showCheckbox={true}
        themePreset='dark'
        innerClass={{
          title: 'filter-title',
          input: 'filter-input',
          checkbox: 'filter-checkbox',
          label: 'filter-checkbox-label',
        }}
        URLParams
        react={{ and: react }}
      />)
    case "knn":
      return (<KNNSort
        componentId={field}
        dataField={field}
        showFilter={true}
        title={name}
        innerClass={{
          title: 'filter-title'
        }}
        URLParams/>)
    case "dynamic-range":
      return (<DynamicRangeSlider
        componentId={field}
        dataField={field}
        title={name}
        innerClass={{
          label: 'range-label',
          title: 'filter-title',
          slider: 'filter-slider'
        }}
        rangeLabels={(min, max) => ({
          start: min + ' unit',
          end: max + ' units',
        })}
        stepValue={1}
        showHistogram={false}
        showFilter={true}
        URLParams
        react={{ and: react }}
      />)
    default:
      return (<div/>)
  }
}

export default Filter;
