import { css } from "@emotion/css";
import { lighten } from "polished";
import React from "react";
import { Button, Input } from 'antd';
import theme from "../theme";

const { Search: AntSearch } = Input;

type Props = React.ComponentPropsWithoutRef<typeof AntSearch> & {
  buttonShow?: boolean;
  buttonIcon?: string;
}

export const style = css`
  margin: 0px 0px 8px;

  input {
    padding: 0px 12px;
    line-height: 42px;
    box-sizing: border-box;

    &:hover, &:focus {
      background-color: ${theme.colors.inputHighlightColor}!important;
      border-color: ${theme.colors.primaryColor}!important;
    }
  }
  
  &,input {
    background-color: ${theme.colors.inputColor};
    color: ${theme.colors.textColor};
    border-color: ${theme.colors.inputHighlightColor};
    border-radius: 4px;
    box-shadow: none !important;
  }
  
  .ant-input-group-addon {
    background-color: ${theme.colors.primaryColor};
  }

  .ant-btn {
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.primaryTextColor}!important;
    height: 42px;
    border: none;

    &:hover, &:focus {
      background-color: ${lighten(0.1, theme.colors.primaryColor)}!important;
      border: none;
    }
  }
`

const Search = ({
  buttonShow, buttonIcon = 'add',
  ...props
}: Props) => (
  <AntSearch placeholder="input search text" className={style} {...props} enterButton={
    buttonShow &&
    <Button
        className='input-button'
        type="primary"
        icon={<span className="material-icons" style={{ fontSize: 32 }}>{buttonIcon}</span>}
        size={'large'}/>
  }/>
)

export default Search;
