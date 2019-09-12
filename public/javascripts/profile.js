// import { log } from "util";
console.log("coucou");

function fillCourseList(evt) {
  console.log(evt.srcElement.value);
  const value = evt.srcElement.value;
  axiosHandler
    .post("/course-list", { course_difficulty: value })
    .then(res => {
      console.log("RES", res.data);
      const courseArray = res.data;
      const courseSelect = document.getElementById("course-select");
      courseSelect.innerHTML =
        "<option value='' selected disabled hidden>Course</option>";
      for (let course of courseArray) {
        console.log(course);
        const newOption = document.createElement("option");
        newOption.value = `${course.course_name}`;
        newOption.innerHTML = course.course_name;
        courseSelect.appendChild(newOption);
      }
    })
    .catch(err => console.log(err));
}

function submitCourseChoice(evt) {
  console.log(levelChoiceList.value);
  console.log(courseChoiceList.value);
  axiosHandler
    .post("/profile-course-update", {
      course: courseChoiceList.value
    })
    .then(res => {
      console.log(res.data);
      const newMsg = document.createElement("div");
      newMsg.innerHTML = res.data.msg;
      document.getElementById("msg-box").appendChild(newMsg);
    })
    .catch(err => console.log(err));
}

const levelChoiceList = document.getElementById("level-select");
const courseChoiceList = document.getElementById("course-select");
const chooseCourseBtn = document.getElementById("follow-course-btn");

chooseCourseBtn.onclick = submitCourseChoice;
levelChoiceList.onchange = fillCourseList;
