import styled from "@emotion/styled";

const UL = styled('ul')`
	list-style: none;
	margin: 0;
	max-height: 240px;
	position: relative;
	overflow-y: auto;
	padding: 0 0 12px;
	li {
		min-height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 2px;
	}
`;

export default UL;
