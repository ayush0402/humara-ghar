import json
import pickle
import numpy as np
import sklearn

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location,sqft,bath,bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index =-1
    x= np.zeros(len(__data_columns))
    x[0]= bhk
    x[1]= sqft
    x[2]= bath
    if loc_index >=0:
        x[loc_index]=1

    return round(__model.predict([x])[0],2)

def get_location_name():
    return __locations

def load_saved_artifacts():
    print("loading saved artifacts... start")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json",'r') as f:
       __data_columns= json.load(f)['data_columns']
       __locations = __data_columns[3:]

    global __model
    with open("./artifacts/rent_prices_model_1.pickle",'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts...done")

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_name())
    print(get_estimated_price('Adambakkam',1200,2,3))
