import { ResultCard } from "@appbaseio/reactivesearch";
import { css } from "@emotion/css";
import * as React from "react";
import { queries } from "../../components/mediaQueries";
import theme from "../../components/theme";
import { Result } from "../../types";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  item: Result
  onActionPress: () => void;
}

const resultStyle = css`
	position: relative;
  min-width: 200px!important;
  max-width: 220px!important;
  height: 342px!important;
  background-color: ${theme.colors.surfaceColor}!important;
  border: none!important;

  ${queries.small`
    margin: 4px 4px!important;
    
    min-width: 160px!important;
    max-width: 180px!important;
    height: 300px!important;
  `};

  .item-action-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
  }
  
  .item-image {
    height: 300px;
    background-color: ${theme.colors.surfaceColor};
  }
  
  .item-title {
    padding: 0;
    margin-top: 4px;
  }
`;

const ResultItem = ({
  item, onActionPress,
  ...props
}: Props) => (
  <ResultCard href={item.id.toString()} className={resultStyle} {...props}>
    <ResultCard.Image className='item-image' src={''}/>
    <ResultCard.Title className='item-title'>{item.title}</ResultCard.Title>
    <div className='item-action-button' onClick={(e) => {
      e.preventDefault();
      onActionPress();
    }}>
      <span className="material-icons" style={{fontSize: 32}}>add</span>
    </div>
  </ResultCard>
)

export default ResultItem;
