/**
 * Testes para as funções de validação do formulário
 */

// Importar funções de validação (em um ambiente real, estas seriam importadas do arquivo principal)
// Como estamos apenas testando a lógica, vamos recriar as funções aqui

const validationFunctions = {
    // Validar campo obrigatório
    validateRequired: function(value, fieldName) {
        if (!value.trim()) {
            return {
                isValid: false,
                message: `O campo ${fieldName} é obrigatório.`
            };
        }
        return { isValid: true };
    },
    
    // Validar formato de e-mail
    validateEmail: function(email) {
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!re.test(String(email).toLowerCase())) {
            return {
                isValid: false,
                message: "Por favor, insira um e-mail válido."
            };
        }
        return { isValid: true };
    },
    
    // Validar formato de telefone
    validatePhone: function(phone) {
        const re = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        if (!re.test(phone)) {
            return {
                isValid: false,
                message: "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX."
            };
        }
        return { isValid: true };
    },
    
    // Validar nome (apenas letras e espaços)
    validateName: function(name) {
        const re = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!re.test(name)) {
            return {
                isValid: false,
                message: "Por favor, insira um nome válido (apenas letras)."
            };
        }
        if (name.trim().length < 3) {
            return {
                isValid: false,
                message: "O nome deve ter pelo menos 3 caracteres."
            };
        }
        return { isValid: true };
    }
};

// Testes para validação de campos obrigatórios
console.log('Teste 1: Campo obrigatório vazio');
const test1 = validationFunctions.validateRequired('', 'Nome');
console.assert(test1.isValid === false, 'Falha: Campo vazio deveria ser inválido');
console.assert(test1.message === 'O campo Nome é obrigatório.', 'Falha: Mensagem de erro incorreta');

console.log('Teste 2: Campo obrigatório preenchido');
const test2 = validationFunctions.validateRequired('João', 'Nome');
console.assert(test2.isValid === true, 'Falha: Campo preenchido deveria ser válido');

// Testes para validação de e-mail
console.log('Teste 3: E-mail válido');
const test3 = validationFunctions.validateEmail('usuario@dominio.com');
console.assert(test3.isValid === true, 'Falha: E-mail válido marcado como inválido');

console.log('Teste 4: E-mail inválido (sem @)');
const test4 = validationFunctions.validateEmail('usuariodominio.com');
console.assert(test4.isValid === false, 'Falha: E-mail sem @ deveria ser inválido');

console.log('Teste 5: E-mail inválido (sem domínio)');
const test5 = validationFunctions.validateEmail('usuario@');
console.assert(test5.isValid === false, 'Falha: E-mail sem domínio deveria ser inválido');

// Testes para validação de telefone
console.log('Teste 6: Telefone válido');
const test6 = validationFunctions.validatePhone('(11) 98765-4321');
console.assert(test6.isValid === true, 'Falha: Telefone válido marcado como inválido');

console.log('Teste 7: Telefone inválido (formato incorreto)');
const test7 = validationFunctions.validatePhone('11987654321');
console.assert(test7.isValid === false, 'Falha: Telefone com formato incorreto deveria ser inválido');

// Testes para validação de nome
console.log('Teste 8: Nome válido');
const test8 = validationFunctions.validateName('João Silva');
console.assert(test8.isValid === true, 'Falha: Nome válido marcado como inválido');

console.log('Teste 9: Nome inválido (com números)');
const test9 = validationFunctions.validateName('João123');
console.assert(test9.isValid === false, 'Falha: Nome com números deveria ser inválido');

console.log('Teste 10: Nome inválido (muito curto)');
const test10 = validationFunctions.validateName('Jo');
console.assert(test10.isValid === false, 'Falha: Nome muito curto deveria ser inválido');

console.log('Todos os testes de validação concluídos!');