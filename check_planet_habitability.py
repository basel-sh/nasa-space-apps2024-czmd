import pandas as pd
import math


# Function to check rotation and orbit conditions
def has_rotation_and_orbit(planet_row):
    rotation_period = planet_row.get('pl_rotp', math.nan)
    orbital_period = planet_row.get('pl_orbper', math.nan)

    if not math.isnan(rotation_period) and not math.isnan(orbital_period):
        return True
    return "Not Available From Source"


# Function to check magnetic field potential
def potential_magnetic_field(planet_row):
    planet_mass = planet_row.get('pl_masse', math.nan)
    planet_radius = planet_row.get('pl_rade', math.nan)

    if not math.isnan(planet_mass) and not math.isnan(planet_radius):
        if 0.5 <= planet_mass <= 5.0 and 0.5 <= planet_radius <= 2.0:  # Example thresholds
            return True
    return "Not Available From Source"


# Function to check atmosphere suitability
def has_suitable_atmosphere(planet_row):
    atmosphere_composition = planet_row.get('pl_atmosphere', math.nan)  # Assuming this field exists

    if atmosphere_composition is not math.nan and any(gas in atmosphere_composition for gas in ['Oxygen', 'Ozone']):
        return True
    return "Not Available From Source"


# Function to check if the planet is in the habitable zone
def check_habitable_zone(semi_major_axis):
    habitable_zone_min = 0.95  # AU
    habitable_zone_max = 1.67  # AU
    if pd.isna(semi_major_axis):
        return "Not Available From Source"
    return habitable_zone_min <= semi_major_axis <= habitable_zone_max


# Function to check if the planet has a suitable radius
def check_planet_radius(planet_radius):
    min_radius = 0.5  # Earth radii
    max_radius = 1.5  # Earth radii
    if pd.isna(planet_radius):
        return "Not Available From Source"
    return min_radius <= planet_radius <= max_radius


# Function to check if the planet has a suitable mass
def check_planet_mass(planet_mass):
    min_mass = 0.5  # Earth masses
    max_mass = 5.0  # Earth masses
    if pd.isna(planet_mass):
        return "Not Available From Source"
    return min_mass <= planet_mass <= max_mass


# Function to check if the planet has a suitable temperature
def check_planet_temperature(planet_temp):
    min_temp = 200  # Kelvin
    max_temp = 350  # Kelvin
    if pd.isna(planet_temp):
        return "Not Available From Source"
    return min_temp <= planet_temp <= max_temp


# Function to check the habitability based on all criteria
def check_habitability(row):
    zone_check = check_habitable_zone(row['pl_orbsmax'])
    radius_check = check_planet_radius(row['pl_rade'])
    mass_check = check_planet_mass(row['pl_masse'])
    temp_check = check_planet_temperature(row['pl_eqt'])

    # If all conditions are True, then the planet is habitable
    if all([zone_check is True, radius_check is True, mass_check is True, temp_check is True]):
        return True
    return False


# Function to calculate SNR
def calculate_snr(stellar_radius, planet_radius, telescope_diameter, planet_star_distance, system_distance):
    try:
        if pd.isna(stellar_radius) or pd.isna(planet_radius) or pd.isna(telescope_diameter) or pd.isna(
                planet_star_distance) or pd.isna(system_distance):
            return "Not Available From Source"
        SNR0 = 100  # Base SNR value from example
        SNR = SNR0 * ((stellar_radius * planet_radius * (telescope_diameter / 6)) /
                      ((system_distance / 10) * planet_star_distance)) ** 2
        return SNR if SNR > 0 else "Not Available From Source"
    except (TypeError, ZeroDivisionError):
        return "Not Available From Source"


# Function to check if an exoplanet can be separated from the star
def can_separate_planet(telescope_diameter, planet_star_distance, system_distance):
    try:
        if pd.isna(telescope_diameter) or pd.isna(planet_star_distance) or pd.isna(system_distance):
            return "Not Available From Source"
        ESmax = 15 * (telescope_diameter / 6) / planet_star_distance
        return system_distance <= ESmax
    except (TypeError, ZeroDivisionError):
        return "Not Available From Source"


# Lambda function to read CSV and determine habitability
def lambda_handler(event, context):
    # Assume the CSV file is passed in event
    # file_path = event['file_path']

    # Load the CSV file into a Pandas DataFrame
    df = pd.read_csv('PS_2024.09.22_15.00.47_NEW.csv')

    # Default telescope diameter (can be parameterized)
    telescope_diameter = 6

    # Add new columns for each condition
    df['snr_value'] = "Not Available From Source"
    df['can_separate'] = "Not Available From Source"
    df['in_habitable_zone'] = "Not Available From Source"
    df['suitable_radius'] = "Not Available From Source"
    df['suitable_mass'] = "Not Available From Source"
    df['suitable_temp'] = "Not Available From Source"
    df['is_habitable'] = "Not Available From Source"

    # Loop through each row and calculate each condition
    for idx, row in df.iterrows():
        stellar_radius = row['st_rad']  # Stellar radius in Rsun
        planet_radius = row['pl_rade']  # Planet radius in REarth
        planet_star_distance = row['pl_orbsmax']  # Planet-star distance in AU
        system_distance = row['sy_dist']  # Distance to system in parsecs
        planet_mass = row['pl_masse']
        planet_temp = row['pl_eqt']

        # Calculate SNR
        snr = calculate_snr(stellar_radius, planet_radius, telescope_diameter, planet_star_distance, system_distance)
        df.at[idx, 'snr_value'] = snr if snr != "Not Available From Source" else snr

        # Check if planet and star can be separated
        separable = can_separate_planet(telescope_diameter, planet_star_distance, system_distance)
        df.at[
            idx, 'can_separate'] = separable if separable != "Not Available From Source" else "Not Available From Source"

        # Check individual habitability conditions
        df.at[idx, 'in_habitable_zone'] = check_habitable_zone(planet_star_distance)
        df.at[idx, 'suitable_radius'] = check_planet_radius(planet_radius)
        df.at[idx, 'suitable_mass'] = check_planet_mass(planet_mass)
        df.at[idx, 'suitable_temp'] = check_planet_temperature(planet_temp)
        df.at[idx, 'potential_magnetic_field'] = potential_magnetic_field(row)
        df.at[idx, 'has_rotation_and_orbit'] = has_rotation_and_orbit(row)
        df.at[idx, 'has_suitable_atmosphere'] = has_suitable_atmosphere(row)
        # Final habitability check
        df.at[idx, 'is_habitable'] = check_habitability(row)

    # Save the updated DataFrame back to CSV (if needed)
    output_path = 'updated_planets.csv'
    df.to_csv(output_path, index=False)

    return {
        'statusCode': 200,
        'body': 'Analysis complete',
        'file_path': output_path
    }



if __name__ == '__main__':
    print(lambda_handler({}, None))