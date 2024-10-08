# Exoplanet Detection and Habitability Assessment System

## Project Overview

This project is designed to help researchers and users analyze and assess the habitability of exoplanets. It processes data from NASA's Exoplanet Archive to evaluate various conditions of planets in different star systems. The project performs habitability checks by calculating parameters like planetary radius, mass, temperature, and proximity to the habitable zone, among other factors. It also fetches real-time data from NASA’s archive and updates the database daily using AWS Lambda functions to keep the information current.

### Key Features:
- Real-time data fetching from NASA’s Exoplanet Archive.
- Daily updates to the exoplanet database using AWS Lambda.
- Habitability analysis of exoplanets based on various conditions.
- Simple API for retrieving data based on planet names or criteria.
- Hosted on Vercel using Serverless Functions.

## How It Works

1. **Daily Data Update**: 
   The project uses an AWS Lambda function that fetches the latest data from NASA’s Exoplanet Archive daily. This ensures that the information on exoplanets in the database is always up-to-date.

2. **Data Processing & Habitability Checks**: 
   The system evaluates various conditions, including:
   - **Magnetic Field Potential**: Evaluates the planet’s mass and radius to determine if it has a likely magnetic field.
   - **Habitable Zone Check**: Verifies whether the planet is within a certain distance from its star to allow liquid water (0.95 AU to 1.67 AU).
   - **Planet Radius**: Checks if the radius is within a suitable range for habitability (0.5 to 1.5 Earth radii).
   - **Planet Mass**: Verifies whether the planet’s mass is within a suitable range (0.5 to 5.0 Earth masses).
   - **Planet Temperature**: Ensures the planet’s temperature is between 200K and 350K (Kelvin) for potential habitability.

3. **Exoplanet Separation Calculation**: 
   The project also calculates the likelihood of detecting and separating the planet from its star, using a value called **SNR** (Signal-to-Noise Ratio).

4. **API for Data Retrieval**: 
   The system provides endpoints for users to search for exoplanets by name or retrieve all exoplanets from the database.


### 🌐 Our Team Page on NASA Space Apps:
#### https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/czmd/

### 🚀 Our Website (MVP developed in less than 48 working hours):
#### https://nasa-space-apps2024-czmd.vercel.app/

### 💻 GitHub Repository:
#### https://github.com/basel-sh/nasa-space-apps2024-czmd

### 🎥 Project Explanation Video:
#### https://drive.google.com/file/d/1y9-xK2YMi6njxh7IWc9zcVv6nnGlr8pn/view



## Tools and Technologies

### Backend (Python):
- **AWS Lambda**: Used for daily updates of the exoplanet database.
- **Pandas**: For processing and managing large data sets from the NASA Exoplanet Archive.
- **SQLAlchemy**: For interacting with the MySQL database.
- **MySQL Database**: Hosted on Aiven (Free Plan) to store exoplanet data.

### Frontend (JavaScript):
- **React.js**: Used to build the user interface.
- **THREE.js**: For rendering 3D visualizations of star systems and exoplanets.

### Hosting and Infrastructure:
- **Vercel**: Hosting the frontend and backend (serverless functions) for free.
- **Serverless Functions (AWS Lambda)**: Handling API requests and database updates.
- **MySQL (Aiven)**: Storing exoplanet data for quick retrieval.

## Installation & Setup

### Requirements:
- Python 3.8+
- MySQL Database
- AWS Account (For Lambda functions)
- React.js (for frontend)
- Node.js (for serverless functions)

### Steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-repo/exoplanet-detection.git
   cd exoplanet-detection
   ```

2. **Backend Setup**:
   - Install Python dependencies:
     ```bash
     pip install pandas sqlalchemy pymysql requests
     ```
   - Configure your MySQL database in the `database_config.py` file.
   - Deploy the AWS Lambda function for daily updates (instructions in the `lambda_setup.md` file).

3. **Frontend Setup**:
   - Install Node.js dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

5. **Daily Updates**:
   - Set up the AWS Lambda function to run daily for automatic updates of the exoplanet database.

## Conditions Evaluated

1. **Magnetic Field Potential**: Evaluates if a planet has the right mass and radius to potentially generate a magnetic field.
2. **Habitable Zone**: Checks if the planet is located in a region where liquid water could exist.
3. **Suitable Radius**: Ensures the planet has a radius suitable for habitability.
4. **Suitable Mass**: Verifies if the planet’s mass is within a suitable range for habitability.
5. **Suitable Temperature**: Confirms if the planet’s surface temperature could support life.
6. **SNR (Signal-to-Noise Ratio)**: Calculates the likelihood of detecting the planet.
7. **Planet Separation**: Determines if the planet can be separated from the star in images based on its distance and the telescope’s capabilities.

## Benefits

- **Real-time Data**: Always up-to-date exoplanet data fetched from NASA's archive.
- **Simple UI**: Users can search for exoplanets and visualize their data through an interactive 3D interface.
- **Detailed Habitability Analysis**: The system evaluates planets based on scientific criteria, helping researchers and space enthusiasts.

## Future Enhancements

- **Atmospheric Data**: Integration with external APIs to assess planetary atmospheres.
- **Enhanced Visualizations**: Further improvements to 3D visualization using THREE.js.
- **Machine Learning**: Implement machine learning models to predict habitability based on historical data trends.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

### **Contributors:**
- [Ahmed Ellaban](https://www.linkedin.com/in/ahmed-samy-ellaban/)
- [Basel Shreif](https://www.linkedin.com/in/basel-shrief/)
- [Ali Khedr](https://www.linkedin.com/in/ali-khedr-773087205/)
- [Nour Wael](https://www.linkedin.com/in/nour-wael-3b359a2b3/)
- [Aya Mohamed](https://www.linkedin.com/in/aya-mohamed-samir-5780a9267)
- [Farah Elhebeishy](https://www.linkedin.com/in/farah-elhebeishy-46146632a/)



### **وَسَلَامٌ عَلَى الْمُرْسَلِينَ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ** 
### **Peace be upon the messengers, and all praise is due to Allah, the Lord of the worlds.**

