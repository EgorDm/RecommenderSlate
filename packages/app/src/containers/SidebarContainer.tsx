import { SelectedFilters } from "@appbaseio/reactivesearch";
import React from "react";
import SearchFilters from "../legacy/components/SearchFilters";
import { ToggleButton } from "../legacy/styles/Button";
import Navbar, { title } from "../legacy/styles/Navbar";


const SidebarContainer = () => {
  const [ visible, setVisible ] = React.useState(false);
  const toggleVisibility = () => setVisible(!visible);

  return (
    <Navbar full={visible}>
      <div className={title}>Recommender</div>
      <ToggleButton onClick={toggleVisibility}>Toggle Filters</ToggleButton>
      <SelectedFilters showClearAll={true}/>
      <SearchFilters visible={visible}/>
    </Navbar>
  )
}


export default SidebarContainer;
