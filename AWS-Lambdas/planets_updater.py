import pandas as pd
import math
from sqlalchemy import create_engine, text
import pandas as pd
import requests
from io import StringIO


# TODO Move These Values to Environment Variables - if there is a time
# Database connection details
user = 'avnadmin'
password = ''
host = ''
database = 'defaultdb'
port = ''

# Create a connection to the database
engine = create_engine(f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}')

selected_columns = [
    'pl_name', 'hostname', 'sy_snum', 'sy_pnum', 'discoverymethod', 'disc_year',
    'pl_orbper', 'pl_orbsmax', 'pl_rade', 'pl_bmasse', 'pl_eqt', 'st_spectype',
    'st_teff', 'st_rad', 'st_mass', 'sy_dist', 'snr_value', 'can_separate',
    'in_habitable_zone', 'suitable_radius', 'suitable_mass', 'suitable_temp',
    'potential_magnetic_field', 'is_habitable', 'sy_gaiamag'
]



# Function to check magnetic field potential
def potential_magnetic_field(planet_row):
    planet_mass = planet_row.get('pl_bmasse', math.nan)
    planet_radius = planet_row.get('pl_rade', math.nan)

    if not math.isnan(planet_mass) and not math.isnan(planet_radius):
        if 0.5 <= planet_mass <= 5.0 and 0.5 <= planet_radius <= 2.0:  # Example thresholds
            return True
    return None


# Function to check if the planet is in the habitable zone
def check_habitable_zone(semi_major_axis):
    habitable_zone_min = 0.95  # AU
    habitable_zone_max = 1.67  # AU
    if pd.isna(semi_major_axis):
        return None
    return habitable_zone_min <= semi_major_axis <= habitable_zone_max


# Function to check if the planet has a suitable radius
def check_planet_radius(planet_radius):
    min_radius = 0.5  # Earth radii
    max_radius = 1.5  # Earth radii
    if pd.isna(planet_radius):
        return None
    return min_radius <= planet_radius <= max_radius


# Function to check if the planet has a suitable mass
def check_planet_mass(planet_mass):
    min_mass = 0.5  # Earth masses
    max_mass = 5.0  # Earth masses
    if pd.isna(planet_mass):
        return None
    return min_mass <= planet_mass <= max_mass


# Function to check if the planet has a suitable temperature
def check_planet_temperature(planet_temp):
    min_temp = 200  # Kelvin
    max_temp = 350  # Kelvin
    if pd.isna(planet_temp):
        return None
    return min_temp <= planet_temp <= max_temp


# Function to calculate SNR
def calculate_snr(stellar_radius, planet_radius, telescope_diameter, planet_star_distance, system_distance):
    try:
        if pd.isna(stellar_radius) or pd.isna(planet_radius) or pd.isna(telescope_diameter) or pd.isna(
                planet_star_distance) or pd.isna(system_distance):
            return None
        SNR0 = 100  # Base SNR value from example
        SNR = SNR0 * ((stellar_radius * planet_radius * (telescope_diameter / 6)) /
                      ((system_distance / 10) * planet_star_distance)) ** 2
        return SNR if SNR > 0 else None
    except (TypeError, ZeroDivisionError):
        return None


# Function to check if an exoplanet can be separated from the star
def can_separate_planet(telescope_diameter, planet_star_distance, system_distance):
    try:
        if pd.isna(telescope_diameter) or pd.isna(planet_star_distance) or pd.isna(system_distance):
            return None
        ESmax = 15 * (telescope_diameter / 6) / planet_star_distance
        return system_distance <= ESmax
    except (TypeError, ZeroDivisionError):
        return None

def fetch_and_save_exoplanet_data():
    url = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/IceTable/nph-iceTblDownload"

    payload = 'workspace=2024.09.22_14.28.07_016966%2FTblView%2F2024.10.02_07.25.26_031038&useTimestamp=1&table=%2Fexodata%2Fkvmexoweb%2FExoTables%2FPSCompPars.tbl&format=CSV&user=&label=*&columns=all&rows=all&mission=ExoplanetArchive'
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'ar,ar-EG;q=0.9,en-GB;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5,en-US;q=0.4,de;q=0.3',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'ISIS=2024.09.22_14.28.07_016966',
        'Origin': 'https://exoplanetarchive.ipac.caltech.edu',
        'Pragma': 'no-cache',
        'Referer': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code == 200:
        # Use content as a CSV data
        content_type = response.headers.get('Content-Type')
        if 'csv' in content_type.lower():
            csv_data = StringIO(response.text.split('\n#')[-1].strip())  # Skip the first line
            df = pd.read_csv(csv_data)  # Skip bad lines
            return df
        else:
            print("Response is not in CSV format.")
            return None
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        return None



def calculate_hz_score(stellar_luminosity, orbital_distance):
    """"""
    ri = math.sqrt(stellar_luminosity / 1.1)
    ro = math.sqrt(stellar_luminosity / 0.53)
    hzd = (2 * orbital_distance - (ri + ro)) / (ro - ri)
    return hzd

# Lambda function to read CSV and determine habitability
def lambda_handler(event, context):
    # Load the CSV file into a Pandas DataFrame
    # df = fetch_and_save_exoplanet_data()
    df = pd.read_csv('../Planets_Data.csv_new.csv')
    print("Data loaded successfully.")
    # Default telescope diameter (can be parameterized)
    telescope_diameter = 6
    conditions = ['snr_value', 'can_separate', 'in_habitable_zone', 'suitable_radius',
                  'suitable_mass', 'suitable_temp', 'is_habitable',
                  'potential_magnetic_field',
                  ]

    df[conditions] = None
    print("Calculating habitability conditions...")
    # Loop through each row and calculate each condition
    for idx, row in df.iterrows():
        stellar_radius = row['st_rad']  # Stellar radius in Rsun
        planet_radius = row['pl_rade']  # Planet radius in REarth
        planet_star_distance = row['pl_orbsmax']  # Planet-star distance in AU
        system_distance = row['sy_dist']  # Distance to a system in parsecs
        planet_mass = row['pl_bmasse']
        planet_temp = row['pl_eqt']

        # Calculate SNR
        snr = calculate_snr(stellar_radius, planet_radius, telescope_diameter, planet_star_distance, system_distance)
        df.at[idx, 'snr_value'] = snr

        # Check if planet and star can be separated
        separable = can_separate_planet(telescope_diameter, planet_star_distance, system_distance)
        df.at[idx, 'can_separate'] = separable

        # Check individual habitability conditions
        df.at[idx, 'in_habitable_zone'] = check_habitable_zone(planet_star_distance)
        df.at[idx, 'suitable_radius'] = check_planet_radius(planet_radius)
        df.at[idx, 'suitable_mass'] = check_planet_mass(planet_mass)
        df.at[idx, 'suitable_temp'] = check_planet_temperature(planet_temp)
        df.at[idx, 'potential_magnetic_field'] = potential_magnetic_field(row)
        # df.at[idx, 'hz_score'] = calculate_hz_score(row['st_lum'], row['pl_orbsmax'])
        df.at[idx, 'potential_magnetic_field'] = potential_magnetic_field(row)

        # # Final habitability check
        # df.at[idx, 'is_habitable'] = check_habitability(row)
    print("Habitability conditions calculated successfully.")
    df = df[selected_columns].copy()
    # output_path = 'updated_planets.csv'
    # df.to_csv(output_path, index=False)
    # Save the DataFrame to a table named 'your_table'
    with engine.begin() as connection:
        # Step 1: Delete all rows
        connection.execute(text("DELETE FROM planets"))

        # Step 2: Append new records
        df.to_sql('planets', con=connection, if_exists='append', index=False)

    print("Data saved to MySQL database successfully.")
    return {
        'statusCode': 200,
        'body': 'Analysis complete',
        # 'file_path': output_path
    }


if __name__ == '__main__':
    print(lambda_handler({}, None))
