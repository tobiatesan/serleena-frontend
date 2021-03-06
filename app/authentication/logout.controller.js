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
   * Author: Matteo Lisotto
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Crea file
   * 1.0.0        Antonio Cavestro     Aggiungi funzione di logout
   *
   */

angular.module('authentication').controller('LogoutController',
  LogoutController);

/**
  * Classe per la gestione della disconnessione di un utente.
  *
  * @example L’applicativo è configurato tramite App.AppConfiguration per
  * invocare questo controller quando il browser richiede la pagina di logout.
  * Tramite AuthService cancella il cookie creato al momento dell’autenticazione
  * e notifica LogoutView dell’esito della richiesta.
  * @author Antonio Cavestro <antonio.cavestro@gmail.com>
  * @version 1.0
  * @constructor
  * @memberOf Authentication
  * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
  * controller (il model) ed in cui vengono valutate le espressioni utilizzate
  * nella view.
  * @param {Service} $location - Facade di AngularJS con il quale interagire
  * per gestire la history del browser e gli indirizzi.
  * @param {Service} AuthService - Servizio che gestisce autenticazione utente.
  */
function LogoutController($scope, $location, AuthService) {
  /**
   * Effettua logout utente.
   * @function logoutUser
   * @memberOf Authentication.LogoutController
   * @instance
   */
  $scope.logoutUser = function(){
    AuthService.logoutUser(function(){
      $location.path("/");
    });
  };
}
