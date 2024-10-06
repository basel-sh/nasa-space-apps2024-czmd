import json
# import pymysql
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

    # Base query to search for planets
    query = """SELECT hostname, ANY_VALUE(disc_year) AS disc_year, ANY_VALUE(sy_pnum) AS sy_pnum FROM defaultdb.planets GROUP BY hostname"""

    if hostname:
        query += "  having hostname like :hostname"
    # query+=' limit 250'
    # print(query)
    try:
        with engine.connect() as connection:
            if hostname:
                results = connection.execute(text(query), {'hostname': f"%{hostname}%"}).fetchall()
            else:
                results = connection.execute(text(query)).fetchall()

            # Convert the result to a list of dictionaries
            planets = [dict(row._mapping) for row in results]

            return {
                'statusCode': 200,
                'body': json.dumps(planets)
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

