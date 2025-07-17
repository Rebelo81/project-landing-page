/**
 * Testes para as funções de envio de dados do formulário
 */

// Mock da função fetch para simular requisições
const originalFetch = window.fetch;

// Função para simular o envio de dados
async function mockSubmitFormData(formData, shouldSucceed = true) {
    try {
        // Simular uma requisição com fetch
        const response = await (shouldSucceed 
            ? Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) })
            : Promise.reject(new Error('Erro de rede'))
        );
        
        if (response.ok) {
            console.log('Dados enviados com sucesso:', Object.fromEntries(formData.entries()));
            return {
                success: true,
                message: 'Formulário enviado com sucesso!'
            };
        } else {
            throw new Error('Erro no servidor');
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        return {
            success: false,
            message: 'Erro ao enviar formulário. Tente novamente.'
        };
    }
}

// Função para verificar se os dados estão no formato correto
function validateFormData(formData) {
    const requiredFields = ['nome', 'email', 'telefone'];
    let isValid = true;
    let missingFields = [];
    
    requiredFields.forEach(field => {
        if (!formData.has(field) || !formData.get(field)) {
            isValid = false;
            missingFields.push(field);
        }
    });
    
    return {
        isValid,
        missingFields
    };
}

// Testes para envio de dados
console.log('Teste 1: Envio de dados com sucesso');
const formData1 = new FormData();
formData1.append('nome', 'João Silva');
formData1.append('email', 'joao@exemplo.com');
formData1.append('telefone', '(11) 98765-4321');
formData1.append('dataEnvio', new Date().toISOString());

mockSubmitFormData(formData1, true)
    .then(result => {
        console.assert(result.success === true, 'Falha: Envio deveria ter sido bem-sucedido');
        console.log('Teste 1 concluído com sucesso!');
    });

console.log('Teste 2: Envio de dados com falha');
mockSubmitFormData(formData1, false)
    .then(result => {
        console.assert(result.success === false, 'Falha: Envio deveria ter falhado');
        console.log('Teste 2 concluído com sucesso!');
    });

console.log('Teste 3: Validação de dados do formulário');
const formData2 = new FormData();
formData2.append('nome', 'João Silva');
formData2.append('email', 'joao@exemplo.com');
// Telefone está faltando

const validationResult = validateFormData(formData2);
console.assert(validationResult.isValid === false, 'Falha: Formulário sem telefone deveria ser inválido');
console.assert(validationResult.missingFields.includes('telefone'), 'Falha: Campo telefone deveria estar na lista de campos faltantes');
console.log('Teste 3 concluído com sucesso!');

console.log('Teste 4: Validação de dados completos');
const formData3 = new FormData();
formData3.append('nome', 'João Silva');
formData3.append('email', 'joao@exemplo.com');
formData3.append('telefone', '(11) 98765-4321');

const validationResult2 = validateFormData(formData3);
console.assert(validationResult2.isValid === true, 'Falha: Formulário completo deveria ser válido');
console.assert(validationResult2.missingFields.length === 0, 'Falha: Não deveria haver campos faltantes');
console.log('Teste 4 concluído com sucesso!');

console.log('Todos os testes de envio concluídos!');