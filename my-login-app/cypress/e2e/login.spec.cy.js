describe("Login Form Testleri", () => {
  beforeEach(() => {
    
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form doldurulduğunda submit edebiliyorum", () => {
    cy.get("input[type=email]").type("test@example.com");
    cy.get("input[type=password]").type("Password1");
    cy.get("input[type=checkbox]").check();
    cy.get("button").should("not.be.disabled").click();
    cy.url().should("include", "/success");
    cy.contains("Login Başarılı!");
  });

  it("Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor", () => {
  
    cy.get("input[type=email]").type("test");
    cy.get("input[type=password]").type("Password1");
    cy.get("input[type=checkbox]").check();
    cy.get("p").should("contain", "Geçersiz email");
    cy.get("button").should("be.disabled");

   
    cy.get("input[type=email]").clear().type("test");
    cy.get("input[type=password]").clear().type("pass");
    cy.get("input[type=checkbox]").check();
    cy.get("p").should("have.length", 2);
    cy.get("p").contains("Şifre en az 8 karakter olmalı ve içinde rakam bulunmalı");

    cy.get("input[type=email]").clear().type("test@example.com");
    cy.get("input[type=password]").clear().type("Password1");
    cy.get("input[type=checkbox]").uncheck();
    cy.get("button").should("be.disabled");
  });
  
  it("Email ve password doğru ama kurallar kabul edilmezse buton disabled kalır", () => {
    cy.get("input[type=email]").type("test@example.com");
    cy.get("input[type=password]").type("Password1");
    cy.get("input[type=checkbox]").should("not.be.checked");

    cy.get("button").should("be.disabled");
  });

  it("Herşey yapıldı buton aktif mi", () => {
    cy.get("input[type=email]").type("test@example.com");
    cy.get("input[type=password]").type("Password1");
    cy.get("input[type=checkbox]").check();

    cy.get("button").should("not.be.disabled");
  });
});
