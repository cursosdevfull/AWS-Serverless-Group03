import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: { name: string }[] = [];

  init = {
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Access-Control-Allow-Origin': '*',
    },
    response: true,
  };

  constructor() {
    API.get('api', '/list', this.init)
      .then((response) => (this.clients = response))
      .catch(console.log);
  }

  ngOnInit(): void {}
}
