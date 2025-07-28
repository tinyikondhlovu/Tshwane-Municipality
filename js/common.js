const contact = document.querySelector('.contacts');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'left'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'right'});
  
});

//implement the renderContact

const renderContact = (data, id) => {
  const contactContainer = document.querySelector('.contact'); // parent container where to append

  const html = `
    <div class="contacts container grey-text text-darken-1" data-id="${id}">
      <div class="grey-text text-darken-1 pk-contact">
        <div class="contact-image">
          <img src="${data.image || 'img/pkcontacts.png'}" alt="contact thumb" />
        </div>
        <div class="contact-details">
          <div class="contact-title">${data.contactName}</div>
          <div class="contact-numbers">${data.number}</div>
        </div>
        <div class="contact-options">
          <i class="material-icons" data-id="${id}">call</i>
          <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
      </div>
    </div>
  `;

  contactContainer.innerHTML += html;
};


