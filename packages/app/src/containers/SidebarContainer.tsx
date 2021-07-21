import { SelectedFilters } from "@appbaseio/reactivesearch";
import { Button } from "antd";
import React from "react";
import SearchFilters from "../legacy/components/SearchFilters";
import { ToggleButton } from "../legacy/styles/Button";
import Navbar, { title } from "../legacy/styles/Navbar";


const SidebarContainer = () => {
  const [ visible, setVisible ] = React.useState(true);
  const toggleVisibility = () => setVisible(!visible);

  return (
    <Navbar full={visible}>
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

      <SelectedFilters showClearAll={true}/>
      <SearchFilters visible={visible}/>
    </Navbar>
  )
}


export default SidebarContainer;
