let fs = require("fs");
const { ipcRenderer } = require("electron");
const { dialog } = require("electron").remote;

function textEmailChangedValue() {
    let text = document.getElementById("txtEmailInput");
    let textValue = text.value;
    let row = text.getAttribute('rows');
    let lines = textValue.split(/\r|\r\n|\n/);
    let count = lines.length;
    if (count >= row) {
        text.style.overflowY = "scroll";
    }
    else if (count < row) {
        text.style.overflowY = "hidden";
    }
}

$('#txtEmailInput').on('change', textEmailChangedValue)
$("#importBtn").click(() => {
  dialog
    .showOpenDialog({ properties: ["openFile"] })
    .then((result) => {
      if (result.filePaths.length > 0) {
        fs.readFile(result.filePaths[0], (err, data) => {
            $('#txtEmailInput').val(data.toString())
            textEmailChangedValue()
        });
      }
    })
    .catch((err) => {
      console.log("cannot get file", err);
    });
});

$("#startBtn").click(()=>{
    ipcRenderer.send("sendFile", $('#txtEmailInput').val());
})