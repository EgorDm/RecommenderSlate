import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import { css } from "@emotion/css";
import React from "react";
import theme from "../components/theme";
import { resultsContainer } from "../legacy/styles/Container";
import Flex, { FlexChild } from "../legacy/styles/Flex";
import { queries } from "../legacy/styles/mediaQueries";

export const dataSearchContainer = css`
	position: fixed;
	z-index: 3;
	${resultsContainer};
	.search-input {
		height: 50px;
		border: none;
		background-color: ${theme.colors.inputColor};
		transition: all 0.3s cubic-bezier(.25,.8,.25,1);
		&:focus {
      background-color: ${theme.colors.inputHighlightColor};
			box-shadow: 0 1px 0 0 ${theme.colors.primaryColor};
		}
	}
	${queries.xLarge`
    left: 0;
    right: 50px;
    width: auto;
	`};
`;



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
    </FlexChild>
  </Flex>
)

export default NavbarContainer;
