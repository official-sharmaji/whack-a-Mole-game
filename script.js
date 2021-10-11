const holesdiv = document.querySelector(".holes");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const startbutton = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
const highscore = document.querySelector(".highscore");
const gameover = document.querySelector(".display h2");
const hammer = document.querySelector(".hammer");

let timeleft;
let pscore = 0;
let maxscore = 0;

for (let i = 1;i <= 16;i++)
{
    let hole = document.createElement("div");
    hole.classList.add("hole");
    holesdiv.appendChild(hole);
    let pile = document.createElement("img");
    pile.classList.add("pile");
    pile.src = "durtpile.png";
    hole.appendChild(pile);
    let face = document.createElement("img");
    face.classList.add("angryface");
    face.src = "angryface.png";
    face.setAttribute("name", "angryface")
    hole.appendChild(face);
}

window.addEventListener("mousemove", (e) => {
    hammer.style.left = e.pageX + "px";
    hammer.style.top = e.pageY - 60 + "px";
});

window.addEventListener("click",(e)=>{
    hammer.style.transform = "rotateZ(50deg) rotateY(-180deg)";
    setTimeout(() => {
        hammer.style.transform = "rotateZ(0deg) rotateY(-180deg)";
    }, 40);
    if (e.target.name === "angryface") {
        setTimeout(() => {
            document.body.classList.toggle("flash");
        }, 100);
        document.body.classList.toggle("flash");
        pscore = pscore + 10;
        score.textContent = pscore;
    }
})

startbutton.addEventListener("click",()=>{
    modal.classList.add("modalclose")
    timeleft = 60;
    pscore = 0;
    score.textContent = pscore;
    time.textContent = timeleft;

    let timer = setInterval(() => {
        time.textContent = timeleft;
        if (timeleft === 0) {
            gameover.style.visibility = "visible"
            modal.classList.remove("modalclose")
            if (pscore > maxscore) {
                maxscore = pscore;
                highscore.textContent = maxscore;
            }
            else{
                highscore.textContent = maxscore;
            }
            clearInterval(timer);
        }
        else{
        timeleft--;
        time.textContent = timeleft < 10 ? "0" + timeleft : timeleft;
        const face = document.querySelectorAll(".angryface")
        let chooseface = Math.floor(Math.random() * face.length);
        face[chooseface].style.pointerEvents = "all";
        face[chooseface].style.animation = "faceup 2s ease";
        face[chooseface].addEventListener("animationend",()=>{
            face[chooseface].style.pointerEvents = "all";
            face[chooseface].style.animation = "facedown 0.5s ease";
            face[chooseface].addEventListener("animationend",()=>{
                face[chooseface].style.pointerEvents = "none";
            })
        })
        }
    }, 1000);
})