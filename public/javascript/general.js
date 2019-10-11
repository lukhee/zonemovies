let data = []
function loadData(){
    let inputValue = document.getElementById("data").innerText
    data = JSON.parse(inputValue)
}


let div = document.getElementById("searchList")
let ul = document.createElement("ul")
let newlist

function something() {
    if(newlist){
      newlist.parentNode.removeChild(newlist);
        newlist.innerHTML = ""; 
        div.style.display = "none";
    }
    ul.classList.add("list")
    let input = document.getElementById("search").value
    let filteredData = data.filter(book => book.title.toLowerCase().includes(input.toLowerCase()))
            filteredData.forEach(val => {
                if(input){
                    div.style.display = "block";
                    let li = document.createElement("li")
                    let aLink = document.createElement('a') 
                    aLink.setAttribute('href', "/movie/"+val._id)
                    aLink.innerText = val.title
                    let divlist = div.appendChild(ul)
                    let contentdiv = divlist.appendChild(li)
                    // let listVal = document.createTextNode(val.title)
                    contentdiv.appendChild(aLink)
                }
            })
    newlist = document.getElementsByClassName("list")[0]
}


// var mydiv = document.getElementById("myDiv");
// var aTag = document.createElement('a');
// aTag.setAttribute('href', "yourlink.htm");
// aTag.innerText = "link text";
// mydiv.appendChild(aTag);
