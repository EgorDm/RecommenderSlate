import { css } from "@emotion/css";
import React from 'react';
import PropTypes from 'prop-types';
import {
  MultiDropdownList,
  MultiList,
  DynamicRangeSlider,
  ReactiveComponent,
} from '@appbaseio/reactivesearch';
import theme from "../components/theme";
import Flex, { FlexChild } from '../components/layouts/Flex';
import { KNNSort } from '../components/search/KNNSort';
import { useElasticSchema } from "../hooks";
import Filter from "./partials/Filter";
import { useDeepCompareMemo } from "use-deep-compare"

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

const FiltersContainers = ({ visible }: Props) => {
  const {data: schema} = useElasticSchema()
  const fields = schema?.filter(meta => meta.type !== 'knn').map(meta => meta.field) || [];

  const filters = useDeepCompareMemo(() => schema?.map((meta, i) => (
    <FlexChild key={i} className='filter-wrapper'>
      <Filter meta={meta} react={fields}/>
    </FlexChild>
  )), [schema || []])

  return (
    <Flex direction="column" hidden={!visible} className={style}>
      {filters}
    </Flex>
  );
}

FiltersContainers.propTypes = {
  visible: PropTypes.bool,
};

export default FiltersContainers;
