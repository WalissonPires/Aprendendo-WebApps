/* 
	Formato da mensagem ---------

		Mensagem {
			usuario,
			texto,
			horario,
			emocao
		}

	-----------------------------
}
*/

/*  -----  Inicialização ------  */

$('#input-mensagem').keyup(function (e) {

	var $input = $('#input-mensagem');

	if ((e.keyCode == 13) && ($input.val() != ""))  {
		enviarMensagem($input.val());
		$input.val("");
	}

	if ($input.val() != "") {
		$('.mensagem-botao-envio-icone').attr('src', 'img/icone-envio.png');
	} else {
		$('.mensagem-botao-envio-icone').attr('src', 'img/icone-gravacao.png');
	}

	return false;
});

$('.botao-anexo').click(function (e) {
	$('.menu-opcoes').toggleClass('menu-opcoes-aberto');
});

$('.botao-opcoes').click(function (e) {
	$('.menu-popup').toggleClass('menu-popup-aberto');
});

$('.botao-ligar,.menu-popup-lista-item').click(function (e) {
	$('.dialogo-container').addClass('dialogo-aberto');
});

$('.dialogo-botao-positivo').click(function (e) {
	$('.dialogo-container').removeClass('dialogo-aberto');
});

$('.mensagem-botao-envio').click(function(e) {

	if ($('#input-mensagem').val() != "") {
		var keyEvent = jQuery.Event('keyup', { keyCode: 13});
		$('#input-mensagem').trigger(keyEvent);
	} else {
		$('.dialogo-container').addClass('dialogo-aberto');
	}
});

$('.campo-corpo img').click(function(e) {
	$('.dialogo-container').addClass('dialogo-aberto');
});


/*  ----- Funções de apoio ----- */

function falar(texto, callbackSuccess, callbackError) {

	texto = encodeURIComponent(texto);

	$.ajax({
		url: 'http://www.personalityforge.com/api/chat/?apiKey=jDc2JqWuADdbXLO7&chatBotID=6&message=' + texto + '&externalID=abc-639184572&firstName=Tugger&lastName=Sufani&gender=m',
		method: 'GET',
		success: function (resposta) {

			resposta = JSON.parse(resposta);

			if (resposta.success != 1) {

				if (callbackError != undefined)
					callbackError(resposta.errorMessage);
			}
			else {

				var data = new Date();
				var horarioAtual = data.getHours() + ':' + data.getMinutes();

				callbackSuccess({
					usuario: resposta.message.chatBotName,
					texto: resposta.message.message,
					emocao: resposta.message.emotion,
					horario: horarioAtual
				});
			}
		}, 
		error: callbackError
	});
};

function addMensagemEsqueda(mensagem) {

	var msg = $($('#chat-mensagem-modelo').children().eq(1).html());

	$('[name="mensagem-texto-conteudo"]', msg).html(mensagem.texto);
	$('[name="chat-mensagem-horario"]', msg).html(mensagem.horario);

	$(".area-chat").append(msg);
}

function addMensagemDireita(mensagem) {

	var msg = $($('#chat-mensagem-modelo').children().eq(0).html());

	$('[name="mensagem-texto-conteudo"]', msg).html(mensagem.texto);
	$('[name="chat-mensagem-horario"]', msg).html(mensagem.horario);

	$(".area-chat").append(msg);
}

function enviarMensagem(texto) {

	var data = new Date();
	var horarioAtual = data.getHours() + ':' + data.getMinutes();

	addMensagemDireita({
		texto: texto, 
		horario: horarioAtual, 
		emotion: undefined, 
		usuario: undefined
	});

	rolarScroll();

	falar(
		texto, 
		function(resposta) {
			addMensagemEsqueda(resposta);

			rolarScroll();
		},
		function(erro) {
			alert(erro);
		}
	);
}


function rolarScroll() {

	var container = document.getElementsByClassName("area-chat")[0];
	container.scrollTop = container.scrollHeight;
}