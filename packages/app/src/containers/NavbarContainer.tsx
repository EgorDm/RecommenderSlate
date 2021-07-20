import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import React from "react";
import { dataSearchContainer } from "../legacy/styles/Container";
import Flex, { FlexChild } from "../legacy/styles/Flex";


const NavbarContainer = () => (
  <Flex direction="column">
    <FlexChild>
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
    </FlexChild>
    <FlexChild>
      <SelectedFilters showClearAll={true}/>
    </FlexChild>
  </Flex>
)

export default NavbarContainer;
