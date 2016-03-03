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
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc])\s*(?:to)?\s*([fkc])$/i,

        expresion = XRegExp('(?<num>    ^[ ]*[-+]?[0-9](.[0-9]+)?[ ]*((e[+-]?[ ]*[0-9]+)?)[ ]*)\n\
                           (?<temp1>    [ ]*([fkcFKC]))\n\
                           (?<to>       [ ]*(?:to)?[ ]*)\n\
                           (?<temp2>    [fkcFKC])[ ]*$'),

       valor = valor.match(regexp);
    ///    valor = XRegExp.exec(valor, expresion);

   if (valor) {
   //if (match) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase(),
          tipo2  = valor[3].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (tipo2 == 'f')
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit.";
          if (tipo2 == 'k')
          elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin.";

          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (tipo2 == 'c')
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'k')
          elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (tipo2 == 'c')
          elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'f')
          elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          break;

        default:
          elemento.innerHTML = "ERROR! Intenta algo como '-4.2C' ";
      }
    }
    else
      elemento.innerHTML = "";
  }

})(this);
