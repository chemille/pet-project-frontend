import axios from 'axios';
import React, {useState} from 'react';

const AddPetCard = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/pets/', {name, description});
            console.log('Form data submitted successfully:', response.data);
        } catch (error) {
            console.log('Error submitting form data:', error); // Try "error.response.data" instead of just "error"
        }
 };
 
 return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
        />
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
        />
        <button type="submit">Submit New Pet</button>
    </form>
 );
};


export default AddPetCard;

///////////////////////////////////////////////////////////////////////////
// import axios from 'axios';
// import React, {useState} from 'react';

// const AddCardForm = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         description: ""
//     });

//     const handleChange = (e) => {
//         e.preventDefault();
//         const { name, description } = e.target;
//         setFormData({...formData, [name]:e.value, [description]:e.value});
//  };
//  const handleSubmit = async (e)=> {
//     e.preventDefault();
//     try {
//         const response = await axios.post('http://localhost:8000/pets/', formData);
//         console.log('Form data submitted successfully:', response.data);
//     } catch (error) {
//         console.log('Error submitting form data:', error.response.data);
//     }
//  }

 
//  return (
//     <form onSubmit={handleSubmit}>
//         <label>Name:
//             <input type="text" placeholder="Type name of pet" name="name" value={formData.name} onChange={handleChange} />
//         </label>
        
//         <label>Description:
//             <input type="text" placeholder="Type description of pet" name="description" value={formData.description} onChange={handleChange} />  
//         </label>
        
//         <button type="submit">Submit New Pet</button>
//     </form>
//  );
// };


// export default AddCardForm;

///////////////////////////////////////////////////////

// import React, {useState} from 'react';

// const AddCardForm = ({onAddCard}) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newCard = { name, description };
//         onAddCard(newCard);
//         setName('');
//         setDescription('');
//  };

 
//  return (
//     <form onSubmit={handleSubmit}>
//         <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//             required
//         />
//         <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             required
//         />
//         <button type="submit">Add New Pet</button>
//     </form>
//  );
// };


// export default AddCardForm;

/////////////////////////////////////////////////////

// import React, {useState} from 'react';

// const AddCardForm = ({onAddCard}) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newCard = { name, description };
//         onAddCard(newCard);
//         setName('');
//         setDescription('');
//  };

//  return (
//     <form onSubmit={handleSubmit}>
//         <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//             required
//         />
//         <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             required
//         />
//         <button type="submit">Add New Card</button>
//     </form>
//  );
// };

// export default AddCardForm;