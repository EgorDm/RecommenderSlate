import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { lighten } from "polished";
import theme from "../../components/theme";

const item = {
	width: '16px',
	height: '16px',
	scale: '4px',
};

const vh = css`
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	white-space: nowrap;
`;

const formItem = css`
	${vh};
	&:focus {
		+ label {
			&::before {
				box-shadow: 0 0 0 2px ${lighten(0.4, theme.colors.primaryColor)};
			}
		}
	}
	&:hover {
		+ label {
			&::before {
				border-color: ${theme.colors.primaryColor};
			}
		}
	}
	&:active {
		+ label {
			&::before {
				transition-duration: 0s;
			}
		}
	}
	+ label {
		position: relative;
		user-select: none;
		display: flex;
		width: 100%;
		height: 100%;
		margin: 0.4rem 0;
		align-items: flex-start;
		cursor: pointer;
		&:hover {
			color: ${theme.colors.primaryColor};
		}
		& > span {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			line-height: 1.3rem;
			& > span:first-of-type {
				padding-right: 5px;
			}
			& > span:nth-of-type(2) {
				color: ${lighten(0.35, theme.colors.textColor)};
			}
		}
		&::before {
			background-color: #fff;
			border: 1px solid ${theme.colors.borderColor || lighten(0.1, theme.colors.textColor)};
			box-sizing: content-box;
			content: '';
			color: ${theme.colors.primaryColor};
			margin-right: calc(${item.width} * 0.5);
			top: 50%;
			left: 0;
			width: calc(${item.width} + 1px);
			height: ${item.height};
			display: inline-block;
			vertical-align: middle;
			margin-top: 2px;
		}
		&::after {
			box-sizing: content-box;
			content: '';
			background-color: ${theme.colors.primaryColor};
			position: absolute;
			top: 11px;
			left: calc(1px + ${item.scale} / 2);
			width: calc(${item.width} - ${item.scale});
			height: calc(${item.height} - ${item.scale});
			margin-top: calc(${item.height} / -2 - ${item.scale} / -2);
			transform: scale(0);
			transform-origin: 50%;
			transition: transform 200ms ease-out;
		}
	}
`;

const hideInputControl = css`
	+ label {
		padding-left: 0;
		&::before,
		&::after {
			width: 0;
			height: 0;
			border: 0;
			margin: 0;
			visibility: hidden;
		}
	}
	&:checked {
		+ label {
			font-weight: bold;
		}
	}
`;

export const Checkbox = styled.input<{
	show?: boolean
}>`
	${formItem};
	${props => (props.show ? null : hideInputControl)};
	+ label {
		&::before,
		&::after {
			border-radius: 2px;
		}
		&::after {
			background-color: transparent;
			top: 10px;
			left: calc(1px + ${item.width} / 5);
			width: calc(${item.width} / 2);
			height: calc(${item.width} / 5);
			margin-top: calc(${item.height} / -2 / 2 * 0.8);
			border-style: solid;
			border-color: ${theme.colors.primaryTextColor};
			border-width: 0 0 2px 2px;
			border-radius: 0;
			border-image: none;
			transform: rotate(-45deg) scale(0);
			transition: none;
		}
	}
	&:checked {
		+ label {
			&::before {
				border-color: ${theme.colors.primaryColor};
				background-color: ${theme.colors.primaryColor};
			}
			&::after {
				content: '';
				transform: rotate(-45deg) scale(1);
				transition: transform 200ms ease-out;
			}
		}
	}
`;
Checkbox.defaultProps = {
	type: 'checkbox',
	show: true,
}

export const UL = styled('ul')`
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
