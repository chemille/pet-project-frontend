import CardDisplay from './components/CardDisplay';
import axios from 'axios';
import {useState, useEffect} from 'react';
import AddPetCard from './components/AddPetCard';
// import UpdatePetCard from './components/UpdatePetCard';

function App() {
  const [petsList, setPetsList] = useState([]);
    
  useEffect(() => {
    const fetchPetsList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/pets/');
        setPetsList(response.data);
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
    .then(()=> {
      setPetsList((petsList) => petsList.filter((pet) => pet.id !== id));
    })
    .catch((error) => {
      console.log(error);
    });    
  }; 

  //// PATCH request (I don't have PATCH in my backend...)
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
  /////

  return(
    <div>
      <h1>Pet Adoption Center</h1>
      <hr></hr>
      <div>
        <h3>Form to Add New Pet</h3>
        <AddPetCard />
      </div>
      <hr></hr>
      <div> 
        <h2>Pets Available for Adoptions</h2>
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
      </div>  
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