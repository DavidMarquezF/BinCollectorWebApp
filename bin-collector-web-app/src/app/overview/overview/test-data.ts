export interface GraphHopperRouteOptim {
    copyrights:            string[];
    job_id:                string;
    status:                string;
    waiting_time_in_queue: number;
    processing_time:       number;
    solution:              Solution;
}

export interface Solution {
    costs:              number;
    distance:           number;
    time:               number;
    transport_time:     number;
    completion_time:    number;
    max_operation_time: number;
    waiting_time:       number;
    service_duration:   number;
    preparation_time:   number;
    no_vehicles:        number;
    no_unassigned:      number;
    routes:             Route[];
    unassigned:         Unassigned;
}

export interface Route {
    vehicle_id:       string;
    distance:         number;
    transport_time:   number;
    completion_time:  number;
    waiting_time:     number;
    service_duration: number;
    preparation_time: number;
    points:           Point[];
    activities:       Activity[];
}

export interface Activity {
    type:             string;
    location_id:      string;
    address:          Address;
    end_time?:        number;
    end_date_time?:   null;
    distance:         number;
    driving_time:     number;
    preparation_time: number;
    waiting_time:     number;
    load_after?:      number[];
    id?:              string;
    arr_time?:        number;
    arr_date_time?:   null;
    load_before?:     number[];
}

export interface Address {
    location_id: string;
    lat:         number;
    lon:         number;
}

export interface Point {
    coordinates: Array<number[]>;
    type:        string;
}

export interface Unassigned {
    services:  any[];
    shipments: any[];
    breaks:    any[];
    details:   any[];
}
export const test_data = {
    "copyrights": [
      "GraphHopper",
      "OpenStreetMap contributors"
    ],
    "job_id": "d62fcadd-c84a-4298-90b5-28550125bec5",
    "status": "finished",
    "waiting_time_in_queue": 0,
    "processing_time": 459,
    "solution": {
      "costs": 438,
      "distance": 17994,
      "time": 4094,
      "transport_time": 4094,
      "completion_time": 4172,
      "max_operation_time": 2465,
      "waiting_time": 78,
      "service_duration": 0,
      "preparation_time": 0,
      "no_vehicles": 2,
      "no_unassigned": 0,
      "routes": [
        {
          "vehicle_id": "vehicle-2",
          "distance": 10618,
          "transport_time": 2465,
          "completion_time": 2465,
          "waiting_time": 0,
          "service_duration": 0,
          "preparation_time": 0,
          "points": [
            {
              "coordinates": [
                [
                  13.40608,
                  52.53701
                ],
                [
                  13.40643,
                  52.53631
                ],
                [
                  13.40554,
                  52.53616
                ],
                [
                  13.4054,
                  52.53608
                ],
                [
                  13.40445,
                  52.53513
                ],
                [
                  13.40436,
                  52.53509
                ],
                [
                  13.40428,
                  52.53508
                ],
                [
                  13.40463,
                  52.53419
                ],
                [
                  13.40451,
                  52.53419
                ],
                [
                  13.4034,
                  52.53401
                ],
                [
                  13.403,
                  52.53359
                ],
                [
                  13.40291,
                  52.53354
                ],
                [
                  13.40268,
                  52.53347
                ],
                [
                  13.39888,
                  52.53259
                ],
                [
                  13.39839,
                  52.53253
                ],
                [
                  13.39812,
                  52.53251
                ],
                [
                  13.39616,
                  52.53243
                ],
                [
                  13.39579,
                  52.5324
                ],
                [
                  13.38973,
                  52.53173
                ],
                [
                  13.39163,
                  52.53025
                ],
                [
                  13.38797,
                  52.52935
                ],
                [
                  13.38763,
                  52.52996
                ]
              ],
              "type": "LineString"
            },
            {
              "coordinates": [
                [
                  13.38763,
                  52.52996
                ],
                [
                  13.38739,
                  52.53039
                ],
                [
                  13.38724,
                  52.53036
                ],
                [
                  13.38464,
                  52.52929
                ],
                [
                  13.38538,
                  52.52871
                ],
                [
                  13.38634,
                  52.52792
                ],
                [
                  13.38638,
                  52.52779
                ],
                [
                  13.38657,
                  52.52763
                ],
                [
                  13.38676,
                  52.52741
                ],
                [
                  13.38698,
                  52.52713
                ],
                [
                  13.38704,
                  52.52701
                ],
                [
                  13.38753,
                  52.524
                ],
                [
                  13.3877,
                  52.52307
                ],
                [
                  13.3878,
                  52.52282
                ],
                [
                  13.38788,
                  52.52252
                ],
                [
                  13.38802,
                  52.52174
                ],
                [
                  13.38519,
                  52.52009
                ],
                [
                  13.38539,
                  52.5191
                ],
                [
                  13.38548,
                  52.51852
                ],
                [
                  13.38042,
                  52.51819
                ],
                [
                  13.38071,
                  52.5167
                ],
                [
                  13.38076,
                  52.51652
                ],
                [
                  13.38084,
                  52.51634
                ],
                [
                  13.3821,
                  52.51396
                ],
                [
                  13.38055,
                  52.51365
                ]
              ],
              "type": "LineString"
            },
            {
              "coordinates": [
                [
                  13.38055,
                  52.51365
                ],
                [
                  13.38229,
                  52.514
                ],
                [
                  13.38363,
                  52.51429
                ],
                [
                  13.3848,
                  52.51445
                ],
                [
                  13.38504,
                  52.51358
                ],
                [
                  13.39124,
                  52.51397
                ],
                [
                  13.3911,
                  52.51488
                ],
                [
                  13.39303,
                  52.51499
                ],
                [
                  13.39317,
                  52.5141
                ],
                [
                  13.39548,
                  52.51419
                ],
                [
                  13.39571,
                  52.51421
                ]
              ],
              "type": "LineString"
            },
            {
              "coordinates": [
                [
                  13.39571,
                  52.51421
                ],
                [
                  13.39695,
                  52.51434
                ],
                [
                  13.39674,
                  52.51523
                ],
                [
                  13.39742,
                  52.51531
                ],
                [
                  13.39873,
                  52.51558
                ],
                [
                  13.39846,
                  52.51599
                ],
                [
                  13.39825,
                  52.51729
                ],
                [
                  13.39805,
                  52.51755
                ],
                [
                  13.39892,
                  52.51761
                ],
                [
                  13.39917,
                  52.51764
                ],
                [
                  13.39964,
                  52.51775
                ],
                [
                  13.40009,
                  52.51791
                ],
                [
                  13.40034,
                  52.51797
                ],
                [
                  13.4021,
                  52.51864
                ],
                [
                  13.40288,
                  52.51896
                ],
                [
                  13.40375,
                  52.51936
                ],
                [
                  13.40498,
                  52.52001
                ],
                [
                  13.40463,
                  52.5203
                ],
                [
                  13.40311,
                  52.52144
                ],
                [
                  13.40442,
                  52.52189
                ],
                [
                  13.40448,
                  52.52192
                ],
                [
                  13.40451,
                  52.52195
                ],
                [
                  13.40473,
                  52.52199
                ],
                [
                  13.40504,
                  52.52208
                ],
                [
                  13.40572,
                  52.52235
                ],
                [
                  13.40687,
                  52.52294
                ],
                [
                  13.40693,
                  52.52299
                ],
                [
                  13.40706,
                  52.52319
                ],
                [
                  13.40738,
                  52.52378
                ],
                [
                  13.40787,
                  52.52443
                ],
                [
                  13.4079,
                  52.52453
                ],
                [
                  13.40938,
                  52.52401
                ],
                [
                  13.40962,
                  52.52398
                ],
                [
                  13.41001,
                  52.52395
                ],
                [
                  13.41072,
                  52.52391
                ],
                [
                  13.41215,
                  52.52389
                ],
                [
                  13.41233,
                  52.52386
                ],
                [
                  13.4131,
                  52.5235
                ],
                [
                  13.41288,
                  52.52333
                ],
                [
                  13.41475,
                  52.52247
                ],
                [
                  13.41496,
                  52.52264
                ],
                [
                  13.41523,
                  52.52251
                ],
                [
                  13.41633,
                  52.52338
                ],
                [
                  13.41631,
                  52.52346
                ],
                [
                  13.41654,
                  52.52364
                ],
                [
                  13.41684,
                  52.52351
                ]
              ],
              "type": "LineString"
            },
            {
              "coordinates": [
                [
                  13.41684,
                  52.52351
                ],
                [
                  13.41654,
                  52.52364
                ],
                [
                  13.41631,
                  52.52346
                ],
                [
                  13.4163,
                  52.52344
                ],
                [
                  13.41587,
                  52.52363
                ],
                [
                  13.41572,
                  52.5235
                ],
                [
                  13.41409,
                  52.5242
                ],
                [
                  13.41454,
                  52.52461
                ],
                [
                  13.41454,
                  52.52466
                ],
                [
                  13.41358,
                  52.52508
                ],
                [
                  13.41366,
                  52.52514
                ],
                [
                  13.41344,
                  52.52525
                ],
                [
                  13.4133,
                  52.52514
                ],
                [
                  13.41316,
                  52.5252
                ],
                [
                  13.41107,
                  52.52585
                ],
                [
                  13.41118,
                  52.52606
                ],
                [
                  13.41118,
                  52.52616
                ],
                [
                  13.41095,
                  52.52664
                ],
                [
                  13.41097,
                  52.52678
                ],
                [
                  13.41084,
                  52.52706
                ],
                [
                  13.41057,
                  52.52747
                ],
                [
                  13.41028,
                  52.52809
                ],
                [
                  13.41032,
                  52.52821
                ],
                [
                  13.4102,
                  52.52847
                ],
                [
                  13.40999,
                  52.52875
                ],
                [
                  13.40984,
                  52.52905
                ],
                [
                  13.40982,
                  52.52914
                ],
                [
                  13.40984,
                  52.52926
                ],
                [
                  13.4104,
                  52.52998
                ],
                [
                  13.4105,
                  52.53001
                ],
                [
                  13.41064,
                  52.53016
                ],
                [
                  13.41082,
                  52.5303
                ],
                [
                  13.41198,
                  52.53107
                ],
                [
                  13.4122,
                  52.53128
                ],
                [
                  13.41232,
                  52.53143
                ],
                [
                  13.41247,
                  52.53192
                ],
                [
                  13.41267,
                  52.53245
                ],
                [
                  13.41275,
                  52.53259
                ],
                [
                  13.41215,
                  52.5327
                ],
                [
                  13.40731,
                  52.53463
                ],
                [
                  13.40608,
                  52.53701
                ]
              ],
              "type": "LineString"
            }
          ],
          "activities": [
            {
              "type": "start",
              "location_id": "berlin",
              "address": {
                "location_id": "berlin",
                "lat": 52.537,
                "lon": 13.406
              },
              "end_time": 1554804329,
              "end_date_time": null,
              "distance": 0,
              "driving_time": 0,
              "preparation_time": 0,
              "waiting_time": 0,
              "load_after": [
                0
              ]
            },
            {
              "type": "pickupShipment",
              "id": "7fe77504-7df8-4497-843c-02d70b6490ce",
              "location_id": "13.387613_52.529961",
              "address": {
                "location_id": "13.387613_52.529961",
                "lat": 52.529961,
                "lon": 13.387613
              },
              "arr_time": 1554804789,
              "arr_date_time": null,
              "end_time": 1554804789,
              "end_date_time": null,
              "waiting_time": 0,
              "distance": 2012,
              "driving_time": 460,
              "preparation_time": 0,
              "load_before": [
                0
              ],
              "load_after": [
                1
              ]
            },
            {
              "type": "deliverShipment",
              "id": "7fe77504-7df8-4497-843c-02d70b6490ce",
              "location_id": "13.380575_52.513614",
              "address": {
                "location_id": "13.380575_52.513614",
                "lat": 52.513614,
                "lon": 13.380575
              },
              "arr_time": 1554805344,
              "arr_date_time": null,
              "end_time": 1554805344,
              "end_date_time": null,
              "waiting_time": 0,
              "distance": 4560,
              "driving_time": 1015,
              "preparation_time": 0,
              "load_before": [
                1
              ],
              "load_after": [
                0
              ]
            },
            {
              "type": "service",
              "id": "s-4",
              "location_id": "13.395767_52.514038",
              "address": {
                "location_id": "13.395767_52.514038",
                "lat": 52.514038,
                "lon": 13.395767
              },
              "arr_time": 1554805632,
              "arr_date_time": null,
              "end_time": 1554805632,
              "end_date_time": null,
              "waiting_time": 0,
              "distance": 5887,
              "driving_time": 1303,
              "preparation_time": 0,
              "load_before": [
                0
              ],
              "load_after": [
                1
              ]
            },
            {
              "type": "service",
              "id": "s-3",
              "location_id": "13.416882_52.523543",
              "address": {
                "location_id": "13.416882_52.523543",
                "lat": 52.523543,
                "lon": 13.416882
              },
              "arr_time": 1554806253,
              "arr_date_time": null,
              "end_time": 1554806253,
              "end_date_time": null,
              "waiting_time": 0,
              "distance": 8486,
              "driving_time": 1924,
              "preparation_time": 0,
              "load_before": [
                1
              ],
              "load_after": [
                2
              ]
            },
            {
              "type": "end",
              "location_id": "berlin",
              "address": {
                "location_id": "berlin",
                "lat": 52.537,
                "lon": 13.406
              },
              "arr_time": 1554806794,
              "arr_date_time": null,
              "distance": 10618,
              "driving_time": 2465,
              "preparation_time": 0,
              "waiting_time": 0,
              "load_before": [
                2
              ]
            }
          ]
        },
        {
          "vehicle_id": "vehicle-1",
          "distance": 7376,
          "transport_time": 1629,
          "completion_time": 1707,
          "waiting_time": 78,
          "service_duration": 0,
          "preparation_time": 0,
          "points": [
            {
              "coordinates": [
                [
                  13.40608,
                  52.53701
                ],
                [
                  13.40674,
                  52.53571
                ],
                [
                  13.40433,
                  52.53313
                ],
                [
                  13.40271,
                  52.53149
                ],
                [
                  13.40246,
                  52.53121
                ],
                [
                  13.40148,
                  52.52999
                ],
                [
                  13.40128,
                  52.52993
                ],
                [
                  13.40118,
                  52.52988
                ],
                [
                  13.40133,
                  52.5296
                ],
                [
                  13.40138,
                  52.52951
                ],
                [
                  13.40167,
                  52.52914
                ],
                [
                  13.40188,
                  52.52895
                ],
                [
                  13.398,
                  52.52885
                ],
                [
                  13.39289,
                  52.52748
                ],
                [
                  13.39354,
                  52.5264
                ],
                [
                  13.39358,
                  52.52628
                ],
                [
                  13.39324,
                  52.52575
                ],
                [
                  13.39334,
                  52.52573
                ],
                [
                  13.39339,
                  52.52584
                ]
              ],
              "type": "LineString"
            },
            {
              "coordinates": [
                [
                  13.39339,
                  52.52584
                ],
                [
                  13.3934,
                  52.52599
                ],
                [
                  13.39358,
                  52.52628
                ],
                [
                  13.39354,
                  52.5264
                ],
                [
                  13.39242,
                  52.52823
                ],
                [
                  13.39381,
                  52.52852
                ],
                [
                  13.38973,
                  52.53173
                ],
                [
                  13.38717,
                  52.5315
                ],
                [
                  13.38678,
                  52.5315
                ],
                [
                  13.38641,
                  52.53147
                ],
                [
                  13.38617,
                  52.53143
                ],
                [
                  13.38607,
                  52.53155
                ],
                [
                  13.38526,
                  52.53225
                ],
                [
                  13.38501,
                  52.53252
                ],
                [
                  13.38316,
                  52.53418
                ],
                [
                  13.38179,
                  52.5355
                ],
                [
                  13.38084,
                  52.53523
                ],
                [
                  13.38081,
                  52.53531
                ],
                [
                  13.3795,
                  52.53677
                ],
                [
                  13.37941,
                  52.53682
                ],
                [
                  13.37935,
                  52.53683
                ],
                [
                  13.37919,
                  52.53682
                ],
                [
                  13.37617,
                  52.5361
                ],
                [
                  13.37502,
                  52.53698
                ],
                [
                  13.37584,
                  52.53734
                ]
              ],
              "type": "LineString"
            },
            {
              "coordinates": [
                [
                  13.37584,
                  52.53734
                ],
                [
                  13.37566,
                  52.53726
                ],
                [
                  13.37515,
                  52.53763
                ],
                [
                  13.37644,
                  52.53841
                ],
                [
                  13.37807,
                  52.53935
                ],
                [
                  13.37946,
                  52.5402
                ],
                [
                  13.3796,
                  52.54019
                ],
                [
                  13.37984,
                  52.54021
                ],
                [
                  13.37988,
                  52.54012
                ],
                [
                  13.38062,
                  52.53936
                ],
                [
                  13.38169,
                  52.53832
                ],
                [
                  13.38236,
                  52.5377
                ],
                [
                  13.38363,
                  52.53661
                ],
                [
                  13.38492,
                  52.53555
                ],
                [
                  13.38613,
                  52.53447
                ],
                [
                  13.38757,
                  52.53338
                ],
                [
                  13.38791,
                  52.53354
                ],
                [
                  13.38812,
                  52.53368
                ],
                [
                  13.38833,
                  52.53392
                ],
                [
                  13.38977,
                  52.53518
                ],
                [
                  13.39003,
                  52.53539
                ],
                [
                  13.39256,
                  52.53701
                ],
                [
                  13.39316,
                  52.53739
                ],
                [
                  13.39327,
                  52.53744
                ],
                [
                  13.3936,
                  52.53757
                ],
                [
                  13.40155,
                  52.53982
                ],
                [
                  13.40357,
                  52.53715
                ],
                [
                  13.40372,
                  52.53719
                ],
                [
                  13.40465,
                  52.53727
                ],
                [
                  13.4048,
                  52.53726
                ],
                [
                  13.4059,
                  52.53736
                ],
                [
                  13.40608,
                  52.53701
                ]
              ],
              "type": "LineString"
            }
          ],
          "activities": [
            {
              "type": "start",
              "location_id": "berlin",
              "address": {
                "location_id": "berlin",
                "lat": 52.537,
                "lon": 13.406
              },
              "end_time": 1554804329,
              "end_date_time": null,
              "distance": 0,
              "driving_time": 0,
              "preparation_time": 0,
              "waiting_time": 0,
              "load_after": [
                0
              ]
            },
            {
              "type": "service",
              "id": "s-2",
              "location_id": "13.393364_52.525851",
              "address": {
                "location_id": "13.393364_52.525851",
                "lat": 52.525851,
                "lon": 13.393364
              },
              "arr_time": 1554804743,
              "arr_date_time": null,
              "end_time": 1554804743,
              "end_date_time": null,
              "waiting_time": 0,
              "distance": 1884,
              "driving_time": 414,
              "preparation_time": 0,
              "load_before": [
                0
              ],
              "load_after": [
                1
              ]
            },
            {
              "type": "service",
              "id": "s-1",
              "location_id": "13.375854_52.537338",
              "address": {
                "location_id": "13.375854_52.537338",
                "lat": 52.537338,
                "lon": 13.375854
              },
              "arr_time": 1554805251,
              "arr_date_time": null,
              "end_time": 1554805329,
              "end_date_time": null,
              "waiting_time": 78,
              "distance": 4205,
              "driving_time": 922,
              "preparation_time": 0,
              "load_before": [
                1
              ],
              "load_after": [
                2
              ]
            },
            {
              "type": "end",
              "location_id": "berlin",
              "address": {
                "location_id": "berlin",
                "lat": 52.537,
                "lon": 13.406
              },
              "arr_time": 1554806036,
              "arr_date_time": null,
              "distance": 7376,
              "driving_time": 1629,
              "preparation_time": 0,
              "waiting_time": 0,
              "load_before": [
                2
              ]
            }
          ]
        }
      ],
      "unassigned": {
        "services": [],
        "shipments": [],
        "breaks": [],
        "details": []
      }
    }
  }