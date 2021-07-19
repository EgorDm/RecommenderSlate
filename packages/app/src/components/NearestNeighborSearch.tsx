import { ReactiveComponent } from "@appbaseio/reactivesearch"
import React from "react"

const TEST_VEC = [0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.18058678, 0.0009091 , 0.09537974, 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.11923589, 0.0009091 , 0.0009091 ,
  0.18300125, 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.09779127, 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.09443872, 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.14501966, 0.0009091 , 0.0009091 ,
  0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 , 0.0009091 ]

type Props = {}///

export const NearestNeighborSearch = (_test: Props) => {
  return (
    <ReactiveComponent
      componentId="nndocs"
      render={(props) => <TestAA {...props}/>}
      react={{
        and: [ 'title', 'languages', 'tags', 'artists', 'groups', 'num_pages' ],
      }}
    />
  )
}


export const TestAA = ({setQuery}) => {
  const [enable, setEnable] = React.useState<boolean>(false)

  React.useEffect(() => {
    setQuery({
      query: (query) => ({
        script_score: {
          query,
          script: {
            lang: "knn",
            source: "knn_score",
            params: {
              field: "topics",
              query_value: TEST_VEC,
              space_type: "l2"
            }
          }
        }
      }),
      value: enable
    })
  }, [enable])
  return (<div>
    <h1>Heloo</h1>
    <input
      id="test"
      name="test"
      type="checkbox"
      checked={enable}
      onChange={(value) => setEnable(!!value)} />
    <label>
      {'Hello world'}
    </label>
  </div>)
}
