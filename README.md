<!-- markdownlint-disable -->
<div align="center">
    <h1>RecommendSlate</h1>
    <p>
        <b>End-to-end recommender system, with easy deployment and recommendation engine changes in mind. </b>
    </p>
    <br/>
</div>
<!-- markdownlint-enable -->

## Preview
![](https://github.com/EgorDm/RecommenderSlate/blob/master/assets/demo.png?raw=true)

## Features
* Out of the box document embedding based on clustering
* Document indexing inside elasticsearch
* Flexible schema language and generation for ui building
* (Aggregated) Nearest Neighbor  based search
* Functional UI interface
* Movie database data fetching and indexing
* Large dataset support using a spark processing pipeline

## Usage
First, ensure that you have a running instance of elasticsearch or start it using docker compose

```shell
dc -f docker-compose.yml
```

## Building an index
First you need to build your data index. This is done by first fetching your dataset/data (in this case [tmdb](https://www.themoviedb.org/)) 
```shell
python packages/preprocessing/domain/tmdb.py
```

Then the data needs to be preprocessed to include the embedding vectors.
The default preprocessing script trains an LDA model to learn the embeddings based on clustering.

```shell
python packages/preprocessing/preprocess.py \
  --input_dataset data/tmdb \ 
  --output_model data/tmdb_procesed \
  --n_topics 20 \
  --n_iters 3000
```

Finally, the index can be built and pushed to elasticsearch using the import script.
The ui schema is saved in `packages/preprocessing/domain/tmdb_schema.json`, modify it if needed and
run the script again.

```shell
python packages/preprocessing/import.py \
  --input_dataset data/tmdb_procesed \ 
  --input_model data/tmdb \
  --index_name tmdb
```

## Building the UI
You launch the UI by either starting it in a docker container:

```shell
dc -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Or you can launch it by building it yourself:

```shell
yarn install
yarn watch
```


