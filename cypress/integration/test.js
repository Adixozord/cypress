var cookieAccept = '[onclick="Cookiebot.submitCustomConsent(true, true, true); hideCookieBanner();"]';
var signInButton = "a[class*='login'] span[class='hidden-xs']";

describe("tezt", function() {
    it("Logins to storefront", navigateToStorefront);
    it("Closes the cookies", closeCookies);
    it("Signs in", signIn);
})

function navigateToStorefront() {
    cy.visit("https://www-uat-live.pressel.at/");
}

function closeCookies() {
    cy.get(cookieAccept).click();
}

function signIn() {
    cy.get(signInButton).click();
}