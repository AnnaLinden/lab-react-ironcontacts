// src/App.js
import "./App.css";
import contactsData from "./contacts.json";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


//create a state variable named contacts and store the first 5 contacts



function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  const addRandomContact = () => {
    //filter out the contacts that are already in the contacts state
    const remainingContacts = contactsData.filter(
      (contact) => !contacts.includes(contact)
    );

    //randomly pick a contact
    const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];

    //add the random contact to the contacts state
    setContacts([...contacts, randomContact]);
    };

  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedContacts);
  };

  const deleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
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
    {contacts.map((contact, index) => (
      <tr key={index}>
        <td><img src={contact.pictureUrl} alt={contact.name} width = "50" /></td>
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