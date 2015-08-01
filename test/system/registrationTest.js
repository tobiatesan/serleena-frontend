/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


describe('La pagina di registrazione', function () {
  browser.get('#/register');

  it('dovrebbe far registrare un nuovo utente', function () {
    element(by.model('email')).sendKeys(browser.params.login.email);
    element(by.model('password')).sendKeys(browser.params.login.password);
    element(by.buttonText('Registrati')).click();

    element(by.css('.alert-success')).isDisplayed().then( function (isReally) {
      expect(isReally).toBe(true);
    });
  });

  it ('dovrebbe proseguire con il pairing', function () {
    element(by.css('a.btn-primary')).click();
  });

  it('e il pairing dovrebbe andare a buon fine', function () {
    element(by.model('tempToken')).sendKeys(browser.params.pair.token);
    element(by.buttonText('Esegui')).click();

    element(by.css('.panel-success')).isDisplayed().then( function (isReally) {
      expect(isReally).toBe(true);
    });
  });
});