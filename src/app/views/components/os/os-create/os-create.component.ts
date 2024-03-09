import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { OS } from 'src/app/models/OS';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  allFieldsSelected: boolean = false;

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }

  checkAllFieldsSelected() {
    this.allFieldsSelected = !!this.os.tecnico && !!this.os.cliente && !!this.os.status && !!this.os.prioridade && this.os.observacoes.length >= 5;
  }
  

  create(): void {
    if (this.allFieldsSelected) {
      if (this.os.observacoes.length < 10) {
        console.log('A observação deve ter pelo menos 10 caracteres.');
        return;
      }
      this.service.create(this.os).subscribe(resposta => {
        this.service.message("Ordem de Serviço criada com sucesso!");
        this.router.navigate(['os'])
      });
    } else {
      console.log('Por favor, preencha todos os campos antes de criar a ordem de serviço.');
    }
  }
  
  cancel(): void {
    this.router.navigate(['os'])
  }
  
  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }
}
