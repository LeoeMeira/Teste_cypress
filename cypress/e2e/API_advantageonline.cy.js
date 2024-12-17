/// <reference types="cypress"/>
describe('Buscar Produtos', () =>{
    
    it('Buscar Produto por Id', () =>{
        cy.request({
            method: 'GET',
            url: 'https://www.advantageonlineshopping.com/catalog/api/v1/products/27'
        })
            .then((resultado) => {
                expect(resultado.status).to.equal(200);
                expect(resultado.body.productId).to.equal(27);
                expect(resultado.body.productName).to.equal("HP Z3600 Wireless Mouse")
            });


    });
})

describe('Atualizar uma imagem de um produto', () => {
    let authToken;
    let userId;

    it('Realizar login como Admin', () => {
        cy.request({
            method: 'POST',
            url: 'https://www.advantageonlineshopping.com/accountservice/accountrest/api/v1/login',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: "Leonardo.meira@gmail.com",
                loginPassword: "Leomeira@1",
                loginUser: "leomeira1234"
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            userId = response.body.statusMessage.userId;
            authToken = response.body.statusMessage.token;
        });
    });

    it('Fazer o upload da imagem com os parâmetros necessários', () => {
        const color = 'FERRUGEM';
        const product_id = 27;
        const source = 'website';

        cy.fixture('imagem.jpg', 'binary').then((fileContent) => {
            const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'image/jpeg');

            const formData = new FormData();
            formData.append('file', blob, 'imagem.jpg');
            formData.append('product_id', product_id);

            cy.request({
                method: 'POST',
                url: `https://www.advantageonlineshopping.com/catalog/api/v1/product/image/${userId}/${source}/${color}`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                body: formData,
                failOnStatusCode: false, 
                encoding: 'binary'
            }).then((response) => {
                expect(response.status).to.equal(200);
                //expect(response.body.reason).to.equal('Product was updated successful');
                //expect(response.body).to.have.property('image_id');
                //const newImageId = response.body.image_id;
                //cy.log(`ID da nova imagem: ${newImageId}`);
            });
        });
    });
});

