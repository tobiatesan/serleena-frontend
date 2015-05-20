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
   * Name: ExperienceDetailsController
   * Package: Experience
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('experience').controller('ExperienceDetailsController',
					ExperienceDetailsController);
/**
  * Classe per la gestione della visualizzazione dei dettagli relativi a
  * un’esperienza. Nel costruttore carica tramite ExperienceService le
  * informazioni relative all'esperienza e tutti i percorsi ad essa associati.
  * Inoltre, disegna le varie informazioni sulle relative mappe, in base alla
  * loro tipologia.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} $routeParams - Service che gestisce il recupero dei
  * parametri passati via url.
  * @param {Service} ExperienceService - Service che gestisce la comunicazione
  * con il backend per quanto riguarda la gestione delle esperienze.
  * @param {Provider} Map - Provider che fornisce l'instanza del gestore della
  * mappa.
  */

function ExperienceDetailsController($scope, $routeParams, ExperienceService,
    Map) {
  /**
   * Indice dell'esperienza di cui visualizzare i dettagli.
   *
   * @name experienceId
   * @type Number
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.experienceId = $routeParams.experienceId;
  /**
   * Oggetto contenente le informazioni dell'esperienza.
   *
   * @name experience
   * @type Object
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.experience = {};
  /**
   * Oggetto contenente le varie mappe visualizzate.
   *
   * @name maps
   * @type Object
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.maps = {};
  /**
   * Indice del percorso attualmente visualizzato.
   *
   * @name currentTrackIndex
   * @type Number
   * @default -1
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.currentTrackIndex = -1;
  /**
   * Oggetto mappa del percorso attualmente visualizzato.
   *
   * @name currentTrackDraw
   * @type Object
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.currentTrackDraw = null;
  /**
   * Array contenente i checkpoint creati dalla mappa e appartenenti al
   * percorso attualmente visualizzato.
   *
   * @name currentCheckpoints
   * @type Array
   * @memberOf ExperienceDetailsController
   * @instance
   */
  $scope.currentCheckpoints = [];

  ExperienceService.getExperienceDetails($scope.experienceId, function(ok, data){
    if(ok){
      $scope.experience = data;
      for (var m in $scope.maps){
        $scope.maps[m].map = Map.initMapFromPerimeter($scope.maps[m].id,
          $scope.experience.perimeter.ne, $scope.experience.perimeter.sw);
      }
      $scope.experience.poi.forEach(function(p){
        Map.drawPOI($scope.maps.poi.map, p.lat, p.lng, p.name);
      });
      $scope.experience.userpoints.forEach(function(p){
        Map.drawCustomPointFromPosition($scope.maps.points.map, p.lat, p.lng);
      });
      $scope.experience.tracks.forEach(function(t){
        ExperienceService.getTrackDetails($scope.experienceId, t.id, function(ok, data){
          if (ok){
            t.checkpoints = data;
          }
        });
      });
    }
  });
}
