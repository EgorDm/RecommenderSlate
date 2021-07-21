import { ReactiveComponent } from "@appbaseio/reactivesearch"
import React, { useCallback, useEffect, useState } from "react"
import { useDeepCompareEffect } from "use-deep-compare"
import { useReduxAction, useReduxState } from "../../hooks";
import { KNNActions, selectKnnQueue } from "../../store";
import Title from "../Title";
import {mean, divide, norm} from 'mathjs'
import Search from "../inputs/Search";
import Checkbox from "../inputs/Checkbox";
import UL from "../layouts/UL";

type CommonProps = {
  title: string
  innerClass?: {
    title?: string;
  }
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

const KNNSortInner = ({
  setLocalValue, localValue, value,
  setQuery, data,
  innerClass={}, ...props
}: InnerProps) => {
  const loadedDocuments = data.map((item) => item._id);

  const setValue = useCallback((value) => {
    setLocalValue(value)
    setQuery({value})
  }, [])

  // Initialize value to default value (or one form url)
  useDeepCompareEffect(() => {
    setValue(value)
  }, [value])

  // Added items from the global queue
  const clearKnnQueue = useReduxAction(KNNActions.clearQueue);
  const queue = useReduxState(selectKnnQueue);
  useDeepCompareEffect(() => {
    if(queue.length > 0) {
      setValue([...(value || []), ...queue]);
      clearKnnQueue();
    }
  }, [queue])

  // Loaded documents are updates. Thus update the results query
  useDeepCompareEffect(() => {
    const topics = data.map((item) => item.topics);
    const topic = topics.length > 0 ? divide(mean(topics, 0), norm(mean(topics, 0), 2)) : null;
    setQuery({
      query: (query) => loadedDocuments.length === 0 ? query : ({
        script_score: {
          query,
          script: {
            lang: "knn",
            source: "knn_score",
            params: {
              field: "topics",
              query_value: topic,
              space_type: "l2"
            }
          }
        }
      }),
      value: value
    })
  }, [ loadedDocuments ])

  const renderItem = useCallback(({ id, title }) => (
    <li key={id}>
      <Checkbox
        id={`${props.componentId}-${id}`}
        checked={true}
        onChange={() => setValue((value || []).filter(item => item !== id))}/>
      <label htmlFor={`${props.componentId}-${id}`}>
        {title}
      </label>
    </li>
  ), [value])

  const onSearch = useCallback((input) => {
    if (input && parseInt(input)) setValue([ ...(value || []), parseInt(input) ])
  }, [])

  const documentTitles = data.map(({ id, title }) => ({ id, title: `${id} - ${title}` }))

  return (<div>
    <Title className={innerClass.title}>{props.title}</Title>
    <Search
      placeholder="Add item to KNN"
      onSearch={onSearch} />

    <UL role="listbox">
      {documentTitles.map(renderItem)}
    </UL>
  </div>)
}
