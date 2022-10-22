// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };

import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm ';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Title, Contacts, EmptyList } from './Base.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    if (
      contacts.find(
        contact => contact.number.toLowerCase() === number.toLowerCase()
      )
    ) {
      alert(`${number} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  // --- Працюючий варіант!

  // addContact = ({ name, number }) => {
  //   const { contacts } = this.state;

  //   if (
  //     contacts.find(
  //       contact => contact.name.toLowerCase() === name.toLowerCase()
  //     )
  //   ) {
  //     alert(`${name} is already in contacts.`);
  //   } else if (contacts.find(contact => contact.number === number)) {
  //     alert(`${number} is already in contacts.`);
  //   } else {
  //     this.setState(({ contacts }) => ({
  //       contacts: [contact, ...contacts],
  //     }));
  //   }

  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  // };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Title>
          <h1>Phonebook</h1>
        </Title>
        <ContactForm onSubmit={this.addContact} />
        <Contacts>
          <h2>Contacts</h2>
        </Contacts>

        {this.state.contacts.length ? (
          <>
            <Filter value={filter} onChange={this.onFilterChange} />
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          </>
        ) : (
          <EmptyList>
            <p>Сontact list is empty😢</p>
          </EmptyList>
        )}
      </Container>
    );

    // return (
    //   <Container>
    //     <Title>
    //       <h1>Phonebook</h1>
    //     </Title>
    //     <ContactForm onSubmit={this.addContact} />
    //     <Contacts>
    //       <h2>Contacts</h2>
    //     </Contacts>
    //     <Filter value={filter} onChange={this.onFilterChange} />

    //     {contacts.length ? (
    //       <ContactList
    //         contacts={visibleContacts}
    //         deleteContact={this.deleteContact}
    //       />
    //     ) : (
    //       <EmptyList>
    //         <p>Сontact list is empty😢</p>
    //       </EmptyList>
    //     )}
    //   </Container>
    // );
  }
}
