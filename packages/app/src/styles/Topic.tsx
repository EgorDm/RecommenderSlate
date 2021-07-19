import { css } from '@emotion/css';
import styled from '@emotion/styled';

import theme from './theme';

const Topic = styled.div<{active: boolean}>`
	background: ${({ active }) => (active ? theme.colors.primaryColor : theme.colors.secondaryColor)};
	margin: 3px;
	padding: 4px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	border-radius: 4px;
	&:hover {
		background: ${theme.colors.primaryColor};
	}
`;

export default Topic;
