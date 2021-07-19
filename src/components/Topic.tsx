import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledTopic from './styles/Topic';

type Props = {
  active: boolean;
  toggleTopic: (item: string) => void;
  children: string;
}

const Topic = ({active, toggleTopic, children}: Props) => (
  <StyledTopic active={active} onClick={() => toggleTopic(children)}>
    #{children}
  </StyledTopic>
)

export default Topic;
