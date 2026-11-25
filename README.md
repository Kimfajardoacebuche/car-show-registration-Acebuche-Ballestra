# Car Show Registration System — Backend API

Backend API for the **Car Show Registration System** (**AutoVista Events — Car Show 2027**), built with **C# / .NET 10**, **Entity Framework Core (SQLite)**, **FluentValidation**, **Scalar**, and **Vertical Slice Architecture**.

---

## Team & Roles

| Member | Role | Responsibility |
| :--- | :--- | :--- |
| `<Acebuche Kim>` | Backend Developer | .NET 10 API, Vertical Slices, SQLite EF Core, FluentValidation, Scalar testing |
| `<Ballestra Venus>` | Frontend Developer | React (Vite) frontend application and dashboard |

---

## Tech Stack

| Component | Technology |
| :--- | :--- |
| Framework | .NET 10 |
| Architecture | Vertical Slice + Clean Architecture |
| ORM | EF Core 10 |
| Database | SQLite (`carshow.db`) |
| Validation | FluentValidation |
| CQRS | Custom `ICommand` / `IQuery` (No MediatR) |
| API Docs | Scalar (No Swashbuckle) |
| Result Pattern | `Domain.Common.Result<T>` |

---

## Repository Structure

```text
car-show-registration-<surname1>-<surname2>/
├── backend/                         # .NET 10 solution (Domain, Application, Infrastructure, Api)
├── frontend/                        # React (Vite) frontend application
├── docs/
│   └── screenshots/                 # Verification and testing screenshots
└── README.md
