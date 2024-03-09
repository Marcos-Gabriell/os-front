import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  selected = ''

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService : ClienteService
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }


  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(respota => {
      this.tecnicos = respota
    })
  }

  listarClientes():void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta
    })
  }

}
