import { SelectedFilters } from "@appbaseio/reactivesearch";
import { css } from "@emotion/css";
import { Button } from "antd";
import React from "react";
import theme from "../components/theme";
import useWindowDimensions from "../hooks/use-window-dimensions";
import SearchFilters from "../legacy/components/SearchFilters";
import { breakpoints } from "../legacy/styles/mediaQueries";
import Navbar  from "../components/Navbar";

export const style = css`
  .selected-filters {
    
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
    <Navbar full={isVisible} className={style}>
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
      }}/>

      <SelectedFilters
        className={'selected-filters'}
        innerClass={{
          button: 'selected-filter'
        }}
        showClearAll={true}
      />
      <SearchFilters visible={isVisible}/>
    </Navbar>
  )
}


export default SidebarContainer;
