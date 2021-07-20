import { DataSearch, ReactiveBase, SelectedFilters } from '@appbaseio/reactivesearch';
import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Results from './components/Results';
import store from "./store/store";
import Container, { appContainer, dataSearchContainer, resultsContainer } from './styles/Container';
import Flex, { FlexChild } from './styles/Flex';
import theme from './styles/theme';

function App() {
  const [ topics, setTopics ] = React.useState<string[]>([])
  const toggleTopic = (topic) => {
    const nextState = topics.includes(topic)
      ? topics.filter(item => item !== topic)
      : topics.concat(topic);
    setTopics(nextState);
  }

  return (
    <Container>
      <Provider store={store}>
        <ReactiveBase
          app={process.env.REACT_APP_ES_INDEX as string}
          url={process.env.REACT_APP_ES_HOST as string}
          theme={theme}>
          <Flex direction="row-reverse" className={appContainer}>
            <Header currentTopics={topics} setTopics={setTopics}/>
            <FlexChild className={resultsContainer}>
              <DataSearch
                componentId="query"
                dataField={[ 'title', 'languages', 'tags', 'artists', 'groups', 'num_pages' ]}
                placeholder="Search Documents"
                iconPosition="left"
                autosuggest={false}
                URLParams
                className={dataSearchContainer}
                innerClass={{
                  input: 'search-input',
                }}
              />
              <Results currentTopics={topics} toggleTopic={toggleTopic}/>
            </FlexChild>
          </Flex>
        </ReactiveBase>
      </Provider>
    </Container>
  );
}

export default App;
