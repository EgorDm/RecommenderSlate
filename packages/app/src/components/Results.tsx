import { css } from "@emotion/css";
import React from 'react';
import { ReactiveList, ResultCard, SelectedFilters } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { useReduxAction } from "../hooks";
import { KNNActions } from "../store";

import { resultListContainer, resultListWrapper } from '../styles/ResultItem';
import Flex from '../styles/Flex';

const renderResultStats = ({ numberOfResults, time }) => (
  <Flex justifyContent="flex-end">
    {numberOfResults} results found in {time}ms
  </Flex>
);

const addItemButtonStyle = css`
	position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  font-size: 20px;
`;

const resultStyle = css`
	position: relative;
`;


const onData = (item, addKnn: (id: number | string) => void) => (
  <ResultCard href={item.id.toString()} className={resultStyle}>
    <ResultCard.Image src={''}/>
    <ResultCard.Title>
      {item.title || ' '}
    </ResultCard.Title>
    <ResultCard.Description>
      {/* <div className='result-artists'>{item.artists}</div> */}
    </ResultCard.Description>
    <div className={addItemButtonStyle} onClick={(e) => {
      e.preventDefault();
      addKnn(item.id);
    }}>
      <i className="fa fa-plus"/>
    </div>
  </ResultCard>
);

const Results = () => {
  const addKNNDoc = useReduxAction(KNNActions.add)

  return (
    <div className={resultListWrapper}>
      <SelectedFilters showClearAll={true}/>
      <ReactiveList
        componentId="results"
        dataField="name"
        renderItem={data => onData(data, addKNNDoc)}
        renderResultStats={renderResultStats}
        react={{
          nest: [
            'knn_sim',
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
        size={25}
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
}

Results.propTypes = {
  toggleTopic: PropTypes.func,
  currentTopics: PropTypes.arrayOf(PropTypes.string),
};

export default Results;
