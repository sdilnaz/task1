import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ category }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${category}`);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${category}/search?keyword=${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error(`Error searching in ${category}:`, error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px' }}>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Catalog</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <input
            id="searchInput"
            className="form-control me-2"
            type="text"
            placeholder={`Search ${category}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button id="search" className="btn btn-outline-success" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.map((item, index) => (
          <div key={index} className="row-container" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className="card mb-3 mx-3" style={{ width: '265px', display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ minHeight: '100px', flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
                <h6 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                  {item.name}
                </h6>
                {category === 'planets' && (
                  <>
                    <p><strong>Climate:</strong> {item.climate}</p>
                    <p><strong>Terrain:</strong> {item.terrain}</p>
                    <p><strong>Population:</strong> {item.population}</p>
                  </>
                )}
                {category === 'people' && (
                  <>
                    <p><strong>Height:</strong> {item.height}</p>
                    <p><strong>Mass:</strong> {item.mass}</p>
                    <p><strong>Hair Color:</strong> {item.hair_color}</p>
                    <p><strong>Skin Color:</strong> {item.skin_color}</p>
                    <p><strong>Eye Color:</strong> {item.eye_color}</p>
                    <p><strong>Birth Year:</strong> {item.birth_year}</p>
                    <p><strong>Gender:</strong> {item.gender}</p>
                  </>
                )}
                {category === 'starships' && (
                  <>
                    <p><strong>Model:</strong> {item.model}</p>
                    <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
                    <p><strong>Cost in Credits:</strong> {item.cost_in_credits}</p>
                    <p><strong>Length:</strong> {item.length}</p>
                    <p><strong>Max Speed:</strong> {item.max_atmosphering_speed}</p>
                    <p><strong>Crew:</strong> {item.crew}</p>
                    <p><strong>Passengers:</strong> {item.passengers}</p>
                    <p><strong>Cargo Capacity:</strong> {item.cargo_capacity}</p>
                  </>
                )}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

