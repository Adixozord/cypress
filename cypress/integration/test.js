//cookies component
var cookieAccept = '[onclick="Cookiebot.submitCustomConsent(true, true, true); hideCookieBanner();"]';

//header component
var signInButton = "a[class*='login'] span[class='hidden-xs']";

//auth component
var userNameField = '#ShopLoginForm_Login';
var passwordField = '#ShopLoginForm_Password';
var submitButton = '.col-sm-9 > .btn-primary';

//plp component
var addToCartButtons = 'button[class="btn spls-add-to-cart-btn btn-lg btn-block btn-primary stock-check"]';

//minicart component
var miniCartButton = '.quick-cart-link';
var viewCartButton = '.view-cart';

//cart component
var cartItem = ':nth-child(3) > .list-item-row';
var cartItemTitle = '.text-dark-bold';
var cartItemSku = '.product-id';
var cartItemPrice = '.list-item-row > .column-price';

describe("Add a product to cart", function () {
    it("Navigates to storefront", navigateToStorefront);
    it("Accepts the cookies", closeCookies);
    it("Signs in", signIn);
    it("Search for all products", searchForAll);
    it("Adds any product to cart", addRandomProductToCart);
    it("Goes to cart", navigateToCart);
    it("Checks the Cart", verifyPDPElements);
})

function navigateToStorefront() {
    cy.visit("https://www-uat-live.pressel.at/");
}

function closeCookies() {
    cy.get(cookieAccept).click();
    Cypress.Cookies.preserveOnce('CookieConsent', 'remember_token')
}

function signIn() {
    cy.get(signInButton).click();
    cy.get(userNameField).type("adrian.falenczyk@staples-solutions.com");
    cy.get(passwordField).type("Testowe!2345");
    cy.get(submitButton).click();
}

function searchForAll() {
    cy.get('#spls-header-search-bar-id').type("*{enter}");
}

function addRandomProductToCart() {
    cy.get(addToCartButtons).its('length').then(elementCount => {
        let selected = Cypress._.random(elementCount - 1); 
        cy.get(addToCartButtons).eq(selected).click(); 
    });
    cy.get('.loader-wrapper', { timeout: 10000 }).should('be.visible');
}

function navigateToCart() {
    cy.get(miniCartButton).click();
    cy.get(viewCartButton).click();
}

function verifyPDPElements() {
    checkIfElementIsVisible(cartItem);
    checkIfElementIsVisible(cartItemTitle);
    checkIfElementIsVisible(cartItemPrice);
    checkIfElementIsVisible(cartItemSku);
}

function checkIfElementIsVisible(String) {
    cy.get(String, { timeout: 10000 }).should('be.visible');
}