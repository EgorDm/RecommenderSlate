import React from 'react';
import { ReactiveList, ResultCard, SelectedFilters } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

import Topic from './Topic';

import ResultItem, { resultListContainer, resultCardHeader, resultListWrapper } from '../styles/ResultItem';
import Flex, { FlexChild } from '../styles/Flex';
import Link from '../styles/Link';
import Avatar from '../styles/Avatar';
import Button from '../styles/Button';

const renderResultStats = ({ numberOfResults, time }) => (
  <Flex justifyContent="flex-end">
    {numberOfResults} results found in {time}ms
  </Flex>
);

const onData = (item, currentTopics, toggleTopic) => (
  <ResultCard href={item.title} key={item._id}>
    <ResultCard.Image src={''}/>
    <ResultCard.Title>
      {item.title || ' '}
    </ResultCard.Title>
    <ResultCard.Description>
      {/* <div className='result-artists'>{item.artists}</div> */}
    </ResultCard.Description>
  </ResultCard>
);

const Results = ({ toggleTopic, currentTopics }) => (
  <div className={resultListWrapper}>
    <SelectedFilters showClearAll={true}/>
    <ReactiveList
      componentId="results"
      dataField="name"
      renderItem={data => onData(data, currentTopics, toggleTopic)}
      renderResultStats={renderResultStats}
      excludeFields={['topics']}
      react={{
        nest: [
          'nndocs',
          {and: [ 'title', 'languages', 'tags', 'artists', 'groups', 'num_pages' ]},
        ],
      } as any}
      pagination
      innerClass={{
        list: 'result-list-container',
        pagination: 'result-list-pagination',
        resultsInfo: 'result-list-info',
        poweredBy: 'powered-by',
      }}
      className={resultListContainer}
      size={6}
      sortOptions={[
        {
          label: 'Best Match',
          dataField: '_score',
          sortBy: 'desc',
        },
        {
          label: 'Most Favorites',
          dataField: 'num_favorites',
          sortBy: 'desc',
        },
        {
          label: 'Newest',
          dataField: 'id',
          sortBy: 'desc',
        },
        {
          label: 'Oldest',
          dataField: 'id',
          sortBy: 'asc',
        },
        {
          label: 'A to Z',
          dataField: 'title',
          sortBy: 'asc',
        },
        {
          label: 'Z to A',
          dataField: 'title',
          sortBy: 'desc',
        },
      ]}
    />
  </div>
);

Results.propTypes = {
  toggleTopic: PropTypes.func,
  currentTopics: PropTypes.arrayOf(PropTypes.string),
};

export default Results;
