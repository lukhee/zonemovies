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

    // // increase and decrease
    // $("#increase").click(function(){
    //     $("#quantity").html(function (i, origText) {
    //         let value = parseInt(origText, 10)
    //         if(value >= 10){
    //            let totalPrice = 10
    //             finalePrice = totalPrice * price
    //             $("#price").text(finalePrice);
    //             return 10
    //         }
    //         let totalPrice = value + 1
    //         finalePrice = totalPrice * price
    //         $("#price").text(finalePrice);
    //         return value + 1
    //     });
    // });
    // $("#decrease").click(function () {
    //     $("#quantity").html(function (i, origText) {
    //         let value = parseInt(origText, 10)
    //         if (value <= 1) {
    //             let totalPrice = value
    //             finalePrice = totalPrice * price
    //             $("#price").text(finalePrice);
    //             return 1
    //         }
    //         let totalPrice = value - 1
    //         finalePrice = totalPrice * price
    //         $("#price").text(finalePrice);
    //         return value - 1
    //     });
    // });
    
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