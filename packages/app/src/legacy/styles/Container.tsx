import styled from '@emotion/styled'
import { css } from '@emotion/css';

import { queries } from './mediaQueries';
import theme from '../../components/theme';

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

export const filtersContainer = css`
	max-height: calc(100vh - 100px);
	overflow-y: auto;
	height: 100%;
`;

export const appContainer = css`
	${queries.xLarge`
		flex-direction: column;
	`};
`;

export default Container;
