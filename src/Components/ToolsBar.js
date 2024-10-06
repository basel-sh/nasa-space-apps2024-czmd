import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useFetchData } from '../DataMain'; // Import the function that fetches the data

export var EARTHYEAR =  2 * Math.PI * ( 1/ 3000 );
export var EARTHDAY = 2 * Math.PI * ( 1/ 3000 );
export var IndexOfSystem;
export var SpeedOrbitalRot;

export default function ToolsBar() {
  const [Statues1, setStatues1] = useState(`block`);
  const [Statues2, setStatues2] = useState(`none`);
  const [PauseD, setPauseD] = useState(false);
  const [PauseY, setPauseY] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [SpeedOrbitalRot2,setSpeedOrbitalRot2] = useState(3.5);
  SpeedOrbitalRot = SpeedOrbitalRot2
  // Fetch Data
  const Data = useFetchData() || []; // Handle case where Data is undefined

  useEffect(() => {
    if (Data.length > 0) {
      // Add original index to the filtered systems
      setFilteredData(Data.map((system, originalIndex) => ({ ...system, originalIndex })));
      setLoading(false); // Set loading to false when data is fetched
    }
  }, [Data]);

  // Pause, Time
  function SetPauseToggleY() {
    setPauseY(!PauseY);
  }
  if (PauseY) {
    EARTHYEAR = 0;
  } else {
    EARTHYEAR = 2 * Math.PI * (1 / 144) * (1 / 60) * 10;
  }
  function IncreaseOrbitalSPeed(){
    setSpeedOrbitalRot2(SpeedOrbitalRot + 0.5);
  }
  function DecreaseOrbitalSPeed(){
    setSpeedOrbitalRot2(SpeedOrbitalRot - 0.5);
  }
  function SetPauseToggleD() {
    setPauseD(!PauseD);
  }
  if (PauseD) {
    EARTHDAY = 0;
  } else {
    EARTHDAY = 2 * Math.PI * (1 / 144) * (1 / 60) * 5;
  }

  // Handle row click
  const handleRowClick = (originalIndex) => {
    IndexOfSystem = originalIndex;
    window.location.href = '/dashboard/StarSystemRendering'; // Relative to domain
    localStorage.setItem("IndexOfSystem", IndexOfSystem); // Save IndexOfSystem to local storage
    console.log(IndexOfSystem);
  };

  // Searching
  const Search = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchInput(searchValue);

    const filteredSystems = (Data || []).map((system, originalIndex) => ({ ...system, originalIndex }))
      .filter((system) =>
        system.hostname.toLowerCase().includes(searchValue)
      );
    setFilteredData(filteredSystems);
  };

  // Changing the Tools Bar
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/dashboard/StarSystemRendering") {
      setStatues1("none");
      setStatues2("");
    }
  }, [location]);
  // Returning Btn
  function returning() {
    
  }
  return (
    <div className="ToolsBar">
      <div style={{ display: `${Statues1}` }} className="MainSearchingDiv">
        <h1 className="SearchTitle">Use the Search bar to explore the known systems</h1>
        <div className="searchiandbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input onChange={Search} value={searchInput} className="SearchBar" placeholder="Search by system name..." />
        </div>
        <div className="SearchingOutputs">
          {loading ? (
            <div className="Loadingdiv">Loading data, please wait... </div> // Show loading message when data is being fetched
          ) : (
            <table>
              <thead>
                <tr>
                  <th className="idth">id</th>
                  <th>Host Name</th>
                  <th>No. of Planets</th>
                  <th>Date of Discover</th>
                </tr>
              </thead>
              <tbody id="Tbody">
                {filteredData.map((system) => (
                  <tr className="outputline" key={`${system.originalIndex}-${system.hostname}`} onClick={() => handleRowClick(system.originalIndex)}>
                    <th className="idth">{system.originalIndex + 1 || "N/A"}</th>
                    <th>{system.hostname}</th>
                    <th>{system.sy_pnum}</th>
                    <th>{system.disc_year}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Second DIV */}
      <div style={{ display: `${Statues2}` }} className="ToolsBtns">
        <div className="PauBTNSSS">
          <button className="PoseBtn" onClick={SetPauseToggleY}>Pause Year Rotation</button>
          <button className="PoseBtn" onClick={SetPauseToggleD}>Pause Day Rotation</button>
        </div>

        <div className="DayYearnotation">
          {!PauseY && (<p style={{ color: "white", fontSize: `15px`, marginBottom: `5px` }}>Year Rotation : <i className="fa-solid fa-check"></i></p>)}
          {PauseY && (<p style={{ color: "white", fontSize: `15px`, marginBottom: `5px` }}>Year Rotation : <i className="fa-solid fa-x"></i></p>)}
          {!PauseD && (<p style={{ color: "white", fontSize: `15px`, marginBottom: `5px` }}>Day Rotation : <i className="fa-solid fa-check"></i></p>)}
          {PauseD && (<p style={{ color: "white", fontSize: `15px`, marginBottom: `5px` }}>Day Rotation : <i className="fa-solid fa-x"></i></p>)}
        </div>
        <div className="changespeeddiv">
          <button className="changespeed" onClick={IncreaseOrbitalSPeed}>Increase Orbital Speed</button>
          <button className="changespeed" onClick={DecreaseOrbitalSPeed}>Decrease Orbital Speed</button>
        </div>
        <div className="OrbitalSpeed">
          The orbital Speed is {SpeedOrbitalRot}
        </div>
        <div className="BackBtndiv">
          <button onClick={() => { window.location.href = "/dashboard"; }} className="BackBtn">Return Back to find another System</button>
        </div>
      </div>
    </div>
    
  );
}
