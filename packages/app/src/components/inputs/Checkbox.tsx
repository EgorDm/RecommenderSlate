import { css } from "@emotion/css";
import { lighten } from "polished";
import React from "react";
import { Button, Checkbox as AntCheckbox } from 'antd';
import theme from "../theme";


type Props = React.ComponentPropsWithoutRef<typeof AntCheckbox>

export const style = css`
  &.ant-checkbox-wrapper {
    margin-right: 8px;
  }
  
  .ant-checkbox:hover {
    .ant-checkbox-inner {
      border-color: ${theme.colors.primaryColor};
    }
  }
  
  .ant-checkbox-inner {
    background-color: ${theme.colors.inputColor};
    color: ${theme.colors.textColor};
    border-color: ${theme.colors.inputHighlightColor};
    border-radius: 4px;
    box-shadow: none !important;
    box-sizing: content-box;
    
    &:after {
      top: 40%;
    }
  }
  
  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: ${theme.colors.primaryColor};
      color: ${theme.colors.textColor};
      border-color: ${theme.colors.primaryColor};
    }
    
    &:after {
      border: 0;
    }
  }
`

const Checkbox = ({
  ...props
}: Props) => (
  <AntCheckbox className={style} {...props}/>
)

export default Checkbox;
