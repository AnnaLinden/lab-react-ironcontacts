import "./App.css";
import contactsData from "./contacts.json";
import React, { useReducer } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = { contacts: contactsData.slice(0, 5) };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RANDOM_CONTACT':
      return { contacts: [...state.contacts, action.payload] };
    case 'SORT_BY_NAME':
      return { contacts: [...state.contacts].sort((a, b) => a.name.localeCompare(b.name)) };
    case 'SORT_BY_POPULARITY':
      return { contacts: [...state.contacts].sort((a, b) => b.popularity - a.popularity) };
    case 'DELETE_CONTACT':
      const newContacts = [...state.contacts];
      newContacts.splice(action.payload, 1);
      return { contacts: newContacts };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addRandomContact = () => {
    const remainingContacts = contactsData.filter(
      (contact) => !state.contacts.includes(contact)
    );
    const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
    dispatch({ type: 'ADD_RANDOM_CONTACT', payload: randomContact });
  };

  const sortByName = () => dispatch({ type: 'SORT_BY_NAME' });
  const sortByPopularity = () => dispatch({ type: 'SORT_BY_POPULARITY' });
  const deleteContact = (index) => dispatch({ type: 'DELETE_CONTACT', payload: index });

  return <div className="App">
  <h1 className="display-4 text-center my-4 font-weight-bold text-primary">IronContacts</h1>
  <div className="mb-4">
    <button class="btn btn-secondary btn-sm me-2" onClick={addRandomContact}>Add Random Contact</button>
    <button class="btn btn-secondary btn-sm me-2" onClick={sortByName}>Sort by Name</button>
    <button class="btn btn-secondary btn-sm" onClick={sortByPopularity}>Sort by Popularity</button>
  </div>
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won an Oscar</th>
        <th>Won an Emmy</th>
      </tr>
    </thead>
    <tbody>
  {state.contacts.map((contact, index) => (
    <tr key={index}>
      <td><img src={contact.pictureUrl} alt={contact.name} width="50" /></td>
      <td>{contact.name}</td>
      <td>{contact.popularity.toFixed(2)}</td>
      <td>{contact.wonOscar ? "🏆" : ""}</td>
      <td>{contact.wonEmmy ? "🏆" : ""}</td>
      <td className="align-middle"><button class="btn btn-danger btn-sm" onClick={() => deleteContact(index)}>Delete</button></td>
    </tr>
  ))}
</tbody>
  </table>
</div>;
}

export default App;