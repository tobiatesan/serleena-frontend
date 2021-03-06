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


/**
   * Name: LogoutController
   * Package: Authentication
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Crea file
   * 1.0.0        Antonio Cavestro     Prima implementazione metodi
   *
   */

angular.module('authentication').service('UserService', UserService);

/**
  * Classe singleton che implementa la comunicazione con il backend per le
  * richieste relative alla gestione utente.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Espone dei metodi tramite i quali RegisterController, e
  * PasswordRecoveryController possono interagire con il backend per la gestione
  * dell’utente.
  * @constructor
  * @memberOf Authentication
  * @param {Service} $http - Facade di AngularJS per la comunicazione via
  * XMLHttpRequest (Ajax)
  * @param {String} BACKEND_URL - Indirizzo del backend (iniettato in fase di
  * configurazione)
  */

function UserService($http, BACKEND_URL) {
  /**
   * Implementa la comunicazione con il server per effetturare la registrazione
   * utente.
   * @function registerUser
   * @memberOf Authentication.UserService
   * @instance
   * @param {String} email
   * @param {String} password
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var registerUser = function(email, password, callback){
    $http({
      url: BACKEND_URL + "/users",
      method: 'POST',
      data: {
        username: email,
        password: password
      }
    }).success(function(data, status, headers, config){
      callback(true, data);
    }).error(function(data, status, headers, config){
      callback(false, data);
    });
  };
  /**
   * Implementa la comunicazione con il server per effetturare il recupero della
   * password utente.
   * @function recoverUser
   * @memberOf Authentication.UserService
   * @instance
   * @param {String} email
   * @param {function} callback - Funzione da invocare al ritorno dei dati dal
   * backend
   */
  var recoverUser = function(email, callback){
    $http({
      url: BACKEND_URL + "/users/recovery",
      method: 'PUT',
      data: {
        email: email
      },
    }).success(function(data, status, headers, config){
      callback(true, data);
    }).error(function(data, status, headers, config){
      callback(false, data);
    });
  };

  return {
    registerUser: registerUser,
    recoverUser: recoverUser
  };
}
