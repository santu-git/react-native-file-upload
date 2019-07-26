//const source = { uri: response.uri };
// You can also display the image using data:
const source = "data:image/jpeg;base64," + response.data;
this.setState({
  avatar: source,
  avatarSrc: response.uri
});

const formData = new FormData();
// formData.append("empolyee[name]", "Testing");
// formData.append("empolyee[avatar]", {
//   uri: `file://${response.path}`,
//   name: response.fileName,
//   type: response.type
// });
const bodyData = {
  empolyee: {
    name: "Santu MKSCkc",
    avatar: source
  }
};
// formData.append("file", {
//   uri: `file://${response.path}`,
//   name: response.fileName,
//   type: response.type
// });
console.log(formData);
//formData.append("file", response, response.fileName);
axios
  .post("http://192.168.29.239:3000/empolyees.json", bodyData, {
    //.post("http://192.168.29.239:8080/api/upload", formData, {
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
/*fetch("http://192.168.29.239:3000/empolyees.json", {
  //fetch("http://192.168.29.239:8080/api/upload", {
  method: "post",
  headers: {
    Accept: "application/json"
  },
  body: bodyData
})
  .then(response => {
    console.log("image uploaded", response);
  })
  .catch(err => {
    console.log(err);
  });*/
