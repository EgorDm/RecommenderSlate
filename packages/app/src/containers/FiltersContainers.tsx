import { css } from "@emotion/css";
import React from 'react';
import PropTypes from 'prop-types';
import {
  MultiDropdownList,
  MultiList,
  DynamicRangeSlider,
} from '@appbaseio/reactivesearch';
import theme from "../components/theme";
import Flex, { FlexChild } from '../components/layouts/Flex';
import { KNNSort } from '../components/search/KNNSort';

type Props = {
  visible: boolean;
}

export const style = css`
  display: flex!important;
  max-height: calc(100vh - 84px);
  overflow-y: auto;
  height: 100%;
  
  .filter-wrapper {
    padding: 24px 16px;
    border-bottom: 0.5px solid ${theme.colors.inputHighlightColor};
  }
  
  .filter-title {
    color: ${theme.colors.titleColor};
    font-weight: 900;
  }
  
  .filter-input, .filter-select {
    background-color: ${theme.colors.inputColor};
    color: ${theme.colors.textColor};
    border-color: ${theme.colors.inputHighlightColor};
    border-radius: 4px;
    
    &:hover, &:focus, &[aria-expanded="true"] {
      background-color: ${theme.colors.inputHighlightColor};
      border-color: ${theme.colors.primaryColor};
    }
  }
  
  .filter-checkbox-label:before {
    background-color: ${theme.colors.inputColor};
    color: ${theme.colors.textColor};
    border-color: ${theme.colors.inputHighlightColor};
    border-radius: 4px;
    box-shadow: none!important;

    &:hover, &:focus {
      background-color: ${theme.colors.inputHighlightColor};
      border-color: ${theme.colors.primaryColor};
    }
  }
  
  .filter-select {
    &[aria-expanded="true"] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  
  .filter-slider {
    .rheostat-handle {
      background-color: ${theme.colors.primaryColor};
      border-color: ${theme.colors.primaryColor};
    }
  }
  
  .filter-list {
    background-color: ${theme.colors.inputColor};
    border-color: ${theme.colors.primaryColor};
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    
    li {
      background-color: ${theme.colors.inputColor}!important;
      color: ${theme.colors.textColor};

      &.active {
        background-color: ${theme.colors.inputHighlightColor}!important;

      }
    }
  }
`

const FiltersContainers = ({ visible }: Props) => (
  <Flex direction="column" hidden={!visible} className={style}>
    <FlexChild className='filter-wrapper'>
      <MultiDropdownList
        componentId="languages"
        dataField="languages"
        title="Language"
        placeholder="Select languages"
        themePreset='dark'
        innerClass={{
          title: 'filter-title',
          select: 'filter-select',
          list: 'filter-list'
        }}
        URLParams
        react={{ and: [ 'tags', 'num_pages' ] }}
      />
    </FlexChild>
    <FlexChild className='filter-wrapper'>
      <MultiList
        componentId="tags"
        dataField="tags"
        title="Tags"
        size={1000}
        placeholder="Search tags"
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
        react={{ and: [ 'language', 'num_pages' ] }}
      />
    </FlexChild>
    <FlexChild className='filter-wrapper'>
      <DynamicRangeSlider
        componentId="num_pages"
        title="Page Count"
        dataField="num_pages"
        innerClass={{
          label: 'range-label',
          title: 'filter-title',
          slider: 'filter-slider'
        }}
        rangeLabels={(min, max) => ({
          start: min + ' page',
          end: max + ' pages',
        })}
        stepValue={1}
        showHistogram={false}
        showFilter={true}
        URLParams
        react={{ and: [ 'language', 'tags' ] }}
      />
    </FlexChild>
    <FlexChild className='filter-wrapper'>
      <KNNSort
        componentId="knn_sim"
        showFilter={true}
        title={'KNN'}
        innerClass={{
          title: 'filter-title'
        }}
        URLParams/>
    </FlexChild>
  </Flex>
);

FiltersContainers.propTypes = {
  visible: PropTypes.bool,
};

export default FiltersContainers;
