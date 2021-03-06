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
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

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
  pageOfItems: Array<any> = new Array;
  buscando: String = new String();
  tipo: String = new String();
  filtros: Map<String, String> = new Map();

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
    }, err => {
      console.log('Erro ao listar os itens')
    })
  }

  buscarPedido(idtem: string) {
    this.result$ = this.http.get(`${environmentEnd.API}/${idtem}`)
    this.result$.subscribe(items => {
      this.pedidos = items;
      this.pedido = `ID: ${items.id} Nome: ${items.product_name}`
      const dialogRef = this.dialog.open(ModalComponent, { data: { produto: items } });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }, err => {
      console.log('Erro ao listar os itens')
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  filtrar(value: string, name: string) {
    this.filtros.set(name, value);
    this.itemsFilter = [];
    this.filtros.forEach((v, k) => {
      if (v)
        this.itemsFilter = this.itemsFilter.length > 0 ? this.filtrarArray(this.itemsFilter, k, v) : this.filtrarArray(this.items, k, v)
    });
  }

  private filtrarArray(items: Array<any>, key: String, value: String) {
    return items.filter(item => {
      if (item[`${key}`])
        return item[`${key}`].toString().trim().toLowerCase().includes(value.trim().toLowerCase())
    })
  }

}
