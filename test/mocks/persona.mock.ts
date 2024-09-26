import { Genero } from 'src/domains/persona/dtos/types';

export const PersonaMock = {
  nombre: 'Luke Skywalker',
  altura: 182,
  fechaNacimiento: new Date('1960-05-23'),
  masa: 82,
  donadorOrganos: true,
  genero: Genero.Masculino,
};
