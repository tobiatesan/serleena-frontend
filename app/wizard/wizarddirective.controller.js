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
   * Name: WizardDirectiveController
   * Package: Wizard
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   *
   */

angular.module('wizard').controller('WizardDirectiveController', WizardDirectiveController);

/**
  * Classe che gestisce una generica procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  */

function WizardDirectiveController($scope) {
  /**
   * Array di oggetti $scope dei vari step.
   *
   * @name steps
   * @type Array
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.steps = [];
  /**
   * Indice dello step corrente.
   *
   * @name currentStepIndex
   * @type Number
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.currentStepIndex = 0;
  /**
   * Passa ad un altro step.
   *
   * @function toggleStep
   * @memberOf WizardDirectiveController
   * @instance
   * @private
   * @param {Number} index - Indice dello step a cui deve passare.
   */
  var toggleStep = function(index){
    $scope.steps[$scope.currentStepIndex].currentStep = false;
    $scope.currentStepIndex = index;
    $scope.steps[$scope.currentStepIndex].currentStep = true;
  };
  /**
   * Inserisce uno step nell'array di step.
   *
   * @function registerStep
   * @memberOf WizardDirectiveController
   * @instance
   * @param {Scope} step - Step da aggiungere.
   */
  this.registerStep = function(step){
    $scope.steps.push(step);
  };
  /**
   * Verifica che esista uno step successivo a quello corrente.
   *
   * @function hasNext
   * @memberOf WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.hasNext = function(){
    return $scope.currentStepIndex < ($scope.steps.length - 1);
  };
  /**
   * Verifica che esista uno step precedente a quello corrente.
   *
   * @function hasPrevious
   * @memberOf WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.hasPrevious = function() {
    return $scope.currentStepIndex > 0;
  };
  /**
   * Verifica che lo step corrente sia l'ultimo del wizard.
   *
   * @function hasNext
   * @memberOf WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.isFinal = function() {
    return $scope.currentStepIndex == ($scope.steps.length - 1);
  };
  /**
   * Passa allo step successivo e invia un segnale al controller superiore nella
   * gerarchia.
   *
   * @function nextStep
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.nextStep = function(){
    if ($scope.hasNext()){
      toggleStep($scope.currentStepIndex + 1);
    }
    //emit
    $scope.$emit('hhWizardNextStep', $scope.currentStepIndex);
  };
  /**
   * Passa allo step precedente e invia un segnale al controller superiore nella
   * gerarchia.
   *
   * @function previousStep
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.previousStep = function(){
    if ($scope.hasPrevious()){
      toggleStep($scope.currentStepIndex - 1);
    }
  };
}
