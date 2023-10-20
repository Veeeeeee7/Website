class Main {
    constructor() {
        this.button();
    }

    button() {
        if (document.getElementById("changeToAboutButton") != null) {
            document
                .getElementById("changeToAboutButton")
                .addEventListener("click", function () {
                    fetch("about.html")
                        .then((response) => response.text())
                        .then((content) => {
                            document.getElementById("content").innerHTML =
                                content;
                            document.mainClass = new Main();
                        });
                });
        } else {
            document
                .getElementById("changeToIndexButton")
                .addEventListener("click", function () {
                    fetch("index.html")
                        .then((response) => response.text())
                        .then((content) => {
                            document.getElementById("content").innerHTML =
                                content;
                            document.mainClass = new Main();
                        });
                });
        }
    }
}

document.mainClass = new Main();
