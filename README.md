# PredictMaint

Sistema de mantenimiento predictivo industrial para monitoreo de equipos, lecturas de condicion (vibracion, temperatura segun ISO 10816) y gestion de ordenes de trabajo con roles ADMIN/TECNICO.

## Stack Tecnologico

| Frontend | Backend | Infraestructura |
|----------|---------|-----------------|
| Vite + React 18 | Spring Boot 4.0.3 | Railway (backend + PostgreSQL) |
| Tailwind CSS v4 | Spring Security + JWT | Vercel (frontend) |
| Zustand | Spring Data JPA | GitHub (repositorio) |
| React Router DOM | PostgreSQL / H2 | Docker |
| Axios + SweetAlert2 | Lombok | |

## Links

- **Frontend:** https://predictmaint.vercel.app
- **Backend API:** https://predictmaint-production.up.railway.app
- **Repositorio:** https://github.com/jesusartemio-dev/predictmaint

## Usuarios de Prueba

| Usuario | Contrasena | Rol | Area |
|---------|-----------|-----|------|
| admin | 1234 | ADMIN | Gerencia |
| tecnico1 | 1234 | TECNICO | Linea A |
| tecnico2 | 1234 | TECNICO | Linea B |

## Endpoints de la API

### Autenticacion
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login, retorna JWT token |

### Equipos
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/equipment` | Listar todos los equipos |
| GET | `/api/equipment/{id}` | Obtener equipo por ID |
| GET | `/api/equipment/status/{status}` | Filtrar por estado |
| GET | `/api/equipment/area/{area}` | Filtrar por area |
| POST | `/api/equipment` | Crear equipo |
| PATCH | `/api/equipment/{id}/status` | Actualizar estado |

### Lecturas de Condicion
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/readings/equipment/{id}` | Todas las lecturas de un equipo |
| GET | `/api/readings/equipment/{id}/last` | Ultimas 10 lecturas |
| POST | `/api/readings/equipment/{id}` | Registrar nueva lectura |

### Ordenes de Trabajo
| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/workorders` | Listar todas las OTs |
| GET | `/api/workorders/status/{status}` | Filtrar por estado |
| GET | `/api/workorders/equipment/{id}` | OTs de un equipo |
| POST | `/api/workorders/equipment/{id}` | Crear orden de trabajo |
| PATCH | `/api/workorders/{id}/status` | Actualizar estado de OT |

## Estructura del Proyecto

```
predictmaint/
├── predictmaint-backend/     # Spring Boot API
│   ├── src/main/java/com/predictmaint/backend/
│   │   ├── model/            # Equipment, ConditionReading, WorkOrder, User
│   │   ├── repository/       # JPA Repositories
│   │   ├── service/          # Logica de negocio + ISO 10816
│   │   ├── controller/       # REST Controllers
│   │   └── config/           # Security, JWT, CORS
│   └── src/main/resources/
│       ├── application.properties
│       ├── application-prod.properties
│       └── data.sql
├── predictmaint-frontend/    # React + Vite
│   └── src/
│       ├── components/       # EquipmentCard, WorkOrderTable, Navbar
│       ├── pages/            # Home, Login, Dashboard, AdminPanel
│       ├── store/            # Zustand (auth, equipment, workOrders, readings)
│       ├── services/         # Axios API calls
│       └── router/           # React Router con rutas protegidas
└── README.md
```
