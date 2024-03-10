import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/OS';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements AfterViewInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    prioridade: '',
    status: ''
  }

  clienteNome: string = '';
  tecnicoNome: string = '';

  constructor(
    private route: ActivatedRoute,
    private osService: OsService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.findById();
  }

  findById(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.osService.findById(id).subscribe((resposta) => {
        this.os = resposta;
        this.findClienteName();
        this.findTecnicoName();
      });
    }
  }

  findClienteName(): void {
    this.clienteService.findById(this.os.cliente).subscribe(resposta => {
      this.clienteNome = resposta.nome.toString(); // Convertendo para string
    });
  }
  

  findTecnicoName(): void {
    this.tecnicoService.findById(this.os.tecnico).subscribe(resposta => {
      this.tecnicoNome = resposta.nome.toString();;
    });
  }

  prioridadeClass(prioridade: string): string {
    switch (prioridade) {
        case 'BAIXA':
            return 'baixa';
        case 'MEDIA':
            return 'media';
        case 'ALTA':
            return 'alta';
        default:
            return '';
    }
}


  voltar(): void {
    this.router.navigate(['os'])
  }
}
