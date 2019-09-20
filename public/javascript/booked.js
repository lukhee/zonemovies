$(document).ready(function () {

    const price = parseInt($("#price").text())
    $("#quantity").change(function(){
        let quantity = parseInt($("#quantity").val())
        $("#price").text(quantity*price)
    })

    // // initial movie quantity
    // var price = parseInt($("#price").text())
    // var finalePrice = parseInt($("#price").text())
    // let quantity = 1
    // $("#quantity").text(quantity);
    
    // // movie ticket info
    // $("#movieTicket").click(function(e){
    //     e.preventDefault();
    //     let MovieDetails = {
    //         movieInfo : {
    //             day : $("#day").val(),
    //             time: $("#time").val(),
    //             quantity: $("#quantity").val(),
    //             total: finalePrice
    //         },

    //         userInfo:{
    //             name: $("#name").val(),
    //             email: $("#email").val(),
    //             phoneNo: $("#phoneNo").val()
    //         }
    //     }

    //     console.log(MovieDetails)

    // })

})