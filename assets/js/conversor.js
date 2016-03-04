(function (exports) {
		"use strict";
		function Medida(valor, tipo) {
			this.value = valor;
			this.type = tipo || "";
		}

		function Temperatura(valor, tipo) {
			Medida.call(this, valor, tipo);
		}

		function Celsius(valor) {
			Temperatura.call(this, valor, "c");

			this.toFarenheit = function () {
				return ((valor * 9 / 5) + 32);
			};

			this.toKelvin = function () {
				return (valor + 273.15);
			};
		}

		function Farenheit(valor) {
			Temperatura.call(this, valor, "f");

			this.toKelvin = function () {
				return (((valor + 459.67) * 5) / 9);
			};

			this.toCelsius = function () {
				return (((valor - 32) * 5) / 9);
			};
		}

		function Kelvin(valor) {
			Temperatura.call(this, valor, "k");

			this.toCelsius = function () {
				return (valor - 237.15);
			};

			this.toFarenheit = function () {
				return (((valor * 9) / 5) - 459.67);
			};
		}
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

exports.convertir = function(){
	var valor     = document.getElementById('convert').value;
  var  elemento  = document.getElementById('converted');
	var expresion = XRegExp('^(?<value>[+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?\\s*) # valor \n\
											 (?<type1>[cfk])   #type for number   \n\
											 (?<to>\\s+(?:to\\s+)?)  #optional to string \n\
											 (?<type2>[cfk])\\s*$    #type to convert', 'xi');
  var match = XRegExp.exec(valor,expresion);
  if (match) {
  	var numero = match.value,
        tipo   = match.type1.toLowerCase(),
        tipo2  = match.type2.toLowerCase();
    numero = parseFloat(numero);
    console.log("Valor: " + numero + ", Tipo: " + tipo + " convertir a : " + tipo2);
    switch (tipo) {
      case 'c':
        var celsius = new Celsius(numero);
        if (tipo2 == 'f')
        	elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit.";
        else if (tipo2 == 'k')
        			elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin.";
							else
								elemento.innerHTML = "No se conoce la medida para convertir: " + tipo2;
        break;
      case 'f':
        var farenheit = new Farenheit(numero);
        if (tipo2 == 'c')
        	elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
        else if (tipo2 == 'k')
        			elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
							else
								elemento.innerHTML = "No se conoce la medida para convertir: " + tipo2;
        break;
      case 'k':
        var kelvin = new Kelvin(numero);
        if (tipo2 == 'c')
        	elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
        else if (tipo2 == 'f')
        		elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
						else
							elemento.innerHTML = "No se conoce la medida para convertir: " + tipo2;
        break;
      default:
        elemento.innerHTML = "ERROR! Intenta algo como '-4.2C to K' ";
    }
  }
    else
      elemento.innerHTML = "Introduzca algo como 32.5K to C";
  }
})(this);
