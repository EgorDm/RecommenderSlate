import { css } from "@emotion/css";
import React from 'react';
import theme from "../components/theme";
import Flex, { FlexChild } from "../legacy/styles/Flex";
import { queries } from "../components/mediaQueries";
import ContentContainer from "./ContentContainer";
import NavbarContainer from "./NavbarContainer";
import SidebarContainer from "./SidebarContainer";

export const mainStyle = css`
  background-color: ${theme.colors.backgroundColor};
  
	${queries.xLarge`
		flex-direction: column;
	`};
  
  .sidebar-container {
    
  }
  
  .content-container {
    width: calc(100% - 400px);
    ${queries.xLarge`
		width: 100%;
	`};
  }
`;

const MainContainer = () => (
  <Flex direction="row-reverse" className={mainStyle}>
    <FlexChild className='sidebar-container'>
      <SidebarContainer/>
    </FlexChild>
    <FlexChild className='content-container'>
      <NavbarContainer/>
      <ContentContainer/>
    </FlexChild>
  </Flex>
)

export default MainContainer;
