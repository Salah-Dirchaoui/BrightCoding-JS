const list = document.querySelector('ul');
const form = document.querySelector('form');

// to add a course to firestore
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const now = new Date();
  const course = {
    title: form.course.value,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  db.collection('courses')
    .add(course)
    .then((res) => {
      form.reset();
      console.log(res, 'course added');
    })
    .catch((err) => console.error(err));
});
// to delete a course from firstor no UI update
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.preventDefault();
    let id = e.target.parentElement.getAttribute('data-id');
    if (confirm('Are you sûre to delete this course ?')) {
      db.collection('courses')
        .doc(id)
        .delete()
        .then(() => console.log('course deleted'))
        .catch((err) => console.error(err));
    }
  }
});

// to retreive data from firestore to UI
const addCourse = (course, id) => {
  const html = `
  <li class="list-group-item" data-id="${id}">
  <h3>${course.title}</h3>
  <small>${course.created_at.toDate()}</small>
  <button class="btn btn-danger btn-sm my-2">Delete</button>
  </li>
  `;
  list.innerHTML += html;
};
// to delete course and update UI
const deleteCourse = (id) => {
  const courses = document.querySelectorAll('li');
  courses.forEach((course) => {
    if (course.getAttribute('data-id') === id) {
      course.remove();
    }
  });
};
// to get data from firstore
db.collection('courses').onSnapshot((snap) => {
  console.log(snap.docChanges());
  snap.docChanges().forEach((course) => {
    if (course.type === 'added') {
      addCourse(course.doc.data(), course.doc.id);
    } else {
      deleteCourse(course.doc.id);
    }
  });
});
