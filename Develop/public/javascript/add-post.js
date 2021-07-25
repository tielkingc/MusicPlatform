// // async function newFormHandler(event) {
// //   event.preventDefault();

  
// // }

// // document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);


var submitPost = function() {
  const title = "test post"
  const post_content = document.querySelector('#post_content').value;

  const response = fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/community');
  } else {
    alert(response.statusText);
  }
}

// if (window.location.pathname === '/notes') {
//   // noteTitle = document.querySelector('.note-title');
//   noteText = document.querySelector('#post_content');
//   saveNoteBtn = document.querySelector('#save-post');
// }

// const saveNote = (note) =>
//   fetch('/api/posts', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

// const handleNoteSave = () => {
//   const newNote = {
//     // title: noteTitle.value,
//     text: noteText.value,
//   };
//   saveNote(newNote).then(() => {
//     // getAndRenderNotes();
//     // renderActiveNote();
//     console.log('saved')
//   });
// };

// if (window.location.pathname === '/notes') {
//   saveNoteBtn.addEventListener('click', handleNoteSave);
//   // newNoteBtn.addEventListener('click', handleNewNoteView);
//   // noteTitle.addEventListener('keyup', handleRenderSaveBtn);
//   // noteText.addEventListener('keyup', handleRenderSaveBtn);
// }

