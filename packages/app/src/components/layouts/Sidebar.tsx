import styled from '@emotion/styled';
import { css } from '@emotion/css';

import { queries } from '../mediaQueries';
import theme from '../theme';

const Sidebar = styled.nav<{full: boolean}>`
	background: ${theme.colors.surfaceColor};
	left: 0;
	width: 400px;
	height: 100vh;
	position: fixed;
	z-index: 3;
	
	${({ full }) => queries.xLarge`
		width: 100%;
		height: ${full ? '100vh' : 'auto'};
		display: flex;
		flex-direction: column;
		margin-top: 50px;
	`};
`;

export default Sidebar;
