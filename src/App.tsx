import { DataSearch, ReactiveBase } from '@appbaseio/reactivesearch';
import React from 'react';
import Header from './components/Header';
import Results from './components/Results';
import Container, { appContainer, dataSearchContainer, resultsContainer } from './components/styles/Container';
import Flex, { FlexChild } from './components/styles/Flex';
import theme from './components/styles/theme';

function App() {
  const [topics, setTopics] = React.useState<string[]>([])
  const toggleTopic = (topic) => {
    const nextState = topics.includes(topic)
      ? topics.filter(item => item !== topic)
      : topics.concat(topic);
    setTopics(nextState);
  }

  return (
    <Container>
      <ReactiveBase
        app={process.env.REACT_APP_ES_INDEX as string}
        url={process.env.REACT_APP_ES_HOST as string}
        theme={theme}>
        <Flex direction="row-reverse" className={appContainer}>
          <Header currentTopics={topics} setTopics={setTopics} />
          <FlexChild className={resultsContainer}>
            <DataSearch
              componentId="repo"
              dataField={['name', 'description', 'name.keyword', 'fullname', 'owner', 'topics']}
              placeholder="Search Repos"
              iconPosition="left"
              autosuggest={false}
              URLParams
              className={dataSearchContainer}
              innerClass={{
                input: 'search-input',
              }}
            />
            <Results currentTopics={topics} toggleTopic={toggleTopic} />
          </FlexChild>
        </Flex>
      </ReactiveBase>
    </Container>
  );
}

export default App;
