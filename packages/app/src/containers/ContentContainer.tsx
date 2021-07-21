import { ReactiveList, ResultCard } from "@appbaseio/reactivesearch";
import { css } from "@emotion/css";
import React from "react";
import theme from "../components/theme";
import { useReduxAction } from "../hooks";
import Flex from "../legacy/styles/Flex";
import { queries } from "../legacy/styles/mediaQueries";
import { KNNActions } from "../store";
import ResultItem from "./partials/ResultItem";

const renderResultStats = ({ numberOfResults, time }) => (
  <Flex justifyContent="flex-end">
    {numberOfResults} results found in {time}ms
  </Flex>
);

const SORT_OPTIONS = [
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
]

export const resultListContainer = css`
  margin-top: 50px;
  padding-top: 4px;

  ${queries.xLarge`
    margin-top: 100px;
	`};

  select {
    border: 0;
    outline: 0;
    background-color: ${theme.colors.inputHighlightColor};
    color: ${theme.colors.textColor};
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  
	.result-list-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.result-list-pagination {
		margin: 40px 0 50px;

    a[disabled] {
      color: ${theme.colors.textColor};
    }
	}
	.result-list-info {
		margin: 1rem;
		justify-content: space-between;
	}
	.powered-by {
		display: none;
	}
`;

const ContentContainer = () => {
  const addKNNDoc = useReduxAction(KNNActions.add)

  return (
    <ReactiveList
      componentId="results"
      dataField="name"
      renderItem={data => <ResultItem key={data.id} item={data} onActionPress={() => addKNNDoc(data.id)}/>}
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
      sortOptions={SORT_OPTIONS}
    />
  )
}

export default ContentContainer;
