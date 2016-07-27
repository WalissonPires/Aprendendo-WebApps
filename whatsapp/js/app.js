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

	if ((e.keyCode == 13) && ($('#input-mensagem').val() != ""))  {
		enviarMensagem($('#input-mensagem').val());
		return false;
	}
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

	var msg = $('<div class="chat-mensagem"><div class="chat-mensagem-ponta mensagem-esquerda-align"><img src="img/icone-balao-esquerda.png" alt="" class=""></div><div class="chat-mensagem-texto mensagem-esquerda-align mensagem-esquerda-background"><p name="mensagem-texto-conteudo"></p><div class="mensagem-texto-status"><p name="chat-mensagem-horario"></p><img src="img/icone-msg-visualizada.png" alt="" class="chat-mensagem-visualiza"></div></div></div>');

	$('[name="mensagem-texto-conteudo"]', msg).html(mensagem.texto);
	$('[name="chat-mensagem-horario"]', msg).html(mensagem.horario);

	$(".area-chat").append(msg);
}

function addMensagemDireita(mensagem) {

	var msg = $('<div class="chat-mensagem"><div class="chat-mensagem-ponta mensagem-direita-align"><img src="img/icone-balao-direita.png" alt="" class=""></div><div class="chat-mensagem-texto mensagem-direita-align mensagem-direita-background"><p name="mensagem-texto-conteudo"></p><div class="mensagem-texto-status"><p name="chat-mensagem-horario"></p><img src="img/icone-msg-visualizada.png" alt="" class="chat-mensagem-visualiza"></div></div></div>');

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

	$('#input-mensagem').val("");

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