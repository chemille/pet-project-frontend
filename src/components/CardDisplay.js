import React, {useState } from 'react';

const CardDisplay = ({id, name, description, onDeletePet, onUpdatePet}) => {
  ////
  
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSaveClick = () => {
    onUpdatePet(id, details);
    setIsEditing(false);
  };
 ////

  return (
  <div className="card">
    <h2 className="card-title">{name}</h2>
    {isEditing ? (
      <div>
        <textarea value={details} onChange={handleChange} />
        <button onClick={handleSaveClick}>Save</button>
      </div>
    ) : (
      <p className="card-text">{description}</p>
    )}
    <span>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={() => onDeletePet(id)} className="delete-button">Delete</button>
    </span>
  </div>
);
};

export default CardDisplay;

///////////////////////////////////////////////////
// import React from 'react';

// const CardDisplay = ({id, name, description, onDeletePet}) => {

//   return (
//   <div className="card">
//     <h2 className="card-title">{name}</h2>
//     <p className="card-text">{description}</p>
//     <span>
//       <button onClick={() => console.log('Update button clicked!')} className="update-button">Update</button>
//       <button onClick={() => onDeletePet(id)} className="delete-button">Delete</button>
//     </span>
//   </div>
// );
// };

// export default CardDisplay;

/////////////////////////////////////////////////////
// import React from 'react';

// const Card = (props) => {
//   return (
//   <div className="card">
//     <h2 className="card-title">{props.name}</h2>
//     <p className="card-text">{props.description}</p>
//     <span>
//       <button onClick={() => console.log('Update button clicked!')} className="update-button">Update</button>
//       <button onClick={() => props.handleDeletePet(props.id)} className="delete-button">Delete</button>
//     </span>
//   </div>
// );
// };

// export default Card;

///////// Code NOT working, but good notes for future reference /////////////

// // passed petsList and setPetsList as props here
// const Card = (pet, petsList, setPetsList) => (

//   const handleDeletePet = (item) => {
//     console.log("Delete button clicked for item", item);
// //     // This filter is like using a map. We're looping trough all the pets,
// //     // and then the callback function has access to every pet in the list.
// //     // Next, we check if the current pet is != to the item being passed in.
//     setPetsList(petsList.filter((pet) => pet !== item));
// //     // If the pet is not the same as the item being passed in, it passes the check 
// //     // and the item/pet will be removed. What will be returned is an array of the 
// //     // pets that fails this condition (pet !== item) and didn't pass the check.
// //     // The filtered array is passed into the setPetsList.
//   };

//   return(
//   <div className="card">
//      <h2 className="card-title">{pet.name}</h2>
//      <p className="card-text">{pet.description}</p>
//      <span>
//        <button onClick={() => handleDeletePet(pet)} className="delete-button">X</button>
//      </span>
//    </div>
//   );
// );

// export default Card;

/////////////////////////////////////////////////
// // Card.jsx is a purely presentational component that receives
// // 'name' and 'description' as props and displays them.
// // SRP -> only render the card UI based on the data it receives.

// import React from 'react';

// const Card = (pet) => (
//   <div className="card">
//     <h2 className="card-title">{pet.name}</h2>
//     <p className="card-text">{pet.description}</p>
//     <span>
//       <button className="delete-button">X</button>
//     </span>
//   </div>
// );

// export default Card;



/////////////// Hard-coded example below ////////////

// import shibaPic from '../assets/pexels-shiba-pic.jpg';

// function Card() {
//     return(
//         <div className="card">
//             {/* <img className="card-image" src={shibaPic} alt="shiba picture"></img> */}
//             <h2 className="card-title">Yoshi</h2>
//             <p className="card-text">Shiba Inu 7 y/o male</p>
//         </div>
//     );
// }

// export default Card;