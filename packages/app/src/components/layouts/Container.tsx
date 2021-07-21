import styled from '@emotion/styled'
import { css } from '@emotion/css';

import { queries } from '../mediaQueries';
import theme from '../theme';

const Container = styled.section`
	background-color: ${theme.colors.backgroundColor};
	width: 100%;
	height: 100vh;
`;

export const resultsContainer = css`
	width: calc(100% - 400px);
	${queries.xLarge`
		width: 100%;
	`};
`;

export default Container;
