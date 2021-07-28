import { SelectedFilters } from "@appbaseio/reactivesearch";
import { css } from "@emotion/css";
import { Button } from "antd";
import React from "react";
import theme from "../components/theme";
import useWindowDimensions from "../hooks/use-window-dimensions";
import FiltersContainers from "./FiltersContainers";
import { breakpoints, queries } from "../components/mediaQueries";
import Sidebar  from "../components/layouts/Sidebar";

export const style = css`
  .selected-filters {
    padding: 24px 16px;
    border-bottom: 0.5px solid ${theme.colors.inputHighlightColor};

    ${queries.xLarge`
      padding: 8px 8px;
	  `};
  }
  
  .selected-filter {
    background-color: ${theme.colors.inputHighlightColor};
    
    &:hover {
      background-color: ${theme.colors.inputColor}
    }
  }
`

const SidebarContainer = () => {
  const { width } = useWindowDimensions();
  const [ visible, setVisible ] = React.useState(false);
  const toggleVisibility = () => setVisible(!visible);

  const isVisible = visible || width > breakpoints.xLarge;

  return (
    <Sidebar full={isVisible} className={style}>
      <Button type="primary" shape="circle" size="large" onClick={toggleVisibility}  icon={
        <span className="material-icons" style={{fontSize: 24, marginTop: 8}}>filter_alt</span>
      } style={{
        position: 'fixed',
        right: 0,
        top: 0,
        borderRadius: 0,
        width: 50,
        height: 50,
        border: 0,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.primaryTextColor
      }}/>

      <SelectedFilters
        className={'selected-filters'}
        innerClass={{
          button: 'selected-filter'
        }}
        showClearAll={true}
      />
      <FiltersContainers visible={isVisible}/>
    </Sidebar>
  )
}


export default SidebarContainer;
