function countDown(){


    var deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 20);
    var x = setInterval(function() { 
    var now = new Date(); 
    var t = deadline - now; 
    var seconds = Math.floor((t % (1000 * 60)) / 1000); 
    document.getElementById("demo").innerHTML = seconds + "s "; 
        if (t < 0) { 
            clearInterval(x); 
            document.getElementById("demo").innerHTML = "BYE"; 
            window.location.href = "/allmovies"
        } 
    }, 1000);
}