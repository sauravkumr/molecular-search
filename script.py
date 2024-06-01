from nomic import atlas
import pandas

import pickle as pkl
import pandas as pd
with open("description_df.pkl", "rb") as f:
    object = pkl.load(f)

df = pd.DataFrame(object)
print(len(df))
print(df.info())
dataset = atlas.map_data(data=df, indexed_field='description')
print(dataset)