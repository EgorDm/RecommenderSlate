import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { css as rcss } from '@emotion/react';

import { queries } from './mediaQueries';

export const flex = css`
  display: flex;
`;

export const alignCenter = css`
  align-items: center;
`;

export const FlexChild = styled.div<{
  flex?: number,
  marginLeft?: number | string,
  margin?: number | string,
}>`
  ${props => props.flex && rcss`
    flex: ${props.flex};
  `};
  ${props => props.marginLeft && rcss`
    margin-left: ${props.marginLeft};
  `};
  ${props => props.margin && rcss`
    margin: ${props.margin};
  `};

  .range-label {
    color: white;
  }
`;


const Flex = styled.div<{
  justifyContent?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end',
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  responsive?: boolean,
  alignCenter?: boolean,
  flexWrap?: boolean,
  hidden?: boolean,
}>`
  display: flex;

  ${props => props.justifyContent && rcss`
    justify-content: ${props.justifyContent};
  `};

  ${props => props.responsive && queries.small`
		flex-direction: column;
	`};

  ${props => props.direction && rcss`
		flex-direction: ${props.direction};
	`};

  ${props => props.alignCenter && alignCenter};
  ${props => props.flexWrap && rcss`
    flex-wrap: wrap;
  `};
  ${props => props.hidden && rcss`
    ${queries.xLarge`
			display: none;
		`};
  `};
`;

export default Flex;
