import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = ''

  tecnico : Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(3)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router : Router,
    private service : TecnicoService,
    private route: ActivatedRoute
    ) { }

  

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void {
    this.service.update(this.tecnico).subscribe(resposta => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico atualziado com sucesso')
    },  err => {
      if(err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message("CPF inválido!")
        console.log(err)
      }
    })
  }
  
  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  cancel():void {
    this.router.navigate(['tecnicos'])
  }

  errorValidNome() {
    if(this.nome.invalid) {
      return 'O nome deve ter no mínimo 3 caracteres!';
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid && this.cpf.touched) {
      return 'O CPF deve ter 11 caracteres!';
    }
    return false;
  }
  
  errorValidTel() {
    if (this.telefone.invalid && this.telefone.touched) {
      return 'O Telefone deve ter 11 caracteres!';
    }
    return false;
  }

}
