import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import { css } from "@emotion/css";
import React from "react";
import theme from "../components/theme";
import { resultsContainer } from "../components/layouts/Container";
import Flex, { FlexChild } from "../components/layouts/Flex";
import { queries } from "../components/mediaQueries";
import { useElasticSchema } from "../hooks";

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



const NavbarContainer = () => {
  const {data: schema} = useElasticSchema()
  const fields = schema?.map(meta => meta.field) || [];

  return (
    <Flex direction="column">
      <FlexChild>
        <DataSearch
          componentId="query"
          dataField={[ 'title', ...fields ]}
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
}

export default NavbarContainer;
