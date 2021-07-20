import styled from '@emotion/styled';
import theme from "../../components/theme";

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 23px;
	width: max-content;
	cursor: pointer;
	height: 100%;
	min-width: 20px;
	svg.search-icon {
		fill: ${theme.colors.primaryColor};
		transform: scale(1.25);
	}
	svg.cancel-icon {
		fill: ${theme.colors.borderColor || '#000'};
	}
`;

export default IconWrapper;
