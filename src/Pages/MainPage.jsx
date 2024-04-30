import "./mainPage.css";
import SearchIcon from "../Assets/search.svg";
import Character from "../Assets/character.svg";
import DownArrow from "../Assets/downArrow.svg";
import EditIcon from "../Assets/edit.svg";
import DeleteIcon from "../Assets/delete.svg";

import { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
    const [data, setData] = useState([]);
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('celebrities.json')
          .then(response => {
            setData(response.data);
            // console.log(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const toggleCard = (id) => {
        setExpandedCardId(prevId => (prevId === id ? null : id));
    };

    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const currentDate = new Date();
        const ageInMillis = currentDate - dobDate;
        const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25));
        return ageInYears;
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
          const updatedData = data.filter(item => item.id !== id);
          setData(updatedData);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.last.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="mainPage">
            <div className="searchContainer">
                <div className="searchBar">
                    <img src={SearchIcon} alt="Search Icon" />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search User"
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>
            </div>

            <div className="dispContainer">
                {filteredData.map(item => (
                    <div key={item.id} className={`card ${expandedCardId === item.id ? 'expanded' : ''}`}>
                        <div className="top">
                            <img className="character" src={Character} alt="Character Icon" />
                            <h3>{item.first + " " + item.last}</h3>
                            <button onClick={() => toggleCard(item.id)}>
                                <img className="downarrow" src={DownArrow} alt="Down Arrow Icon" />
                            </button>
                        </div>
                        {expandedCardId === item.id &&
                            <div className="bottom">
                                <div className="b1">
                                    <div className="age">
                                        <h4 className="title">Age</h4>
                                        <h4 className="ans">{calculateAge(item.dob)}</h4>
                                    </div>
                                    <div className="gender">
                                        <h4 className="title">Gender</h4>
                                        <h4 className="ans">{item.gender}</h4>
                                    </div>
                                    <div className="country">
                                        <h4 className="title">Country</h4>
                                        <h4 className="ans">{item.country}</h4>
                                    </div>
                                </div>
                                <div className="b2">
                                    <h4 className="title">Description</h4>
                                    <h4 className="ans">{item.description}</h4>
                                </div>
                                <div className="b3">
                                    <button className="deleteBtn" onClick={() => handleDelete(item.id)}><img src={DeleteIcon} alt="Delete Icon" /></button>
                                    <button className="editBtn"><img src={EditIcon} alt="Edit Icon" /></button>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
