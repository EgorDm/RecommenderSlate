import { ReactiveComponent } from "@appbaseio/reactivesearch"
import React, { useCallback, useEffect, useState } from "react"
import { useDeepCompareEffect } from "use-deep-compare"
import { Checkbox, UL } from "../styles/Checkbox";
import IconGroup from "../styles/IconGroup";
import IconWrapper from "../styles/IconWrapper";
import Input from "../styles/Input";
import InputWrapper from "../styles/InputWrapper";
import SearchSvg from "../styles/SearchSvg";
import Title from "../styles/Title";

type CommonProps = {
  title: string
}

type Props = React.ComponentPropsWithoutRef<typeof ReactiveComponent> & CommonProps & {}

type Value = Array<string | number> | null;

export const KNNSort = (wrapperProps: Props) => {
  const [ localValue, setLocalValue ] = useState<Value>([]);

  return (
    <ReactiveComponent
      {...wrapperProps}
      filterLabel={wrapperProps.title}
      defaultValue={[]}
      defaultQuery={() => ({
        query: {
          terms: {
            id: localValue || []
          }
        }
      })}
      render={(props) => <KNNSortInner
        {...wrapperProps}
        {...props}
        setLocalValue={setLocalValue}
        localValue={localValue}
      />}
    />
  )
}

type InnerProps = CommonProps & {
  componentId: string;
  setLocalValue: (value: Value) => void;
  setQuery: (args: any) => void;
  data: any[],
  value: Value,
  localValue: Value,
}

const KNNSortInner = ({ setLocalValue, localValue, value, setQuery, data, ...props }: InnerProps) => {
  const [ input, setInput ] = useState<string>('')
  const loadedDocuments = data.map((item) => item._id);

  // Initialize value to default value (or one form url)
  useEffect(() => {
    setLocalValue(value)
  }, [])

  // Loaded documents are updates. Thus update the results query
  useDeepCompareEffect(() => {
    const topics = data.map((item) => item.topics);
    setQuery({
      query: (query) => loadedDocuments.length === 0 ? query : ({
        script_score: {
          query,
          script: {
            lang: "knn",
            source: "knn_score",
            params: {
              field: "topics",
              query_value: topics[0],
              space_type: "l2"
            }
          }
        }
      }),
      value: localValue
    })
  }, [ loadedDocuments ])

  const renderItem = useCallback(({ id, title }) => (
    <li key={id}>
      <Checkbox
        id={`${props.componentId}-${id}`}
        checked={true}
        onChange={() => setLocalValue((localValue || []).filter(item => item !== id))}/>
      <label htmlFor={`${props.componentId}-${id}`}>
        {title}
      </label>
    </li>
  ), [])

  const onSearch = useCallback(() => {
    if (input && parseInt(input)) setLocalValue([ ...(localValue || []), parseInt(input) ])
    setInput('');
  }, [ input ])

  const documentTitles = data.map(({ id, title }) => ({ id, title: `${id} - ${title}` }))

  return (<div>
    <Title>{props.title}</Title>
    <InputWrapper style={{
      margin: '0 0 8px',
    }}>
      <Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Add item to KNN"
        showIcon={true}
        iconPosition={'left'}
        aria-label={`${props.componentId}-search`}
      />
      <div>
        <IconGroup groupPosition="left" positionType="absolute">
          <IconWrapper onClick={onSearch}>
            <SearchSvg/>
          </IconWrapper>
        </IconGroup>
      </div>
    </InputWrapper>
    <UL role="listbox">
      {documentTitles.map(renderItem)}
    </UL>
  </div>)
}
