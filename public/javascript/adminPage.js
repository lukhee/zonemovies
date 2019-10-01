let comingSoon = document.getElementById("comingSoonDiv")
let nowShowing = document.getElementById("nowShowing")
let changedDiv = document.getElementsByClassName('comingSoon');
let formDiv = document.getElementById("createMovieDiv");
function switchBetweenCat(val){
    if(val==1){ 
        for (var i = 0; i < changedDiv.length; i++) {
            changedDiv[i].classList.remove("d-none");
            formDiv.action = "createMovie/nowShowing"
        }
        console.log(comingSoon)
        nowShowing.classList.add("movieCat")
        nowShowing.classList.remove("button")
        comingSoon.classList.remove("movieCat")
        comingSoon.classList.add("button")
        console.log(nowShowing)
    }else{
        for(var i = 0; i<changedDiv.length; i++){
            changedDiv[i].classList.add("d-none");
        }
        formDiv.action = "createMovie/comingSoon"
        nowShowing.classList.add("button")
        nowShowing.classList.remove("movieCat")
        comingSoon.classList.remove("button")
        comingSoon.classList.add("movieCat")
        console.log(comingSoon)
    }
}