class main {
    constructor() {
        this.button();
    }

    button() {
        console.log("HI");
        var button = document.getElementById("moving-button");
        button.addEventListener("mouseover", function () {
            var newX = Math.random() * (window.innerWidth - button.clientWidth);
            var newY =
                Math.random() * (window.innerHeight - button.clientHeight);

            button.style.left = newX + "px";
            button.style.top = newY + "px";
        });
        const modal = document.getElementById("myModal");
        const messageElement = document.getElementById("message");
        const closeBtn = document.querySelector(".close");

        button.addEventListener("click", function () {
            messageElement.textContent = "CONGRATS";
            modal.style.display = "block";
        });

        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}

document.mainClass = new main();
