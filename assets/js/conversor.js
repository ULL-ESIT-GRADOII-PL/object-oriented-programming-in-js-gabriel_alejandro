(function (exports) {
		"use strict";

		function Medida(valor, tipo) {
			this.value = valor;
			this.type = tipo;
		}

		function Temperatura(valor, tipo) {
			Medida.call(this, valor, tipo);
		}

		function Celsius(valor) {
			Temperatura.call(this, valor);
			this.toFarenheit = function () {
				return ((this.value * 9 / 5) + 32);
			}

			this.toKelvin = function () {
				return (this.value + 273.15);
			}
		}

		function Farenheit(valor) {
			Temperatura.call(this, valor);
			this.toKelvin = function () {
				return (((this.value + 459.67) * 5) / 9);
			}

			this.toCelsius = function () {
				return (((this.value - 32) * 5) / 9);
			}
		}

		function Kelvin(valor) {
			Temperatura.call(this, valor);
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
		Celsius.prototype.constructor = Celsius;
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
				regexp = XRegExp('^(?<numero> [-+]?\d+[\.\d+?])' +
					'(?<exponente> e[+-]?\d+?)' +
					'(?<tipo> [cfk])' +
					'(?<to> (to)?)' +
					'(?<resultado> [cfk])', 'xi');
			//regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
			var match = XRegExp.exec(valor,regexp);
			console.log(match)
			if (!match.resultado)
				alert("Debe especificar el tipo de resultado");

			else {
				if (match) {
					var numero = match[1],
					tipo = match[2].toLowerCase();
					numero = parseFloat(numero);
					console.log("Valor: " + numero + ", Tipo: " + tipo);
					switch (tipo) {
					case 'c':
						var celsius = new Celsius(numero);
						if(match.resultado == 'f')
							elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
							else if(match.resultado == 'k')
								elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
						break;
					case 'f':
						var farenheit = new Farenheit(numero);
						if(match.resultado == "c")
							elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
							else if(match.resultado == "k")
								elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
						break;
					case 'k':
						var kelvin = new Kelvin(numero);
						if(match.resultado == 'c')
							elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
							else if (match.resultado == 'f')
								elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Kelvin";
						break;
					default:
						alert("Error! No se a que tipo de temperatura te refieres con: " + tipo);

					}
				}
			}
		}
		})(this);
