"""Used to get all the information about a planet given the hostname"""

import json
from sqlalchemy import create_engine, text

# Database connection details
user = 'avnadmin'
password = 'AVNS_pI1ZxY33VYVDFuvMAoQ'
host = 'mysql-1d8c254f-czmd-db.l.aivencloud.com'
database = 'defaultdb'
port = '25246'

# Create a connection to the database
engine = create_engine(f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}')

def lambda_handler(event, context):
    # Get the 'hostname' parameter from the query string, if provided
    hostname = event.get('queryStringParameters', {}).get('hostname')
    if not hostname:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': "you didn't add hostname"})
        }

    # Base query to search for planets
    query = """SELECT * FROM defaultdb.planets where hostname = :hostname"""

    try:
        with engine.connect() as connection:
            results = connection.execute(text(query), {'hostname': hostname}).fetchall()
            # Convert the result to a list of dictionaries
            planets = [dict(row._mapping) for row in results]
            # planets = []
            sy_snum = planets[0]['sy_snum']
            sy_pnum = planets[0]['sy_pnum']
            st_rad = planets[0]['st_rad']
            data = {'planets':planets, 'hostname':hostname , 'sy_snum':sy_snum, 'sy_pnum':sy_pnum, 'st_rad':st_rad }
            # for row in results:
            #     row = dict(row._mapping)
            #     planets.appened(row)

            return {
                'statusCode': 200,
                'body': json.dumps(data)
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

