// /public/app.js

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const contactList = document.getElementById('contactList');
  let editingContactId = null; // To track the contact being edited

  // Fetch contacts from the server
  async function fetchContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    renderContacts(contacts);
  }

  // Render contacts to the list
  function renderContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const li = document.createElement('li');
      li.innerHTML = `${contact.name} - ${contact.email} - ${contact.phone} 
        <button class="edit">Edit</button> 
        <button class="delete">Delete</button>`;
      li.querySelector('.edit').onclick = () => loadContactForEditing(contact);
      li.querySelector('.delete').onclick = () => deleteContact(contact._id);
      contactList.appendChild(li);
    });
  }

  // Load contact data into the form for editing
  function loadContactForEditing(contact) {
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    editingContactId = contact._id;
  }

  // Add or update a contact
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (editingContactId) {
      // Update contact
      await fetch(`/api/contacts/${editingContactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      editingContactId = null; // Reset after updating
    } else {
      // Add new contact
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
    }

    contactForm.reset();
    fetchContacts();
  });

  // Delete a contact
  async function deleteContact(id) {
    await fetch(`/api/contacts/${id}`, {
      method: 'DELETE'
    });
    fetchContacts();
  }

  fetchContacts();
});
