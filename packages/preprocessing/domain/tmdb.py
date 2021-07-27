import pyspark.sql.functions as F
import pyspark.sql.types as T
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("data-prepare") \
    .config("spark.driver.memory", "5g") \
    .config("spark.executor.memory", "5g") \
    .config("spark.storage.memoryFraction", "0") \
    .config("spark.sql.execution.arrow.pyspark.enabled", "true") \
    .master('local[*]') \
    .getOrCreate()

# Constants
POSTER_URL = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
URL = 'https://www.themoviedb.org/%s/%d'

# Input dataset schema
schema_genres = T.ArrayType(T.StructType([
    T.StructField('id', T.IntegerType(), True),
    T.StructField('name', T.StringType(), True),
]))

schema_prod_companies = T.ArrayType(T.StructType([
    T.StructField('id', T.IntegerType(), True),
    T.StructField('name', T.StringType(), True),
]))

schema_keywords = T.ArrayType(T.StructType([
    T.StructField('id', T.IntegerType(), True),
    T.StructField('name', T.StringType(), True),
]))

schema_credits = T.StructType([
    T.StructField('cast', T.ArrayType(T.StructType([
        T.StructField('id', T.IntegerType()),
        T.StructField('name', T.StringType()),
        T.StructField('known_for_department', T.StringType()),
        T.StructField('popularity', T.FloatType()),
        T.StructField('order', T.IntegerType()),
    ])), True),
    T.StructField('crew', T.ArrayType(T.StructType([
        T.StructField('id', T.IntegerType()),
        T.StructField('name', T.StringType()),
        T.StructField('known_for_department', T.StringType()),
        T.StructField('department', T.StringType()),
        T.StructField('job', T.StringType()),
        T.StructField('popularity', T.FloatType()),
    ])), True),
])

schema_lists = T.StructType([
    T.StructField('results', T.ArrayType(T.StructType([
        T.StructField('id', T.IntegerType()),
        T.StructField('iso_639_1', T.StringType()),
        T.StructField('name', T.StringType()),
        T.StructField('item_count', T.IntegerType()),
    ])))
])

schema_movie = T.StructType([
    T.StructField('adult', T.BooleanType(), True),
    T.StructField('id', T.IntegerType(), True),
    T.StructField('imdb_id', T.StringType(), True),
    T.StructField('title', T.StringType(), True),
    T.StructField('original_title', T.StringType(), True),
    T.StructField('original_language', T.StringType(), True),
    T.StructField('overview', T.StringType(), True),
    T.StructField('release_date', T.DateType(), True),
    T.StructField('status', T.StringType(), True),
    T.StructField('poster_path', T.StringType(), True),

    T.StructField('popularity', T.FloatType(), True),
    T.StructField('vote_average', T.FloatType(), True),
    T.StructField('vote_count', T.IntegerType(), True),

    T.StructField('genres', schema_genres, True),
    T.StructField('production_companies', schema_prod_companies, True),
    T.StructField('credits', schema_credits, True),

    T.StructField('lists', schema_lists, True),
    T.StructField('keywords', T.StructType([
        T.StructField('keywords', schema_keywords, True)
    ]), True),
])

schema_serie = T.StructType([
    T.StructField('id', T.IntegerType(), True),
    T.StructField('imdb_id', T.StringType(), True),
    T.StructField('name', T.StringType(), True),
    T.StructField('original_name', T.StringType(), True),
    T.StructField('original_language', T.StringType(), True),
    T.StructField('overview', T.StringType(), True),
    T.StructField('first_air_date', T.DateType(), True),
    T.StructField('status', T.StringType(), True),
    T.StructField('type', T.StringType(), True),

    T.StructField('popularity', T.FloatType(), True),
    T.StructField('vote_average', T.FloatType(), True),
    T.StructField('vote_count', T.IntegerType(), True),

    T.StructField('seasons', T.ArrayType(T.StructType([
        T.StructField('adult', T.BooleanType(), True),
        T.StructField('id', T.IntegerType(), True),
        T.StructField('name', T.StringType(), True),
        T.StructField('season_number', T.IntegerType(), True),
        T.StructField('air_date', T.DateType(), True),
        T.StructField('episode_count', T.IntegerType(), True),
        T.StructField('poster_path', T.StringType(), True),
    ])), True),

    T.StructField('genres', schema_genres, True),
    T.StructField('production_companies', schema_prod_companies, True),
    T.StructField('credits', schema_credits, True),

    T.StructField('lists', schema_lists, True),
    T.StructField('keywords', T.StructType([
        T.StructField('results', schema_keywords, True)
    ]), True),
])

# Read the dataset
df_movie = (spark.read.json('./data/tmdb_raw/movie/*.json', schema=schema_movie)
    .filter('adult == false')
    .select([
        F.col('id'), F.col('imdb_id'),
        F.col('popularity'), F.col('vote_average'), F.col('vote_count'),
        F.lit('MOVIE').alias('document_type'),
        F.col('title'), F.col('original_language'), F.col('overview'),
        F.col('release_date').alias('release_date_start'),
        F.col('release_date').alias('release_date_end'),
        F.col('status'), F.lit('movie').alias('media_type'),
        F.format_string(f'{POSTER_URL}%s', F.col('poster_path')).alias('image'),
        F.format_string(URL, F.lit('movie'), F.col('id')).alias('url'),
        F.col('genres'), F.col('production_companies'), F.col('credits'),
        F.col('lists'), F.col('keywords.keywords').alias('keywords'),
    ]))

df_serie = (spark.read.json('./data/tmdb_raw/serie/*.json', schema=schema_serie).select([
    F.col('id'), F.col('imdb_id'),
    F.col('popularity'), F.col('vote_average'), F.col('vote_count'),
    F.lit('SERIE').alias('document_type'),
    F.col('name').alias('title'), F.col('original_language'), F.col('overview'),
    F.col('first_air_date').alias('release_date_start'),
    F.expr('''
        coalesce(array_max(transform(seasons, s -> s.air_date)),first_air_date)
    ''').alias('release_date_end'),
    F.col('status'), F.col('type').alias('media_type'),
    F.format_string(
        f'{POSTER_URL}%s',
        F.expr('element_at(transform(seasons, s -> s.poster_path), 1)')
    ).alias('image'),
    F.format_string(URL, F.lit('tv'), F.col('id')).alias('url'),

    F.col('genres'), F.col('production_companies'), F.col('credits'),
    F.col('lists'), F.col('keywords.results').alias('keywords'),
]))

df = (df_movie.union(df_serie).select([
    F.col('id'), F.col('imdb_id'), F.col('document_type'),
    F.col('popularity'), F.col('vote_average'), F.col('vote_count'),
    F.col('title'), F.col('original_language').alias('language'), F.col('overview'),
    F.col('release_date_start'), F.col('release_date_end'),
    F.col('status'), F.col('media_type'), F.col('image'),
    F.expr('transform(genres, x -> x.name)').alias('genres'),
    F.expr('transform(production_companies, x -> x.name)').alias('production_companies'),
    F.expr('transform(keywords, x -> x.name)').alias('keywords'),
    # F.expr('transform(lists.results, x -> x.name)').alias('lists'),
    F.expr('slice(transform(credits.cast, x -> x.name), 1, 7)').alias('top_actors'),
    F.expr('''
        slice(transform(filter(credits.crew, x -> x.job == "Director"), x -> x.name), 1, 5)
    ''').alias('directors'),
    F.expr('''
        slice(transform(filter(credits.crew, x -> x.job == "Producer"), x -> x.name), 1, 5)
    ''').alias('producers'),
    F.expr('''
        slice(transform(filter(credits.crew, x -> x.job == "Writer"), x -> x.name), 1, 5)
    ''').alias('writers'),
]).withColumn('terms', F.expr('''
    array_union(genres,
        array_union(production_companies, 
            array_union(keywords, 
                array_union(directors,
                    array_union(producers, writers))
            )
        )
    )
''')))

out_df = df.toPandas()
out_df.to_parquet('data/tmdb2.parquet')
