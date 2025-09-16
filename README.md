# Pokédex


[![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

[![Node Version](https://img.shields.io/badge/NodeJS-v20.19.4-green)](https://nodejs.org/es)

Una Pokédex web construida con Next.js y React, que permite buscar, filtrar y explorar información de todos los Pokémon.




## Características

- **Listado de Pokémon**: Visualiza todos los Pokémon ordenados por ID, mostrando nombre, generación, tipos e imagen.
- **Filtros**: Filtra el listado por tipo y generación mediante selectores interactivos.
- **Buscador en tiempo real**: Busca Pokémon por nombre, incluyendo sus evoluciones, con filtrado instantáneo.
- **Paginación progresiva**: Muestra los Pokémon en bloques de 48, con botón para cargar más.
- **Página de detalle**: Consulta información completa de cada Pokémon, incluyendo:
  - Nombre, imagen, generación, tipos, stats y cadena evolutiva.
  - Navegación entre evoluciones, con la evolución actual marcada.
- **Persistencia de filtros y búsqueda**: El estado de los filtros y el buscador se mantiene al navegar entre páginas.

## Tecnologías

- [T3 Stack](https://create.t3.gg/) (Sin API REST ni Prisma, pero en un futuro podría montarse un pequeño middleware entre la Pokédex y PokéApi)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PokéAPI](https://pokeapi.co/)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/inixio-dev/pokedex.git
   cd pokedex
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura principal

- `src/app/page.tsx`: Página principal con listado, filtros y buscador.
- `src/app/pokemon/[id]/page.tsx`: Página de detalle de cada Pokémon.
- `src/app/components/`: Componentes reutilizables (thumbnail, filtros, loading, etc).
- `src/app/services/pokemon.service.ts`: Lógica para obtener y filtrar datos desde PokéAPI.
- `src/data/dtos/Pokemon.dto.ts`: Definición de los DTOs (modelos de datos).

## Notas y consideraciones

- Teniendo en cuenta el diseño de una Pokédex, le he dado un enfoque **mobile first** y **responsive**. El listado principal se muestra en un grid de 1, 2 o 6 columnas. Por el enfoque mobile first, el detalle de un Pokémon puede parecer demasiado estrecho y vacío en pantallas grandes.
- La paleta de colores utilizada es la tradicional de una Pokédex.
- Debido a la peculiar estructuración de los datos de PokéApi, se aplican algunos filtros en el lado del cliente y puede que algunas operaciones no sean las más eficientes ya que, por ejemplo, lo normal sería que el endpoint /pokemon aceptase filtros de tipo y generación. Por ejemplo, Para mostrar a Raichu en la búsqueda de un listado con **todos** los pokémons tal y como se solicitaba, habría que hacer unas 3000 peticiones (más de 1000 para obtener los pokemons, una por cada uno de ellos para obtener el detalle de su especie y una más por cada especie para obtener su cadena de evolución). Esto porvocaba que o bien el tiempo de carga fuese elevado o bien se hicieran demasiadas peticiones concurrentes. Por ello he añadido **paginación** mostrando 48 elementos y añadiendo 48 más cada vez que se hace click en Mostras Más. El número de elementos por página elegido ha sido 48 porque es múltiplo de los 3 posibles números de columnas en el grid (1, 2 y 6) y no quería que en pantallas grandes apareciesen pocas filas. De este modo nos aseguramos que aparezcan 8 filas en la primera carga.
- Algunos de los pokémons devueltos por el listado no tienen un detalle al llamar a /pokemon/id, lo cuál provoca que haya bastantes errores 404 (correctamente gestionados) entre los más de 1300 pokémon. 
- Siempre fui más de Digimón, así que no tenía el contexto suficiente de Pokémon como para añadir información realmente útil al detalle del Pokémon. 
- El estado de los filtros y el buscador se mantiene al navegar y tras recargar la página.
- El rendimiento está optimizado para búsquedas y filtrados rápidos en tiempo real.
- El diseño es responsive y pensado para una experiencia similar a una Pokédex clásica.

## Mejoras futuras

- Añadir paginación numérica o scroll infinito.
- Mejorar el diseño visual y la accesibilidad.
- Añadir tests unitarios y de integración.

---

¡Disfruta! ¡Hazte con todos!