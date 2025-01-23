import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";
import CardDisplay from './components/CardDisplay';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddPetCard from './components/AddPetCard';
import SearchBar from './components/SearchBar';
import homedogs from './assets/homedogs.jpg';
import SlideShow from './components/SlideShow';
import slideShowData from './data/slideShowData.json';
import VolunteerForm from './components/VolunteerForm';

function App() {
  const [petsList, setPetsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //// Create state for search query
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchItems, setSearchItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  //
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchPetsList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/pets/');
        setPetsList(response.data);
        // setSearchItems(response.data); // add this here?
      } catch (err) {
        console.log('Error');
      }
    }

    fetchPetsList();

  }, []);

  //// Delete pet by id 
  const handleDeletePet = async (id) => {
    console.log('Delete button clicked for id', id);
    await axios.delete(`http://localhost:8000/pets/${id}`)
      .then(() => {
        setPetsList((petsList) => petsList.filter((pet) => pet.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //// PATCH request (No PATCH in backend)
  // const handleUpdatePet = async (id, updatedData) => {
  //   try {
  //     await axios.patch(`http://localhost:8000/pets/${id}`, {description: updatedData});
  //     setPetsList(petsList.map(pet =>
  //       pet.id === id ? { ...pet, description: updatedData } : pet
  //     ));
  //   } catch (error) {
  //     console.error('Error updating pet description:', error);
  //   }
  // };
  ////

  //// PUT request (Updating entire pet object)
  const handleUpdatePet = async (id, updatedData) => {
    try {
      const petToUpdate = petsList.find(pet => pet.id === id);
      const updatedPet = { ...petToUpdate, description: updatedData };

      await axios.put(`http://localhost:8000/pets/${id}`, updatedPet);
      setPetsList(petsList.map(pet => pet.id === id ? updatedPet : pet
      ));
    } catch (error) {
      console.error('Error updating pet details:', error);
    }
  };

  // ///// Filter items based on search term
  // useEffect(() => {
  //   const searchResult = petsList.filter(item =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredItems(searchResult);
  // }, [searchTerm, petsList]);

  // ////Function to handle search input change
  // const handleSearchChange = (query) => {
  //   setSearchTerm(query);
  // };

  // Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
      <div>
          <h1>Pet Adoption Center</h1>
          <h2>Welcome!</h2>
          <div className="slides-home"> 
            <SlideShow slides={slideShowData} />
          </div>
          <button className="btn-see-available-pets" onClick={() =>
               navigate("/pets")}>See Available Pets</button>
      </div>
  );
};

// About Page Component 
const About = () => (
  <div>
      <h2>About Us</h2>
      <img src={homedogs} alt="homedogs" id="img"/>
      <nav>
          <ul>
              <li>
                  <Link to="team">Our Team</Link>
              </li>
              <li>
                  <Link to="company">Our Company</Link>
              </li>
          </ul>
      </nav>
      <Outlet />
  </div>
);

// Available Pets Component
const Pets = () => {
  return (
  <div>
    <h2>Pets Available for Adoptions</h2>
    <div>
      <h3>Search Pets</h3>
      <SearchBar />
    </div>
    {petsList.map((pet) => (
    <CardDisplay
      key={pet.id}
      id={pet.id}
      name={pet.name}
      description={pet.description}
      onDeletePet={handleDeletePet}
      onUpdatePet={handleUpdatePet}
    />
  ))}
  <hr></hr>
        <div>
        <h3>Add New Pet</h3>
        <button onClick={toggleForm}>
          {showForm ? 'Hide Form' : 'Show Form'}
        </button>
        {showForm && (
          <div> 
            {<AddPetCard />}
          </div>
        )}
      </div>
  </div>
)};

const Team = () => {
  return (
    <div>
    <h2>Our Team</h2>
    <p>Lorem ipsum dolor sit amet. Ea nesciunt nulla hic repudiandae nesciunt sit quia optio qui earum galisum. Est velit aliquam non magnam assumenda est deserunt temporibus et possimus officiis. Ex natus asperiores eum impedit eveniet est optio fugit ea iusto distinctio ad sapiente fuga vel facilis aliquam qui cumque eveniet. Ut quas natus vel vitae omnis est architecto culpa sit sequi obcaecati sit omnis molestias. </p><p>Qui amet dignissimos et harum similique 33 culpa enim est odio reiciendis qui temporibus quos. Et libero recusandae non labore natus in perspiciatis eius aut fuga dolore ea quia vero! Et ducimus neque eos beatae vero id voluptas velit in ipsam ipsam? Ut atque quia et voluptatem voluptatum a quisquam debitis eos deleniti alias ab consequatur ratione aut voluptatibus natus. </p><p>Aut recusandae nesciunt sed placeat maiores vel repudiandae porro sit facere laboriosam sit autem laudantium. Sed rerum commodi qui galisum quia qui doloribus recusandae et dignissimos repellendus et provident molestiae rem delectus galisum?</p>
    </div>
  );
};

const Company = () => {
  return (
    <div>
    <h2>Our Company</h2>
    <p>Lorem ipsum dolor sit amet. Ea nesciunt nulla hic repudiandae nesciunt sit quia optio qui earum galisum. Est velit aliquam non magnam assumenda est deserunt temporibus et possimus officiis. Ex natus asperiores eum impedit eveniet est optio fugit ea iusto distinctio ad sapiente fuga vel facilis aliquam qui cumque eveniet. Ut quas natus vel vitae omnis est architecto culpa sit sequi obcaecati sit omnis molestias. </p><p>Qui amet dignissimos et harum similique 33 culpa enim est odio reiciendis qui temporibus quos. Et libero recusandae non labore natus in perspiciatis eius aut fuga dolore ea quia vero! Et ducimus neque eos beatae vero id voluptas velit in ipsam ipsam? Ut atque quia et voluptatem voluptatum a quisquam debitis eos deleniti alias ab consequatur ratione aut voluptatibus natus. </p><p>Aut recusandae nesciunt sed placeat maiores vel repudiandae porro sit facere laboriosam sit autem laudantium. Sed rerum commodi qui galisum quia qui doloribus recusandae et dignissimos repellendus et provident molestiae rem delectus galisum?</p>
    </div>
  );
};

const Volunteer = () => {
  return (
    <div> 
      <h2>Volunteer Page</h2>
      <h3>Are you interested in volunteering?</h3>
      <p>Please fill out this volunteer form</p>
      <div>
        <VolunteerForm />
      </div>
    </div>
  )
}

  return (
    <div>
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/pets">Pets</Link>
                    </li>
                    <li>
                        <Link to="/volunteer">Volunteer</Link>
                    </li>
                </ul>
            </nav>
            {/*Implementing Routes for respective Path */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />}>
                    <Route path="team" element={<Team />} />
                    <Route path="company" element={<Company/>} />
                </Route>
                <Route path="/pets" element={<Pets />} />
                <Route path="/volunteer" element={<Volunteer />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;

//////////////////////////////////////////////////
// // App.jsx renders Board based on the data provided by Board.
// // It maps over the data provided by Board and renders the Card components.

// import './App.css';
// import React from 'react';
// import Board from './components/Board';
// import Card from './components/Card';
// import AddCardForm from './components/AddCardForm';


// function App() {

//   return (
//     <div className="App">
//       <div className="App-header">
//         <h1>Pet Adoptions</h1>
//       </div>
//       <Board>
//       {(cardsData, handleAddCard) => (
//       // {(cardsData) => (
//         <div className="board">
//           {cardsData.map((card, index) => (
//             <Card 
//             key={index} 
//             name={card.name} 
//             description={card.description} 
//             />
//           ))}
//           <AddCardForm onAddCard={handleAddCard} />
//         </div>
//       )}
//     </Board>
//     </div>
//   );
// }


// export default App;