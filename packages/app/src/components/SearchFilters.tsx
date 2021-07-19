import React from 'react';
import PropTypes from 'prop-types';
import {
  MultiDropdownList,
  SingleDropdownRange,
  RangeSlider,
  MultiList,
  DynamicRangeSlider,
} from '@appbaseio/reactivesearch';
import Flex, { FlexChild } from '../styles/Flex';
import { filtersContainer } from '../styles/Container';
import { NearestNeighborSearch } from './NearestNeighborSearch';

type Props = {
  currentTopics: string[],
  setTopics: (topics: string[]) => void;
  visible: boolean;
}

const SearchFilters = ({ currentTopics, setTopics, visible }) => (
  <Flex direction="column" hidden={!visible} className={filtersContainer}>
    <FlexChild margin="10px">
      <MultiDropdownList
        componentId="languages"
        dataField="languages"
        title="Language"
        placeholder="Select languages"
        URLParams
        react={{ and: ['tags', 'num_pages' ] }}
      />
    </FlexChild>
   <FlexChild margin="10px">
      <MultiList
        componentId="tags"
        dataField="tags"
        title="Tags"
        size={1000}
        placeholder="Search tags"
        queryFormat="and"
        showCheckbox={true}
        URLParams
        react={{ and: ['language', 'num_pages'] }}
      />
    </FlexChild>
    <FlexChild margin="10px">
      <DynamicRangeSlider
        componentId="num_pages"
        title="Page Count"
        dataField="num_pages"
        innerClass={{
          label: 'range-label',
        }}
        rangeLabels={(min, max) => ({
          start: min + ' page',
          end: max + ' pages',
        })}
        stepValue={1}
        showHistogram={false}
        showFilter={true}
        URLParams
        react={{ and: ['language', 'tags'] }}
      />
    </FlexChild>
    <NearestNeighborSearch/>
  </Flex>
);

SearchFilters.propTypes = {
  currentTopics: PropTypes.arrayOf(PropTypes.string),
  setTopics: PropTypes.func,
  visible: PropTypes.bool,
};

export default SearchFilters;
