export function sendData(score1, score2, userID) {
    const firebaseConfig = {
        apiKey: "AIzaSyC3XjE_4u8tlqUglGbHBYmm6J_LB-G5Pog",
        authDomain: "wompwomp-1.firebaseapp.com",
        projectId: "wompwomp-1",
        storageBucket: "wompwomp-1.appspot.com",
        messagingSenderId: "775847038422",
        appId: "1:775847038422:web:1aa21943d5306e43ac2877",
        measurementId: "G-C2W7EDPWPJ",
    };

    const app = firebase.initializeApp(firebaseConfig);

    const db = app.firestore(app);

    let self = this;
    db.collection("num_matches")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                self.match_number = doc.data().total;
            });
        });
    console.log(
        "Match #: " +
            this.match_number +
            "SAVED IP: " +
            userID +
            " score1: " +
            score1 +
            " score2: " +
            score2
    );
    db.collection("scores")
        .doc(self.match_number.toString())
        .set({
            ip: userID,
            player1: score1,
            player2: score2,
        })
        .then(() => {
            // console.log("Document with ID " + userID + " has been written.");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export function updateLeaderboard() {
    const firebaseConfig = {
        apiKey: "AIzaSyC3XjE_4u8tlqUglGbHBYmm6J_LB-G5Pog",
        authDomain: "wompwomp-1.firebaseapp.com",
        projectId: "wompwomp-1",
        storageBucket: "wompwomp-1.appspot.com",
        messagingSenderId: "775847038422",
        appId: "1:775847038422:web:1aa21943d5306e43ac2877",
        measurementId: "G-C2W7EDPWPJ",
    };

    const app = firebase.initializeApp(firebaseConfig);

    const db = app.firestore(app);

    const leaderboardDiv = document.getElementById("leaderboard");

    db.collection("scores")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(
                    "GET Match #: " +
                        doc.id +
                        " IP: " +
                        doc.data().ip +
                        " score1: " +
                        doc.data().player1 +
                        " score2: " +
                        doc.data().player2
                );
                const playerElement = document.createElement("div");
                leaderboardDiv.innerHTML = "";
                playerElement.textContent =
                    "Match #: " +
                    doc.id +
                    "     IP: " +
                    doc.data().ip +
                    "     Player 1 Score: " +
                    doc.data().player1 +
                    "     Player 2 Score: " +
                    doc.data().player2;
                leaderboardDiv.appendChild(playerElement);
            });
        });
}
