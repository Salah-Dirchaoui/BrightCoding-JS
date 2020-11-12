const list = document.querySelector('ul');

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

db.collection('courses')
  .get()
  .then((res) =>
    res.docs.forEach((course) => {
      addCourse(course.data());
    })
  )
  .catch((err) => console.log(err));
