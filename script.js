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
    .then((res) => console.log(res, 'course added'))
    .catch((err) => console.error(err));
});

// to retreive data from firestore to UI
addCourse = (course) => {
  const html = `
  <li class="list-group-item">
  <h3>${course.title}</h3>
  <small>${course.created_at.toDate()}</small>
  </li>
  `;
  list.innerHTML += html;
};
// to get data from firstore
db.collection('courses')
  .get()
  .then((res) =>
    res.docs.forEach((course) => {
      addCourse(course.data());
    })
  )
  .catch((err) => console.log(err));
