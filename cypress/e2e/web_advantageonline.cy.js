/// <reference types="cypress"/>
describe('Buscar Produto no Site', () =>{

    it('Buscar um produto válido', () =>{
        //Dado que o usuário acesse a Home Page na URL "https://advantageonlineshopping.com/#/"
        cy.visit('https://advantageonlineshopping.com/#/')
        //E utilize o campo de busca para procurar por "SPEAKER"
        cy.get('#mobileSearch > .roboto-medium')
            .type('SPEAKER')
        cy.get('#mobileSearch > #menuSearch')
            .click()
        //Quando clicar na imagem correspondente ao produto encontrado
        cy.get('[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(1)')
            .click()
        //Então deve ser redirecionado para a página do produto "SPEAKER"     
    })

    it('Buscar um produto inexistente', () =>{
        //Dado que o usuário acesse a Home Page na URL "https://advantageonlineshopping.com/#/"
        cy.visit('https://advantageonlineshopping.com/#/')
        //E utilize o campo de busca para procurar por "AVIÃO" (PRODUTO INEXISTENTE)
        cy.get('#mobileSearch > .roboto-medium')
            .type('AVIÃO')
        //Quando pressionar Enter ou clicar em buscar
        cy.get('#mobileSearch > #menuSearch')
            .click()
        //Então deve ser exibida uma mensagem informando que o produto não foi encontrado
        // Verificar se o texto "Olá, Mundo!" está visível na tela
        cy.contains('No results for "AVIÃO"').should('be.visible');
    })

    it('Incluir Produto no Carrinho', () => {
        //Dado que o usuário esteja na página de produtos "SPEAKER"
        cy.visit('https://advantageonlineshopping.com/#/')
        cy.get('#mobileSearch > .roboto-medium')
            .type('SPEAKER')
        cy.get('#mobileSearch > #menuSearch')
            .click()
        //E clique no produto “Bose Soundlink Bluetooth Speaker III"
        cy.get('[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(2)')
            .click()
        //E abra a página do produto específico
        //Quando clicar no botão “ADD TO CART”
        cy.get('.fixedBtn > .roboto-medium')
            .click()
        //Então o produto "Bose Soundlink Bluetooth Speaker III" deve ser adicionado ao carrinho de compra
        //E uma modal do carrinho de compra com o Produto adicionado deve ser exibida
        cy.get('#checkOutPopUp').should('include.text', 'CHECKOUT')
      
    })

    it('Tela de Pagamento - botao checkout', () =>{
        cy.visit('https://advantageonlineshopping.com/#/')
        cy.get('#mobileSearch > .roboto-medium')
            .type('SPEAKER')
        cy.get('#mobileSearch > #menuSearch')
            .click()
        cy.get('[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(2)')
            .click()
        cy.get('.fixedBtn > .roboto-medium')
            .click()
        //Dado que o carrinho de compras contém pelo menos 1 produto
        //Quando o usuário clicar no botão “CHECKOUT”
        cy.get('#checkOutPopUp')
            .click()
        //Então deve ser redirecionado para a tela de “ORDER PAYMENT”
        cy.contains('ORDER PAYMENT').should('be.visible')
        //E os produtos no carrinho devem ser exibidos com nome, preço e quantidade corretos
        cy.get('#userCart > #toolTipCart > :nth-child(1) > table > tbody > #product > :nth-child(2) > a > h3.ng-binding').should('have.text','BOSE SOUNDLINK BLUETOOTH SP...')
    })

    it('Tela de Pagamento - Carrinho de Compra', () =>{
        cy.visit('https://advantageonlineshopping.com/#/')
        cy.get('#mobileSearch > .roboto-medium')
            .type('SPEAKER')
        cy.get('#mobileSearch > #menuSearch')
            .click()
        cy.get('[data-ng-show="([] | productsFilterForCategoriesProduct:searchResult:minPriceToFilter:maxPriceToFilter:productsInclude).length != 0"] > ul > :nth-child(2)')
            .click()
        cy.get('.fixedBtn > .roboto-medium')
            .click()
        //Dado que o carrinho de compras contém pelo menos 1 produto
        //Quando o usuário clicar no botão “CARRINHO DE COMPRA”
        cy.get('#shoppingCartLink')
        .click()
        //Então deve ser redirecionado para a tela de “SHOPPING CART (1)”
        cy.contains('SHOPPING CART (1)').should('be.visible')
        //E os produtos no carrinho devem ser exibidos com nome, preço e quantidade corretos
        cy.get('tr.ng-scope > :nth-child(2) > .roboto-regular').should('have.text','BOSE SOUNDLINK BLUETOOTH SPEAKER III')
    })
})