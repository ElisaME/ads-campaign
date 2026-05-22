# Omnichannel Marketing Performance Dashboard 🚀

Este proyecto es un prototipo de un dashboard omnicanal de alto rendimiento diseñado para unificar, homogeneizar y visualizar métricas clave de campañas publicitarias provenientes de distintas plataformas (para este prototipo se emplean datos simulados de campañas de Meta, Google y Amazon) en unasola interfaz intuitiva y funcional.

---

## Preguntas sobre el desafío 📄

### 1. ¿Cómo estructuraste el proyecto y porque? 🧩

El proyecto se estructuró siguiendo una arquitectura limpia basada en **Componentes Atómicos** y **Separación de Responsabilidades**, una base ideal para una aplicación escalable en React/Next.js:

```
├── app/
│ ├── page.tsx              # Dashboard principal
│ ├── layout.tsx            # Plantilla principal — tipografías y sidebar
│ └── globals.css           # Variables Tailwind + utility .numeric
│
├── components/dashboard/
│   ├── CampaignDetail.tsx    # Sheet lateral con detalle de campaña
│   ├── CampaignRow.tsx       # Fila individual por campaña
│   ├── CampaignTable.tsx     # Tabla principal con loading y empty state
│   ├── FilterBar.tsx         # Filtros de Búsqueda + selects de plataforma y estado
│   ├── KPICard.tsx           # Tarjeta individual de KPI con sparkline
│   ├── KPICards.tsx          # Grid de 4 métricas globales
│   └── PageHeader.tsx        # Header de dashboard
│   ├── Pagination.tsx        # Paginación
│   ├── PerformanceChart.tsx  # Gráfica diaria Spend vs Revenue
│   ├── Sidebar.tsx           # Navegación lateral
│   ├── Sparkline.tsx         # Mini gráfica de área (Recharts)
│
└── data/
│   ├── seed.json             # 11 campañas mock con 14 días de información
│   └── kpi-config.ts         # Targets y metadata estática por KPI
├── hooks/
│   └── useCampaigns.ts       # Filtros, búsqueda y paginación de campañas
│
├── lib/
│   ├── formatters.ts         # Funciones auxiliares para dar formato a datos
│   ├── metrics.ts            # Agregación de KPIs y lógica de cálculo
│   └── indicators.ts         # Lógica de estilos para indicadores visuales
│
├── types/
│   └── campaign.ts           # Interfaces TypeScript
```

- Decidí utilizar esta estructura de `components/dashboard` para que todos los componentes relacionados a las campañas vivan en el mismo lugar, si después de agregan secciones para audiencias o reportes cada una tendría un folder independiente.
- Construí de manera independiente la _lógica de la presentación_, el archivo `lib/metrics` contiene todos los cálculos de negocio. Los componentes consumen esos resultados pero no realizan cálculos, esto facilitará los tests de forma independiente.
- Los componentes que requieren una interacción son `client components`.
- Utilizo `useCampaigns` como única fuente de verdad, en este se centraliza la búsqueda con debounce, filtros combinados de plataforma y estado, paginación. Incluí un reset a la página 1 para cualquier cambio de filtro. `CampaigTable` solo consume esta información del hook sin realizar algún otro cálculo.

### 2. ¿Qué métricas consideraste clave y cómo las jerarquizaste visualmente? 📈

El diseño de esta interfaz busca estructurar la información bajo una lógica de un funnel de conversión, de lo general a lo particular.

En la **capa superior** tenemos 4 tarjetas con KPIs que nos dan una visión macro del rendimiento de nuestras campañas, estas métricas responden instantáneamente a la salud financiera del negocio:

1. Inversión Total: monto total gastado, esto nos da un contexto de presupuesto inmediato.
2. Ingresos Atribuidos: total del retorno directo
3. ROAS General: La métrica de total de ingresos/total de inversión, nos indica una eficiencia global
4. CAC/CPA Global: el costo promedio ponderado de adquisición, refleja el costo por resultado

**Decisión técnica:** ROAS y CPA se calculan desde los totales de cada campala, nunca como promedio de ratios individuales, de otra manera se generarían métricas engañosas.

Cada card incluye leyendas de 'análisis' que están mockeadas para ejempificar insights valiosos que se podrían generar.

En la **capa inferior** observamos una tabla de campañas que muestra una tabla con las 13 métricas homologadas, en algunos campos se emplea un color semántico para identificar a primera vista los valores que el usuario está viendo.
El orden de las columnas pretende brindar un análisis estructurado de izquierda a derecha que tiene un flujo natural de lectura y del viaje del usuario en nuestra campaña: Descubrimiento -> Interés -> Acción (Conversión)

### 3. ¿Cómo te conectarías a las APIs reales de Google Ads, Meta Ads o Amazon Ads? ¿Qué necesitas? 💻

Cada plataforma solicita distintos requerimientos para el consumo de su API

**Google Ads**

- Cuenta de Google Cloud Console con la API de Google Ads habilitada
- Developer token
- Client ID, Client Secret y Token por cada cuenta de un cliente
- Conocimiento de librería `google-ads-api`
- OAuth 2.0

**Meta Ads**

- App registrada en Meta for Developers con permisos de lectura y gestión
- Business Manager ID y Ad Account IDs del cliente
- SDK de Meta
- OAuth 2.0

**Amazon Ads**

- Cuenta en Amazon Adverstising con acceso a la API
- OAuth
- Profile ID de marketplace
- Libreria `amazon-advertising-api`

Para un ambiente productivo considero que puede crearse una capa de servicios para cada plataforma y a su vez una ruta de api de Next para cada uno de ellos.

### 4. ¿Qué problemas podrías enfrentar al integrar las APIs reales? 🚨

- Rate Limits, cada platadorma tiene sus propios límites de operaciones por día, sería necesario considerar alguna forma de caché para no exceder las peticiones por plataforma.
- Problemas de asincronía con la generación de reportes, sería útil actualizar los datos en una capa por detrás y cuando se tengan todos los datos actualizar la interfaz.
- Gestionar tiempo de vida de los tokens.
- Atribuciones cruzadas, hay casos en que una conversión puede ser atribuida a más de una plataforma, esto podría generar la suma soble de una misma revenue, se requeriría generar un modelo de atribución único o bien mostrar advertencias al respecto.

### 5. ¿Cómo manejarías las diferencias entre plataformas (formatos, nomenclaturas)? 🤔

Uno de los mayores desafíos para este rato fue el semántico, cada plataforma nombra las mismas cosas de formas distintas. Cada plataforma opera bajo su propio ecosistema, para esto realizé una propuesta de homologación de datos, para así poder generar un 'idioma universal' entre sus indicadores.

| Campo homologado | Google Ads       | Meta Ads          | Amazon Ads  |
| ---------------- | ---------------- | ----------------- | ----------- |
| `conversions`    | Conversions      | Purchases/Lead    | Orders      |
| `revenue`        | Conversion Value | Purchase Value    | Sales       |
| `impressions`    | Impressions      | Impressions       | Impressions |
| `clicks`         | Clicks           | Link Clicks       | Clicks      |
| `spend`          | Cost             | Amount Spent      | Spend       |
| `cpa`            | Cost/Conv.       | Cost per Purchase | CPA         |

Otra observación importante es la **contextualización por objetivo de campaña**. No todas las campañas se miden igual, agregué una columna llamada `Objetivo` para tener en cuenta porque una campaña tiene o no cierto valor.

También dentro del detalle de cada campaña hay una sección llamada `Detalles por plataforma` con una serie de valores que correpsonden únicamente a la plataforma a la que pertenece, esto con la intención de evidenciar que podemos agregar valor mostrando una mayor granularidad de información en el detalle.

---

## Lanza el proyecto 💻

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## Siguientes pasos

- Inicié a implementar un indicador de salud para cada campala, sin embargo no lo concluí ya que llegué a la etapa de análisis y necesito profundizar en que indicadores con que valores podrían dar cuenta del buen o mal rendimiento de una campaña.
- Algo que sumaría valor es que los KPIs que vemos en la parte superior se actualicen de acuerdo a las campañas filtradas por el usuario.
- Tests unitarios para `lib/metrics`
- Agregar funcionalidad a botones de sincronización y descarga de reportes.
- Dar más opciones de filtro para considerar rangos de fechas.
