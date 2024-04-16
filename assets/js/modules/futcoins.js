(function($){
	var containerInstruction = $(".instruction_slick")
	var containerHelp = $(".help_slick")

	var produto = [117475,118227,118189,108715,71019,116118,116119,116120,116123,116125,117175,115834];

	var template_produtos =
	'<div class="item">' +
	  '<a class="link">' +
		'<div class="foto"><span class="discount d-none"></span>' +
		  '<span class="thumb">' +
			'<img class="lozad img-fluid" src="assets/img/pixel-2.png">' +
		  '</span>' +
		'</div>' +
		'<div class="tags"></div>' +
		'<h2 class="title"></h2>' +
		'<div class="price"></div>' +
		'<div class="product-variants">' +
		  '<div class="variants-slider"></div>' +
		'</div>' +
		'<div class="product-actions"></div>' +
	  '</a>' +
	'</div>';
  
	var vitrine = $('#vitrine-fut');
	var itens = $('#vitrine-fut').attr('data-products');
  
	  $.getJSON('https://www.futfanatics.com.br/web_api/products?id=' + produto, '', function (data) {
		  if (data) {
			  var variants = [];
  
			  data.Products.forEach(function(dataProduct){
  
				  var product = dataProduct.Product
  
				  if (product.available != 0) {
					  var template = jQuery(template_produtos);
  
					  var link = product.url.https;
					  var img = product.ProductImage[0].thumbs[180].https;
					  var title = product.name;
					  var pricePromo = product.promotional_price;
					  var price = product.price;
					  var percentDiscount = 100 - (pricePromo/price) * 100;
					  var payment = product.payment_option;
					  var personalization = product.Properties['Permite Personalização'] == 'Sim' ? true : false;
					  var release = product.release == "1" ? true : false;
  
					  template.find('.link').attr('href', link);
					  template.find('.foto span img').attr('src', img);
					  template.find('.title').html(title);
  
					  if (percentDiscount < 100) {
						  template.find('.foto .discount').html('<i class="icon-arrow-down-fill"></i>' + percentDiscount.toFixed() + '%').removeClass('d-none');
					  }
  
					  // lozad('.lozad', {
					  //     load: function(target)
   
					  //             target.src = target.dataset.src;
					  //             target.onload = function() {
					  //                 target.classList.add('fadein');
					  //             }
					  //     }
					  // }).observe();
  
					  if (release && pricePromo != 0 && personalization) {
						  template.find('.tags').html('<span class="lancamento">Lançamento</span> <span class="oferta">Oferta</span>');
					  } else if (pricePromo != 0 && personalization) {
						  template.find('.tags').html('<span class="oferta">Oferta</span> <span class="personalize">Personalize</span>');
					  } else if (product.release && pricePromo != 0) {
						  template.find('.tags').html('<span class="lancamento">Lançamento</span><span class="oferta">Oferta</span>');
					  } else {
  
						  if (release) {
							  template.find('.tags').html('<span class="lancamento">Lançamento</span>');
						  } else if (pricePromo != 0) {
							  template.find('.tags').html('<span class="oferta">Oferta</span>');
						  } else if (personalization) {
							  template.find('.tags').html('<span class="personalize">Personalize</span>');
						  }
					  }
  
					  if (pricePromo != 0) {
						  template.find('.price').html('<div class="old-price">R$ ' + price.replace('.', ',') + '</div><div class="current-price">R$ ' + pricePromo.replace('.', ',') + '</div>');
					  } else {
						  template.find('.price').html('<div class="current-price">R$ ' + price.replace('.', ',') + '</div>');
					  }
					  if (payment) {
						  template.find('.price').append('<div class="installments">' + payment.replace('Sem juros', '').replace('desconto', 'desconto via PIX') + '</div>');
					  }
  
					  
					  // variants[0].forEach(function(row){
					  //     if (row) {
					  //         template.find('.variants-slider').append(
					  //             '<div class="variants-item">' +
					  //                 '<button type="button" data-variant="'+ row.Variant.id +'">' + 
					  //                     row.Variant.Sku[0].value + 
					  //                 '</button>' +
					  //             '</div>'
					  //         );
					  //     }
					  // });
  
					  // template.find('.product-actions').html(
					  //     '<a href="#" class="bt_comprar d-flex justify-content-center" title="Adicionar este item ao seu carrinho">' +
					  //         '<i></i>' +
					  //         '<span>Comprar</span>' +
					  //     '</a>'
					  // );
  
	  //                vitrine.append(template);
					  vitrine.slick('slickAdd', template);
				  }
			  });
  
			  // jQuery.ajax({
			  //     url: "https://www.futfanatics.com.br/web_api/variants?product_id=" + product.id,
			  //     //context: document.body,
			  //     async: false,
			  //     method: "GET",
			  //     crossDomain: true,
			  //   }).done(function(data) {
			  //       console.log("Data:",data);
			  //     variants.push(data.Variants);
			  //   });
				  
			  
		  }
	  });
   
  
	vitrine.html("");
  
	if (isMobile()) {
	  vitrine.slick({
		autoplay: false,
		infinite: true,
		speed: 500,
		arrows: false,
		dots: true,
		slidesToShow: 2,
		slidesToScroll: 2,
		//lazyLoad: 'ondemand',
		prevArrow: $(".slick-nav_vitrine").find(".slick-prev"),
		nextArrow: $(".slick-nav_vitrine").find(".slick-next"),
	  });
	} else {
	  vitrine.slick({
		autoplay: false,
		infinite: true,
		speed: 500,
		arrows: false,
		dots: true,
		slidesToShow: 5,
		slidesToScroll: 2,
  
		prevArrow: $(".slick-nav_vitrine").find(".slick-prev"),
		nextArrow: $(".slick-nav_vitrine").find(".slick-next"),
	  });
	}
  
	function isMobile() {
	  if (window.innerWidth > 991) {
		return false;
	  }
	  return true;
	}
  
	


	containerInstruction.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,

		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				}
			}]
	});

	containerHelp.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows:false,
		dots: true,
		adaptiveHeight: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});
	var target_top = $(window).height();
	$('.works-function').on('click', function(){
		$('html, body').animate({ scrollTop: target_top/3 }, 20);
	});


	$('.home-container a').on('click', function(event){
		event.preventDefault();
		
		var section  = $(this).attr('data-href');
		var top      = $(section).offset().top - 42;
	
		$('html, body').animate({
			scrollTop: top
		}, 800);
	});

	$('.top-button2').on('click', function(event){
		event.preventDefault();
		console.log("foi");
		
		var section  = $(this).attr('data-href');
		var top      = $(section).offset().top - 42;
	
		$('html, body').animate({
			scrollTop: top
		}, 800);
	});
	

	

})(jQuery);

// Seleciona todas as divs de pergunta
const divsPergunta = document.querySelectorAll('.ajuda-pergunta');

// Adiciona um evento de clique para cada div de pergunta
divsPergunta.forEach(function(divPergunta) {
  divPergunta.addEventListener('click', function() {
    // Obtém o ID da pergunta atual
    const perguntaId = this.id;
    // Obtém o número da pergunta a partir do ID
    const perguntaNumero = perguntaId.replace('pergunta', '');
    // Monta o ID da resposta correspondente
    const respostaId = 'resposta' + perguntaNumero;
    // Seleciona a resposta correspondente
    const resposta = document.getElementById(respostaId);
    
    // Verifica se a resposta está visível
    if (resposta.style.display === 'block') {
      // Se estiver visível, oculta-a
      resposta.style.display = 'none';
	 // this.style.borderBottom = 'solid 1px rgba(0, 0, 0, 0.2)'
	  this.querySelector('.ajuda-seta').style.backgroundImage = 'url("https://cdn.futfanatics.com.br/futfanatics-nacional/paginas-personalizadas/futcoins/setasvg2.svg")';
	  if(this.classList.contains("ajuda-master-bot")){
		this.style.borderBottom='solid 1px rgba(0, 0, 0, 0.2)';
		resposta.style.borderBottom='none';
	  }

    } else {
      // Se estiver oculta, exibe-a
      resposta.style.display = 'block';
	 // this.style.borderBottom = 'none';
	  this.querySelector('.ajuda-seta').style.backgroundImage = 'url("https://cdn.futfanatics.com.br/futfanatics-nacional/paginas-personalizadas/futcoins/setacima.svg")';
	  if(this.classList.contains("ajuda-master-bot")){
		this.style.borderBottom='none';
		resposta.style.borderBottom='solid 1px rgba(0, 0, 0, 0.2)';
	  }

    }

	console.log("Entrei aquiii");
  });
});




