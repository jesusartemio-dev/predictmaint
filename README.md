# PredictMaint

Aplicacion web fullstack para mantenimiento predictivo en plantas industriales. Permite monitorear el estado de los equipos en tiempo real, registrar lecturas de vibracion y temperatura (basado en la norma ISO 10816), y gestionar ordenes de trabajo con roles de ADMIN y TECNICO.

## Tecnologias usadas

| Frontend | Backend | Deploy |
|----------|---------|--------|
| Vite + React 18 | Spring Boot 4.0.3 | Railway (API + PostgreSQL) |
| Tailwind CSS v4 | Spring Security + JWT | Vercel (frontend) |
| Zustand | Spring Data JPA | GitHub (codigo fuente) |
| React Router DOM | PostgreSQL / H2 | Docker |
| Axios + SweetAlert2 | Lombok | |

## Links del proyecto

- **App web:** https://predictmaint.vercel.app
- **API backend:** https://predictmaint-production.up.railway.app
- **Repositorio:** https://github.com/jesusartemio-dev/predictmaint

## Usuarios para probar

| Usuario | Clave | Rol | Area |
|---------|-------|-----|------|
| admin | 1234 | ADMIN | Gerencia |
| tecnico1 | 1234 | TECNICO | Linea A |
| tecnico2 | 1234 | TECNICO | Linea B |

El usuario ADMIN puede crear ordenes de trabajo y cambiar estados. Los TECNICO solo ven el dashboard con los equipos y pueden registrar lecturas.

## Endpoints de la API

### Login
| Metodo | Ruta | Que hace |
|--------|------|----------|
| POST | `/api/auth/login` | Inicia sesion y devuelve un token JWT |

### Equipos
| Metodo | Ruta | Que hace |
|--------|------|----------|
| GET | `/api/equipment` | Trae todos los equipos |
| GET | `/api/equipment/{id}` | Trae un equipo por su ID |
| GET | `/api/equipment/status/{status}` | Filtra equipos por estado |
| GET | `/api/equipment/area/{area}` | Filtra equipos por area |
| POST | `/api/equipment` | Crea un equipo nuevo |
| PATCH | `/api/equipment/{id}/status` | Cambia el estado de un equipo |

### Lecturas de condicion
| Metodo | Ruta | Que hace |
|--------|------|----------|
| GET | `/api/readings/equipment/{id}` | Trae todas las lecturas de un equipo |
| GET | `/api/readings/equipment/{id}/last` | Trae las ultimas 10 lecturas |
| POST | `/api/readings/equipment/{id}` | Registra una nueva lectura |

### Ordenes de trabajo
| Metodo | Ruta | Que hace |
|--------|------|----------|
| GET | `/api/workorders` | Trae todas las ordenes de trabajo |
| GET | `/api/workorders/status/{status}` | Filtra por estado de la OT |
| GET | `/api/workorders/equipment/{id}` | Trae las OTs de un equipo |
| POST | `/api/workorders/equipment/{id}` | Crea una nueva orden de trabajo |
| PATCH | `/api/workorders/{id}/status` | Cambia el estado de una OT |

## Estructura del proyecto

```
predictmaint/
├── predictmaint-backend/     # API hecha con Spring Boot
│   ├── src/main/java/com/predictmaint/backend/
│   │   ├── model/            # Entidades: Equipment, ConditionReading, WorkOrder, User
│   │   ├── repository/       # Repositorios JPA
│   │   ├── service/          # Logica de negocio y umbrales ISO 10816
│   │   ├── controller/       # Controladores REST
│   │   └── config/           # Seguridad, JWT, CORS
│   └── src/main/resources/
│       ├── application.properties
│       ├── application-prod.properties
│       └── data.sql          # Datos iniciales de prueba
├── predictmaint-frontend/    # Frontend con React + Vite
│   └── src/
│       ├── components/       # EquipmentCard, WorkOrderTable, Navbar, modales
│       ├── pages/            # Home, Login, Dashboard, AdminPanel
│       ├── store/            # Estados globales con Zustand
│       ├── services/         # Llamadas a la API con Axios
│       └── router/           # Rutas protegidas con React Router
└── README.md
```

## Como correr en local

```bash
# Backend (necesita Java 17)
cd predictmaint-backend
./mvnw spring-boot:run

# Frontend (necesita Node 18+)
cd predictmaint-frontend
npm install
npm run dev
```

El backend corre en `http://localhost:8080` y el frontend en `http://localhost:5173`.
