export class PersonaEntity {
  id: string;
  nombre: string;
  altura: string;
  masa: string;

  static fromApiEntity(data: any, index: string): PersonaEntity {
    return {
      id: index,
      nombre: data.name,
      altura: data.height,
      masa: data.mass,
    };
  }
}
