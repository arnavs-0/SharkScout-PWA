import firebase from "firebase";
import { toast } from "react-toastify";
import { removeItem, setQRCode, uid } from "../modules/LocalDB";
import { goToHome, goToQRCode } from "../modules/Router";
import { label, pitLabel } from "../utils/Label";
import Config from "../utils/config.json";

export function offlineSubmit(data) {
  console.log(data);
  let autoClimb = 0;

  if (data[8] === "Docked") {
    autoClimb = 8;
  } else if (data[8] === "Engaged") {
    autoClimb = 12;
  }

  let endClimb = 0;
  if (data[18] === "Docked") {
    endClimb = 6;
  } else if (data[18] === "Engaged") {
    endClimb = 10;
  }
  let auton = ((data[2] + data[3]) * 3) + ((data[4] + data[5]) * 4) + ((data[6] + data[7]) * 6) + autoClimb;
  let teleop = ((data[9] + data[10]) * 2) + ((data[11] + data[12])) * 3  + (data[13] + data[14]) * 5 + endClimb;

  data.push(auton, teleop, auton + teleop);

  var reformat = {};
  if (data[0].team !== undefined) {
    reformat[label[0]] = data[0].match;
    reformat[label[1]] = data[0].team;
    reformat[label[2]] = data[0].alliance;
  } else {
    reformat[label[0]] = data[0];
    reformat[label[1]] = data[1];
    reformat[label[2]] = data[2];
  }

  // var notes = [];
  // notes.push(data[9]);
  // notes.push(data[19]);
  // notes.push(data[21]);
  // console.log(notes)
  // data.splice(9, 1)
  // data.splice(19, 1)
  // data.splice(21, 1)
  // console.log(data)
  for (let i = 0; i < data.length - 1; i++) {
    reformat[label[i + 3]] = data[i + 1];
  }

  // var notesReformat = {};
  // if (data[0].team !== undefined) {
  //   notesReformat[notesLabel[0]] = data[0].match;
  //   notesReformat[notesLabel[1]] = data[0].team;
  //   notesReformat[notesLabel[2]] = data[1];
  // } else {
  //   notesReformat[notesLabel[0]] = data[0];
  //   notesReformat[notesLabel[1]] = data[1];
  //   notesReformat[notesLabel[2]] = data[3];
  // }


  // for (let i = 0; i < notes.length; i++) {
  //   notesReformat[notesLabel[i + 3]] = notes[i];
  // }
  console.log(reformat);
  setQRCode(JSON.stringify(reformat));
  //setNotesQRCode(JSON.stringify(notesReformat));
  const fileName = "file";
  const json = JSON.stringify(reformat);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  // link.click();
  removeItem("offline");
  goToQRCode();

  // 
}

// export function offlineSubmit(data) {
//   //Auton Points
//   // TODO: Create Schema to calculate points
//   let auton_bp = data[4] * 2;
//   let auton_op = data[5] * 4;
//   let auton_total = auton_bp + auton_op;

//   // //TeleOp Points
//   let teleop_bp = data[6];
//   let teleop_up = data[7] * 2;

//   let teleop_total = teleop_bp + teleop_up;

//   // //Endgame
//   let endgame;
//   if (data[10] === "Traversal") {
//     endgame = 15;
//   } else if (data[10] === "High") {
//     endgame = 10;
//   } else if (data[10] === "Mid") {
//     endgame = 6;
//   } else if (data[10] === "Low") {
//     endgame = 10;
//   } else {
//     endgame = 0;
//   }

//   let total = auton_total + teleop_total + endgame;

//   data.push(auton_total, teleop_total, endgame, total);

//   var reformat = {};

//   reformat[label[0]] = localStorage.getItem("uid");
//   if (data[0].team !== undefined) {
//     reformat[label[1]] = data[0].team;
//     reformat[label[2]] = data[0].match;
//     reformat[label[3]] = data[0].alliance;
//   } else {
//     reformat[label[1]] = data[0];
//     reformat[label[2]] = data[1];
//     reformat[label[3]] = data[2];
//   }

//   for (let i = 0; i < data.length - 1; i++) {
//     reformat[label[i + 4]] = data[i + 3];
//   }

//   console.log(reformat);
//   setQRCode(JSON.stringify(reformat));
//   const fileName = "file";
//   const json = JSON.stringify(reformat);
//   const blob = new Blob([json], { type: "application/json" });
//   const href = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = href;
//   link.download = fileName + ".json";
//   document.body.appendChild(link);
//   // link.click();
//   removeItem("offline");
//   goToQRCode();
// }

export function onlineSubmit(data) {
  const db = firebase.firestore();
  let auton_bp = data[3] * 2;
  let auton_op = data[4] * 4;
  let auton_total = auton_bp + auton_op;

  // //TeleOp Points
  let teleop_bp = data[5];
  let teleop_up = data[6] * 2;
  //
  let teleop_total = teleop_bp + teleop_up;
  //
  // //Endgame
  let endgame;
  if (data[8] === "Traversal") {
    endgame = 15;
  } else if (data[8] === "High") {
    endgame = 10;
  } else if (data[8] === "Mid") {
    endgame = 6;
  } else if (data[8] === "Low") {
    endgame = 4;
  } else {
    endgame = 0;
  }
  //
  let total = auton_total + teleop_total + endgame;
  //
  data.push(auton_total, teleop_total, endgame, total);

  var reformat = {};

  reformat[label[0]] = localStorage.getItem("uid");
  if (data[0].team !== undefined) {
    reformat[label[1]] = data[0].team;
    reformat[label[2]] = data[0].match;
    reformat[label[3]] = data[0].alliance;
  } else {
    reformat[label[1]] = data[0].value.team;
    reformat[label[2]] = data[0].value.match;
    reformat[label[3]] = data[0].value.alliance;
  }

  for (let i = 0; i < data.length - 1; i++) {
    reformat[label[i + 4]] = data[i + 3];
  }

  db.collection(Config.firebase_node)
    .doc("quals")
    .collection(reformat.team + "-" + reformat.match)
    .doc(reformat.uid)
    .set(reformat)
    .then(function (docRef) {
      toast.success("Submitted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      removeItem("offline");
      goToHome();
    })
    .catch(function (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

export function offlinePit(data) {
  var reformat = {};
  if (!localStorage.getItem("pitIndex")) {
    localStorage.setItem("pitIndex", 0);
  }

  reformat[pitLabel[0]] = uid;
  reformat[pitLabel[1]] = data[0];
  reformat[pitLabel[2]] = data[1];
  for (let i = 0; i < data.length; i++) {
    reformat[pitLabel[i + 3]] = data[i];
  }

  setQRCode(JSON.stringify(reformat));

  removeItem("offline");
  goToQRCode();
}
