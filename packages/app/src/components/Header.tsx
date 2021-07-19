import React from 'react';
import SearchFilters from './SearchFilters';
import { ToggleButton } from '../styles/Button';
import Navbar, { title } from '../styles/Navbar';

type Props = {
  currentTopics: string[],
  setTopics: (topics: string[]) => void;
}

const Header = ({
  ...props
}: Props) => {
  const [ visible, setVisible ] = React.useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <Navbar full={visible}>
      <div className={title}>Recommender</div>
      <ToggleButton onClick={toggleVisibility}>Toggle Filters</ToggleButton>
      <SearchFilters {...props} visible={visible}/>
    </Navbar>
  )
}

export default Header;
