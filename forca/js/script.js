0/*var botao = document.getElementById("btnCadastrar");
botao.onclick = function(){
    event.preventDefault();
    alert("mensagem marota");
}*/
var comecou = false;
var letrasChutadas = [];
var palavra = "";
var erro = 0;

//$seletor do HTML
$("#btnCadastrar").click(function (event) {
    event.preventDefault();


    //Declarar variavel paravra com valor do input
    palavra = $("#palavra").val();
    //Verificar se o campo está vazio
    if (palavra === "") {
        //Se estiver vazio mostra mensagem de erro
        alert("Por favor preencha o campo");
    } else {
        //Se não estiver vazio montar as underlines
        palavra = palavra.trim();
        for (i = 0; i < (palavra.length); i++) {
            var span = $("<span>" + palavra[i] + "</span>");
            span.appendTo(".letras");
        }
        $("#forca").addClass("visivel");

        $("#cadastro").removeClass("visivel");
        //BUG FIX
        comecou = true;
    }
});

$(document).keydown(function (event) {
    if (comecou) {
        var letra = event.key;
        //validando apenas se é uma letra
        if (letra.length > 1) { //funciona apenas se for digitada uma letra
            return;
        }
        //Vai verificar se a letra já foi utilizada
        if (letrasChutadas.indexOf(letra) != -1) {
            return;
        }
        //console.log = (event);
        //registrar letra utilizada
        letrasChutadas.push(letra);
        var span = $("<span>" + letra + "</span>");
        span.appendTo(".letras-usadas");
        //Letra existe na palavra cadastrada?
        if (palavra.indexOf(letra) != -1) { //BUG FIX não chutar a mesma letra varias vezes
            //Se sim 
            //mostra no campo a letra correspondente
            for (var i = 0; i < palavra.length; i++) {
                var letra2 = palavra[i];
                //se a letra que precionei for igual a letra que estou inteirando
                if (letra == letra2) {
                    //i é o indice que temos que mostrar na tela
                    $(".letras span").eq(i).addClass("visivel");
                }
            }
            //se palavra estiver completa
            if ($(".letras span:not(.visivel)").length == 0) {
                //mostra final correto
                $("#ganhou").addClass("visivel");
                $("#forca").removeClass("visivel");
            }
            //se não 
        } else {
            //mostra o membro do boneco
            $(".corpo *").eq(erro).attr("class", "st0 visivel");
            erro++;
            //se excedeu as tentativas
            //Mostra a família triste
            if (erro == 6) {
                $("#perdeu").addClass("visivel");
                $("#forca").removeClass("visivel");
            }
        }

    }
});

$(".btn-recomecar").click(function (event) {

    $(".corpo *").attr("class", "st0");

    comecou = false;
    palavra = "";
    $("#palavra").val("");
    acerto = 0;
    erro = 0;
    letrasChutadas = [];

    $("#forca .letras").html("");
    $("#forca .letras-usadas").html("");

    $("#cadastro").addClass("visivel");
    $("#perdeu").removeClass("visivel");
    $("#ganhou").removeClass("visivel");
});
