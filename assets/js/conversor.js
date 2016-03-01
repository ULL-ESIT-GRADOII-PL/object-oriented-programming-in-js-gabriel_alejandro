(function (exports) {
	"use strict";
	var XRegExp = require('xregexp');
	
	function Medida(valor, tipo) {
		this.value = valor;
		this.type  = tipo;
	}

	function Temperatura(valor, tipo) {
		Medida.call(this,valor,tipo);
	}

	function Celsius(valor) {
		Temperatura.call(this,valor);
		this.toFarenheit = function() {
			return ((this.value * 9 / 5 ) + 32);
		}
		
		this.toKelvin = function() {
			return (this.value + 273.15);
		}
	}

	function Farenheit(valor) {
		Temperatura.call(this,valor);
		this.toKelvin = function () {
			return (((this.value + 459.67) * 5) / 9);
		}
		
		this.toCelsius = function() {
			return (((this.value - 32) * 5) / 9);
		}
	}
	
	function Kelvin(valor) {
		Temperatura.call(this,valor);
		this.toCelsius = function () {
			return (this.value - 237.15);
		}
		
		this.toFarenheit = function () {
			return (((this.value * 9) / 5) - 459.67);
		}
	}
	
	//Definimos la herencia
	Temperatura.prototype = new Medida();
	Temperatura.prototype.constructor = Temperatura;
	Celsius.prototype = new Temperatura();
	Celsius.prototype.constructor =  Celsius;
	Farenheit.prototype = new Temperatura();
	Farenheit.prototype.constructor = Farenheit;
	Kelvin.prototype = new Temperatura();
	Kelvin.prototype.constructor = Kelvin;
	
	exports.Temperatura = Temperatura;
	exports.Celsius = Celsius;
	exports.Farenheit = Farenheit;

	exports.convertir = function () {
		var valor = document.getElementById('convert').value,
			elemento = document.getElementById('converted'),
			/* Extienda la RegeExp a la especificación. use una XRegExp */
			regexp = XRegExp('^(?<numero> ([-+]?\d+[\.\d+?])' + 
											 '(?<exponente> e[+-]?\d+?' + 
											 '?<tipo> [cfk]' +
											 '?<to> (to)?' +
											 '?<resultado> [cfk]', 'xi');
			//regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
			valor = valor.match(regexp);
		if (valor) {
			var numero = valor[1],
			tipo = valor[2].toLowerCase();
			numero = parseFloat(numero);
			console.log("Valor: " + numero + ", Tipo: " + tipo);
			switch (tipo) {
			case 'c':
				var celsius = new Celsius(numero);
				elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
				break;
			case 'f':
				var farenheit = new Farenheit(numero);
				elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
				break;
			case 'k': 
				var kelvin = new Kelvin(numero);
				elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
				break;
			default: alert("Error! No se a que tipo de temperatura te refieres con: " + tipo );
			
			}
		}
		else
			elemento.innerHTML = "";
	}
})(this);
