import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IPatientmin } from '../../../../shared/models/patientmin.model';
import { PatientStore } from '../../../../shared/store/patiente-store';
import { ConvertTimestampDatePipe } from '../../../../shared/pipes/convert-timestamp-date.pipe';
import { nivelAtivArray } from './const';
import { protocolos } from './const';

@Component({
  selector: 'app-gastos-energeticos',
  templateUrl: './gastos-energeticos.component.html',
  styleUrls: ['./gastos-energeticos.component.scss']
})
export class GastosEnergeticosComponent implements OnInit {

  private convertTimestampDatePipe: ConvertTimestampDatePipe = new ConvertTimestampDatePipe();
  public formularioPrincipal: FormGroup;
  public dateFormat = Date.now();
  public nivelAtivArray = nivelAtivArray[0];
  public protocolosArray = protocolos;
  public title: string;
  public mask: Array<string | RegExp>;
  public maskNumber: Array<string | RegExp>;
  public maskNumber2: Array<string | RegExp>;
  public GET: number = 0;
  public TMB: number = 0;
  public nivelAtivDRI: string = '0';
  public classificacaoDRI: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private patienteStore: PatientStore,
  ) {
    this.mask = [/\d+/, ',', /\d+/, /\d+/];
    this.maskNumber = [/\d+/, /\d+/, /\d+/];
    this.maskNumber2 = [/\d+/, /\d+/];
  }

  ngOnInit() {
    this.buildForm();
    this.formularioPrincipal.get('id').value === null ? this.consultDataRegister() : this.loadForm();
    this.triggersControls();
  }

  public buildForm(): void {
    this.formularioPrincipal = this.formBuilder.group({
      id: [null],
      desc: [null, [Validators.required, Validators.max(200)]],
      dataAtend: [null, Validators.required],
      idade: [null, Validators.required],
      sexo: [null],
      altura: [null, Validators.required],
      peso: [null, Validators.required],
      protocolo: ['0'],
      nivelAtiv: ['-1', Validators.required],
      gastoEnergFinal: [null, Validators.required],
      classificacao: [null, Validators.required],
      massaMagra: [null, Validators.required],
    })
  }

  public consultDataRegister(): void {
    this.patienteStore.patiente$.subscribe((resp: IPatientmin) => {
      this.formularioPrincipal.patchValue({
        idade: this.convertTimestampDatePipe.transform((new Date(resp.txt_DN['seconds'] * 1000)), true),
        sexo: resp.txt_Sexo,
        altura: resp.informationAdd.height,
        peso: resp.informationAdd.weight,
        dataAtend: this.dateFormat,
      })
    });
  }

  public loadForm(): void {

  }

  public triggersControls(): void {
    this.formularioPrincipal.get(['idade']).valueChanges.subscribe(() => this.validarControles());
    this.formularioPrincipal.get(['altura']).valueChanges.subscribe(() => this.validarControles());
    this.formularioPrincipal.get(['peso']).valueChanges.subscribe(() => this.validarControles());
    this.formularioPrincipal.get(['protocolo']).valueChanges.subscribe(() => {
      this.formularioPrincipal.patchValue({
        nivelAtiv: null,
        gastoEnergFinal: null,
        classificacao: null,
        massaMagra: null,
      });
      this.TMB = 0;
      this.GET = 0;
      this.validarControles()
    });
    this.formularioPrincipal.get(['nivelAtiv']).valueChanges.subscribe((value) => {
      this.nivelAtivDRI = value;
      this.calcProtocolos()
    });

    this.formularioPrincipal.get('classificacao').valueChanges.subscribe(value => {
      this.classificacaoDRI = value;
      this.calcProtocolos();
    });

  }

  public validarControles(): void {

    const value = this.formularioPrincipal.get('protocolo').value;

    this.nivelAtivArray = nivelAtivArray[value];

    this.title = this.protocolosArray[value].title;

    value === '4' ? this.formularioPrincipal.get('nivelAtiv').clearValidators :
      this.formularioPrincipal.get('nivelAtiv').setValidators(Validators.required);

    value === '3' ? this.formularioPrincipal.get('massaMagra').setValidators(Validators.required) :
      this.formularioPrincipal.get('massaMagra').clearValidators;

    value === '2' ? this.formularioPrincipal.get('classificacao').setValidators(Validators.required) :
      this.formularioPrincipal.get('classificacao').clearValidators;

    this.calcProtocolos();
  }

  public calcProtocolos(): void {

    // Harris Benedict
    if (this.formularioPrincipal.get('protocolo').value === '0') {
      const value = this.formularioPrincipal.get('nivelAtiv').value;
      // Sedentário
      if (value === '0') {
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          this.GET = this.TMB_HBfem() * 1.2;
        };
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          this.GET = this.TMB_HBmasc() * 1.2;
        };
      };

      // Pouca
      if (value === '1') {
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          this.GET = this.TMB_HBfem() * 1.56;
        };
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          this.GET = this.TMB_HBmasc() * 1.55;
        };
      };

      //Moderada
      if (value === '2') {
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          this.GET = this.TMB_HBfem() * 1.64;
        };
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          this.GET = this.TMB_HBmasc() * 1.8;
        };
      };

      //Intensa
      if (value === '3') {
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          this.GET = this.TMB_HBfem() * 1.82;
        };
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          this.GET = this.TMB_HBmasc() * 2.1;
        };
      };
    }

    // Fao OMS (2001)
    if (this.formularioPrincipal.get('protocolo').value === '1') {
      const value = this.formularioPrincipal.get('nivelAtiv').value;
      const idade = this.formularioPrincipal.get('idade').value;
      // Leve
      if (value === '0') {
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          switch (idade) {
            case idade < 10:
              this.GET = this.TMB_Faomasc();
              break;
            case idade < 18:
              this.GET = this.TMB_Faomasc() * 1.6;
              break;
            case idade < 10:
              this.GET = this.TMB_Faomasc() * 1.55;
              break;
            default:
              this.GET = this.TMB_Faomasc() * 1.4;
              break;
          }
        }
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          switch (idade) {
            case idade < 10:
              this.GET = this.TMB_Faomasc();
              break;
            case idade < 18:
              this.GET = this.TMB_Faomasc() * 1.5;
              break;
            case idade < 10:
              this.GET = this.TMB_Faomasc() * 1.56;
              break;
            default:
              this.GET = this.TMB_Faomasc() * 1.4;
              break;
          }
        }
      };

      // Moderada
      if (value === '1') {
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          switch (idade) {
            case idade < 10:
              this.GET = this.TMB_Faomasc();
              break;
            case idade < 18:
              this.GET = this.TMB_Faomasc() * 2.5;
              break;
            case idade < 10:
              this.GET = this.TMB_Faomasc() * 1.78;
              break;
            default:
              this.GET = this.TMB_Faomasc() * 1.6;
              break;
          }
        }
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          switch (idade) {
            case idade < 10:
              this.GET = this.TMB_Faomasc();
              break;
            case idade < 18:
              this.GET = this.TMB_Faomasc() * 2.2;
              break;
            case idade < 10:
              this.GET = this.TMB_Faomasc() * 1.65;
              break;
            default:
              this.GET = this.TMB_Faomasc() * 1.6;
              break;
          }
        }
      };

      // Pesada
      if (value === '2') {
        if (this.formularioPrincipal.get('sexo').value === 'M') {
          switch (idade) {
            case idade < 10:
              this.GET = this.TMB_Faomasc();
              break;
            case idade < 18:
              this.GET = this.TMB_Faomasc() * 6;
              break;
            case idade < 10:
              this.GET = this.TMB_Faomasc() * 2.1;
              break;
            default:
              this.GET = this.TMB_Faomasc() * 1.9;
              break;
          }
        }
        if (this.formularioPrincipal.get('sexo').value === 'F') {
          switch (idade) {
            case idade < 10:
              this.GET = this.TMB_Faomasc();
              break;
            case idade < 18:
              this.GET = this.TMB_Faomasc() * 6;
              break;
            case idade < 10:
              this.GET = this.TMB_Faomasc() * 1.82;
              break;
            default:
              this.GET = this.TMB_Faomasc() * 1.8;
              break;
          }
        }
      };

    }

    // DRI/IOM (2001)
    if (this.formularioPrincipal.get('protocolo').value === '2') {
      this.TMB = 0;
      if (this.classificacaoDRI !== null) {
        const idade = this.formularioPrincipal.get('idade').value;
        const sexo = this.formularioPrincipal.get('sexo').value;
        /* Eutrofico */
        if (this.classificacaoDRI === '0') {
          // Sedentário
          if (this.nivelAtivDRI === '0') {
            return this.DRIeer(1);
          };
          // Pouco Ativo
          if (this.nivelAtivDRI === '1') {
            switch (idade) {
              case idade < '19':
                sexo === 'M' ? this.DRIeer(1.13) : this.DRIeer(1.16);
                break;
              default:
                sexo === 'F' ? this.DRIeer(1.11) : this.DRIeer(1.12);
                break;
            }
          };
          //Ativo
          if (this.nivelAtivDRI === '2') {
            switch (idade) {
              case idade < '19':
                sexo === 'M' ? this.DRIeer(1.26) : this.DRIeer(1.31);
                break;
              default:
                sexo === 'F' ? this.DRIeer(1.25) : this.DRIeer(1.27);
                break;
            }
          };
          // Muito Ativo
          if (this.nivelAtivDRI === '3') {
            switch (idade) {
              case idade < '19':
                sexo === 'M' ? this.DRIeer(1.42) : this.DRIeer(1.56);
                break;
              default:
                sexo === 'F' ? this.DRIeer(1.48) : this.DRIeer(1.45);
                break;
            }
          };
        }

        /* SobrePeso/Obeso */
        if (this.classificacaoDRI === '1') {
          // Sedentário
          if (this.nivelAtivDRI === '0') {
            return this.DRItee(1);
          };
          // Pouco Ativo
          if (this.nivelAtivDRI === '1') {
            switch (idade) {
              case idade < '19':
                sexo === 'M' ? this.DRItee(1.12) : this.DRItee(1.18);
                break;
              default:
                sexo === 'F' ? this.DRItee(1.12) : this.DRItee(1.16);
                break;
            }
          };
          //Ativo
          if (this.nivelAtivDRI === '2') {
            switch (idade) {
              case idade < '19':
                sexo === 'M' ? this.DRItee(1.24) : this.DRItee(1.35);
                break;
              default:
                sexo === 'F' ? this.DRItee(1.29) : this.DRItee(1.27);
                break;
            }
          };
          // Muito Ativo
          if (this.nivelAtivDRI === '3') {
            switch (idade) {
              case idade < '19':
                sexo === 'M' ? this.DRItee(1.45) : this.DRItee(1.6);
                break;
              default:
                sexo === 'F' ? this.DRItee(1.59) : this.DRItee(1.44);
                break;
            }
          };
        }
      }
    }

    // Limpa TMB GET nivel ativ null
    if (this.formularioPrincipal.get('nivelAtiv').value === '-1') {
      this.TMB = 0;
      this.GET = 0;
    }

  }

  public TMB_HBfem(): number {
    const peso = this.formularioPrincipal.get('peso').value;
    const altura = this.formularioPrincipal.get('altura').value.toString().replace(',', '.');
    const idade = this.formularioPrincipal.get('idade').value;
    return this.TMB = 655.1 + (9.563 * peso) + (1.85 * altura * 100) - (4.676 * idade);
  }

  public TMB_HBmasc(): number {
    const peso = this.formularioPrincipal.get('peso').value;
    const altura = this.formularioPrincipal.get('altura').value.toString().replace(',', '.');
    const idade = this.formularioPrincipal.get('idade').value;
    return this.TMB = 66.47 + (13.75 * peso) + (5 * altura * 100) - (6.755 * idade);
  }

  public TMB_Faomasc(): number {
    const peso = this.formularioPrincipal.get('peso').value;
    const idade = this.formularioPrincipal.get('idade').value;
    switch (idade) {
      case idade < 3:
        return this.TMB = (60.9 * peso - 54);
      case idade < 10:
        return this.TMB = (22.7 * peso + 495);
      case idade < 18:
        return this.TMB = (22.7 * peso + 495);
      case idade < 30:
        return this.TMB = (22.7 * peso + 495);
      case idade < 60:
        return this.TMB = (11.6 * peso + 879);
      default:
        return this.TMB = (11.6 * peso + 879);
    }
  }

  public TMB_Faofem(): number {
    const peso = this.formularioPrincipal.get('peso').value;
    const idade = this.formularioPrincipal.get('idade').value;
    switch (idade) {
      case idade < 3:
        return this.TMB = (61.0 * peso - 51);
      case idade < 10:
        return this.TMB = (22.5 * peso + 499);
      case idade < 18:
        return this.TMB = (12.2 * peso + 746);
      case idade < 30:
        return this.TMB = (14.7 * peso + 496);
      case idade < 60:
        return this.TMB = (8.7 * peso + 829);
      default:
        return this.TMB = (8.7 * peso + 829);
    }
  }

  public DRIeer(af: number) {
    const peso = this.formularioPrincipal.get('peso').value;
    const idade = this.formularioPrincipal.get('idade').value;
    const altura = this.formularioPrincipal.get('altura').value.toString().replace(',', '.');
    const sexo = this.formularioPrincipal.get('sexo').value;
    switch (idade) {
      case idade < '1':
        this.GET = (89 * peso - 100) + 56;
        break;
      case idade < '2':
        this.GET = (89 * peso - 100) + 22;
        break;
      case idade < '3':
        this.GET = (89 * peso - 100) + 20;
        break;
      case idade < '9':
        if (sexo === 'M') {
          this.GET = 88.5 - (61.9 * idade) + af * (26.7 * peso) + ((903 * altura) + 20);
        } else {
          this.GET = 135.3 - (30.8 * idade) + af * (10 * peso) + ((934 * altura) + 20);
        }
        break;
      case idade < '19':
        if (sexo === 'M') {
          this.GET = 88.5 - (61.9 * idade) + af * (26.7 * peso) + ((903 * altura) + 25);
        } else {
          this.GET = 135.3 - (30.8 * idade) + af * (10 * peso) + ((934 * altura) + 25);
        }
        break;
      default:
        if (sexo === 'M') {
          this.GET = 662 - (9.53 * idade) + af * (15.91 * peso) + ((539.6 * altura));
        } else {
          this.GET = 354 - (6.91 * idade) + af * (9.36 * peso) + ((726 * altura));
        }
        break;
    }
  }

  public DRItee(af: number) {
    const peso = this.formularioPrincipal.get('peso').value;
    const idade = this.formularioPrincipal.get('idade').value;
    const altura = this.formularioPrincipal.get('altura').value.toString().replace(',', '.');
    const sexo = this.formularioPrincipal.get('sexo').value;
    switch (idade) {
      case idade < '1':
        this.GET = (89 * peso - 100) + 56;
        break;
      case idade < '2':
        this.GET = (89 * peso - 100) + 22;
        break;
      case idade < '3':
        this.GET = (89 * peso - 100) + 20;
        break;
      case idade < '19':
        if (sexo === 'M') {
          this.GET = 114 - (50.9 * idade) + af * (19.5 * peso) + ((1161.4 * altura));
        } else {
          this.GET = 389 - (41.2 * idade) + af * (15 * peso) + ((701.6 * altura));
        }
        break;
      default:
        if (sexo === 'M') {
          this.GET = 1086 - (10.1 * idade) + af * (13.7 * peso) + ((416 * altura));
        } else {
          this.GET = 448 - (7.95 * idade) + af * (11.4 * peso) + ((619 * altura));
        }
        break;
    }
  }

}
