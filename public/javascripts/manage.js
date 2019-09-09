const axiosHandler = axios.create({
  baseURL: "http://localhost:3000"
});

function deleteVideo(evt) {
  const videoId = evt.target.dataset.idvideo;
  console.log(evt.target);
  // axiosHandler
  //   .delete(`/product-delete/${videoId}`)
  //   .then(res => {
  //     const deleteRow = document.getElementById(videoId);
  //     deleteRow.parentNode.removeChild(deleteRow);
  //   })
  //   .catch(err => console.log("This is the err response :", err));
}

const videoBins = document.getElementsByClassName("fa-trash");

for (let element of videoBins) {
  element.onclick = deletevideo;
}
