$(document).ready(function () {

    const price = parseInt($("#price").text())
    $("#quantity").change(function(){
        let quantity = parseInt($("#quantity").val())
        $("#price").text(quantity*price)
    })

})