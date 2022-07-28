function ValidaCPF (cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo',{
        enumerable: true,
        //essa metodo é apenas para garantir que vai ser lido somente numeros (abaixo tem o metodo ValidaCPF.prototype.mascara(cpf)
        //que NAO permite entrar com caracteres diferentes de numeros)
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

//metodo de validação principal, onde utiliza os metodos abaixo
ValidaCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.eUmaSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.validaDigito(cpfParcial);
    const digito2 = this.validaDigito(cpfParcial + digito1);
    const cpfValidado = cpfParcial + digito1 + digito2;

    return cpfValidado === this.cpfLimpo;
}

//metodo que faz o calculo do cpf para valida-lo
ValidaCPF.prototype.validaDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((acumulador, valor) => {
        acumulador += (regressivo * Number(valor));
        regressivo--;
        return acumulador
    }, 0)
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
}

//metodo que valida se os numeros são uma sequencia de digitos iguais como 111.111.111-11
ValidaCPF.prototype.eUmaSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length) 
    return sequencia === this.cpfLimpo;
}

//metodo de fazer a mascara
ValidaCPF.prototype.mascara = function(cpf){
   
    var valor = cpf.value;
   
   if(isNaN(valor[valor.length-1])){ // impede entrar outro caractere que não seja número
      cpf.value = valor.substring(0, valor.length-1);
      return;
   }
   
   cpf.setAttribute("maxlength", "14");
   if (valor.length == 3 || valor.length == 7) cpf.value += ".";
   if (valor.length == 11) cpf.value += "-";
}


//LEMBRAR QUE PARA PEGAR O VALOR DE UM INPUT DEVE-SE ESCREVER COMO O EXEMPLO => variavel.value
document.addEventListener('click', (e) => {
    const elemento = e.target;
    const inserirCPF = document.querySelector('.cpf');

    //instanciando variavel cpf
    const cpf = new ValidaCPF(inserirCPF.value);
    //inserirCPF.value pega o valor digitado no input text com a class="cpf"
    if (elemento.classList.contains('btnValidar')){
        if (cpf.valida()){
            alert(`CPF ${cpf.cpfLimpo} é valido`);
        } else {
            alert(`CPF ${cpf.cpfLimpo} é INVALIDO`);
    
        }
    }
});




