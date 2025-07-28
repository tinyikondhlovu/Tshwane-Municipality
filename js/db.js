db.enablePersistence()
   .catch(err => {
    if(err.code == 'failed-precondintion'){
        //probably multiple tabs at once
        console.log('persistence failed');
    }else if(err.code == 'unimplemented'){
        //lack of browser support
        console.log('Persistence not supporte.d');
    }
   })



// Real-time listener
db.collection('contacts').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      renderContact(change.doc.data(), change.doc.id);
    }

    if (change.type === 'removed') {
      removeContact(change.doc.id);
    }
  });
});

// Add new contact
const form = document.querySelector('form');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const contact = {
    contactName: form.name.value,
    number: form.number.value,
    email: form["E-mail"].value,
    location: form.Location.value,
    moreInfo: form["More Info"].value,
    services: form.Services.value,
    image: form.Image.value
  };

  db.collection('contacts').add(contact)
    .catch(err => {
      console.log(err);
    });

  // Clear form
  form.name.value = "";
  form.number.value = "";
  form["E-mail"].value = "";
  form.Location.value = "";
  form["More Info"].value = "";
  form.Services.value = "";
  form.Image.value = "";
});

// Delete a contact
const contactContainer = document.querySelector('.contact');

contactContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    db.collection('contacts').doc(id).delete();
  }
});

// Render contact to UI
const renderContact = (data, id) => {
  const contactContainer = document.querySelector('.contact');

  const html = `
    <div class="contacts container grey-text text-darken-1" data-id="${id}">
      <div class="grey-text text-darken-1 pk-contact">
        <div class="contact-image">
          <img src="${data.image || 'img/pkcontacts.png'}" alt="contact thumb" />
        </div>
        <div class="contact-details">
          <div class="contact-title">${data.contactName || 'No Name'}</div>
          <div class="contact-numbers">${data.number || 'No Number'}</div>
          <div class="contact-email">${data.email || ''}</div>
          <div class="contact-location">${data.location || ''}</div>
          <div class="contact-services">${data.services || ''}</div>
        </div>
        <div class="contact-options">
          <i class="material-icons teal-text" data-id="${id}">call</i>
          <i class="material-icons red-text" data-id="${id}">delete_outline</i>
        </div>
      </div>
    </div>
  `;

  contactContainer.innerHTML += html;
};

// Remove contact from UI
const removeContact = (id) => {
  const contact = document.querySelector(`.contacts[data-id="${id}"]`);
  if (contact) {
    contact.remove();
  }
};
