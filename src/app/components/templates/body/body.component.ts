import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from './../../../app.component';
import { ItemsService } from './../../../items.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentEnd } from '../../../../environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})



export class BodyComponent implements OnInit {


  items: Array<any> = new Array();
  itemsFilter: Array<any> = new Array();
  pedidos: Array<any> = new Array();
  pedido: String = new String();
  result$: Observable<any> = new Observable();

  constructor(
    private ItemsService: ItemsService,
    private http: HttpClient,
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.listItems();

  }

  listItems() {
    this.ItemsService.listItems().subscribe(items => {
      this.items = items.orders;
      console.log(items)


    }, err => {
      console.log('Erro ao listar os itens')
    })

  }

  buscarPedido(idtem: string) {
    console.log(`${environmentEnd.API}/${idtem}`)
    this.result$ = this.http.get(`${environmentEnd.API}/${idtem}`)
    this.result$.subscribe(items => {
      this.pedidos = items;
      console.log(items)
      console.log(items.product_name)
      this.pedido = `ID: ${items.id} Nome: ${items.product_name}`

      const dialogRef = this.dialog.open(ModalComponent, { data: { produto: items } });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    }, err => {
      console.log('Erro ao listar os itens')
    })


  }

  filtrar(value: string) {
    if (!value) {
      this.itemsFilter = this.items;
    } else {
      this.itemsFilter = this.items.filter(items =>
        items.id.trim().toLowerCase().includes(value.trim().toLowerCase())
      );
    }
  }


}
