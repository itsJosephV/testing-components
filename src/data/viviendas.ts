export type EstadoVivienda = "disponible" | "reservado" | "vendido";

export type TipoVivienda = "A" | "B" | "C" | "D" | "E";

export interface Vivienda {
  tipo: TipoVivienda;
  planta: number;
  dormitorios: number;
  baños: number;
  superficie: number;
  precio: number | null;
  estado: EstadoVivienda;
}

export const viviendas = [
  {
    tipo: "A",
    planta: 1,
    dormitorios: 2,
    baños: 2,
    superficie: 70.85,
    precio: 210000,
    estado: "disponible"
  },
  {
    tipo: "B",
    planta: 1,
    dormitorios: 1,
    baños: 1,
    superficie: 47.53,
    precio: 176500,
    estado: "disponible"
  },
  {
    tipo: "A",
    planta: 2,
    dormitorios: 2,
    baños: 2,
    superficie: 87.97,
    precio: 235000,
    estado: "disponible"
  },
  {
    tipo: "B",
    planta: 2,
    dormitorios: 2,
    baños: 2,
    superficie: 85.73,
    precio: 230500,
    estado: "disponible"
  },
  {
    tipo: "C",
    planta: 2,
    dormitorios: 2,
    baños: 2,
    superficie: 81.33,
    precio: null,
    estado: "reservado"
  },
  {
    tipo: "D",
    planta: 2,
    dormitorios: 2,
    baños: 2,
    superficie: 80.59,
    precio: null,
    estado: "reservado"
  },
  {
    tipo: "E",
    planta: 2,
    dormitorios: 2,
    baños: 2,
    superficie: 92.98,
    precio: 237500,
    estado: "disponible"
  },
  {
    tipo: "A",
    planta: 3,
    dormitorios: 2,
    baños: 2,
    superficie: 87.97,
    precio: 240100,
    estado: "disponible"
  },
  {
    tipo: "B",
    planta: 3,
    dormitorios: 2,
    baños: 2,
    superficie: 85.73,
    precio: 236100,
    estado: "disponible"
  },
  {
    tipo: "C",
    planta: 3,
    dormitorios: 2,
    baños: 2,
    superficie: 81.33,
    precio: 220000,
    estado: "disponible"
  },
  {
    tipo: "D",
    planta: 3,
    dormitorios: 2,
    baños: 2,
    superficie: 80.59,
    precio: null,
    estado: "reservado"
  },
  {
    tipo: "E",
    planta: 3,
    dormitorios: 2,
    baños: 2,
    superficie: 92.98,
    precio: null,
    estado: "reservado"
  }
] satisfies Vivienda[];