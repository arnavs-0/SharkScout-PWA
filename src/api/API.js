import firebase from "firebase";
import {toast} from "react-toastify";
import {removeItem, setQRCode, uid} from "../modules/LocalDB";
import {goToHome, goToQRCode} from "../modules/Router";
import {label, pitLabel} from "../utils/Label";
import Config from "../utils/config.json";

export function offlineSubmit(data) {
    //Auton Points
    // TODO: Create Schema to calculate points
    let auton_bp = data[3] * 2;
    let auton_op = data[4] * 4;
    let auton_total = auton_bp + auton_op;

    // //TeleOp Points
    let teleop_bp = data[5];
    let teleop_up = data[6] * 2;
    
    let teleop_total = teleop_bp + teleop_up;
    
    // //Endgame
     let endgame;
    if (data[8] === "Traversal") {
        endgame = 15;
    } else if (data[8] === "High") {
        endgame = 10;
    } else if (data[8] === "Mid") {
        endgame = 6;
    } else if (data[12] === "Low") {
        endgame = 10;
    } else {
        endgame = 0;
    }
    
    let total = auton_total + teleop_total + endgame;
    
    data.push(auton_total, teleop_total, endgame, total);

    var reformat = {};

    reformat[label[0]] = localStorage.getItem("uid");
    if (data[0].team !== undefined){
        reformat[label[1]] = data[0].team;
        reformat[label[2]] = data[0].match;
        reformat[label[3]] = data[0].alliance;
    } else {
        reformat[label[1]] = data[0].value.team
        reformat[label[2]] = data[0].value.match;
        reformat[label[3]] = data[0].value.alliance;
    }

    for (let i = 0; i < data.length - 1; i++){
     reformat[label[i + 4]] = data[i + 1]
    }

    console.log(reformat)
    setQRCode(JSON.stringify(reformat));
    const fileName = "file";
    const json = JSON.stringify(reformat);
    const blob = new Blob([json], {type: "application/json"});
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
   // link.click();
    removeItem("offline");
    goToQRCode();
}

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
        endgame = 4
    } else {
        endgame = 0;
    }
    //
    let total = auton_total + teleop_total + endgame;
    //
    data.push(auton_total, teleop_total, endgame, total);

    var reformat = {};

    reformat[label[0]] = localStorage.getItem("uid");
    if (data[0].team !== undefined){
        reformat[label[1]] = data[0].team;
        reformat[label[2]] = data[0].match;
        reformat[label[3]] = data[0].alliance;
    } else {
        reformat[label[1]] = data[0].value.team
        reformat[label[2]] = data[0].value.match;
        reformat[label[3]] = data[0].value.alliance;
    }

    for (let i = 0; i < data.length - 1; i++){
        reformat[label[i + 4]] = data[i + 1]
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