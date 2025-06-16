# Parcial 1 - Base de Datos II

**Alumno:** Agustín Lucentini

## 🛒 Proyecto E-commerce

### Fase 1: Planificación y Diseño del Esquema de Datos

#### 1.1 - Descripción del Proyecto

Este proyecto consiste en el desarrollo del backend para una plataforma de E-commerce. El sistema está diseñado para gestionar las funcionalidades clave de una tienda en línea, resolviendo la necesidad de una estructura de datos robusta y escalable que pueda manejar:

- Productos con múltiples variantes (como color o talla)
- Carritos de compra
- Perfiles de usuario
- Historial de pedidos

**Funcionalidades principales:**

- Gestión de productos y su inventario por variante
- Registro y autenticación de usuarios
- Gestión de direcciones de envío y facturación
- Creación y seguimiento de pedidos

El objetivo es construir una base sólida, eficiente para consultas comunes como:

- Búsqueda de productos
- Verificación de stock
- Generación de reportes de ventas

#### 1.2 - Modelado de Datos

##### 🧾 Entidades Principales

- **Usuarios (users):** Información de autenticación
- **Perfiles de Usuario (user_profiles):** Datos personales y direcciones
- **Productos (products):** Información base y descriptiva
- **Variantes de Producto (product_variants):** Versiones específicas por atributos
- **Pedidos (orders):** Registro de transacciones

##### 📦 Colecciones y Esquemas

🔐 **users (Solo Auth)**

```json
{
  "_id": "ObjectId",
  "email": "string",
  "passwordHash": "string",
  "role": "customer" | "admin"
}
```

👤 **user_profiles**

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "name": "string",
  "phone": "string",
  "addresses": [
    {
      "type": "billing" | "shipping",
      "street": "string",
      "city": "string",
      "zip": "string",
      "country": "string"
    }
  ]
}
```

🛍️ **products**

```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "categoryId": "ObjectId",
  "availableOn": "Date",
  "deletedAt": "Date"
}
```

🔁 **productVariants**

```json
{
  "_id": "ObjectId",
  "productId": "ObjectId",
  "sku": "string",
  "price": "number",
  "stock": "number",
  "attributes": {
    "color": "string",
    "size": "string"
  },
  "isMaster": "boolean"
}
```

🧾 **orders**

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [
    {
      "variantId": "ObjectId",
      "productId": "ObjectId",
      "quantity": "number",
      "unitPrice": "number"
    }
  ],
  "shippingAddress": { },
  "status": "pending" | "paid" | "shipped",
  "createdAt": "Date",
  "completedAt": "Date"
}
```

##### 🔍 Justificación del modelado:

- **users y user_profiles (referencia):** Separar la autenticación de la información de perfil es una buena práctica de seguridad. Aunque la relación es 1 a 1, esta separación permite un perfil más flexible y seguro.
- **Direcciones en user_profiles (embeber):** La relación es uno-a-pocos. Como un usuario normalmente tiene pocas direcciones, embeber permite una consulta rápida de su información completa.
- **products y product_variants (referencia):** Un producto puede tener muchas variantes. Embeberlas puede exceder los límites de tamaño en MongoDB. Además, se requiere consultar y actualizar stock individualmente, lo cual es más eficiente con referencias.
- **items y shippingAddress en orders (embeber):** La información debe quedar congelada al momento de la compra para mantener la integridad histórica. Embeber garantiza que el pedido conserve su estado original, incluso si los datos de producto cambian después.

### Fase 2: Implementación

#### 2.1 - Tecnologías Utilizadas

*   **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
*   **MongoDB:** Base de datos NoSQL orientada a documentos.
*   **Mongoose:** ODM (Object Data Modeling) para MongoDB y Node.js, facilita la interacción con la base de datos.
*   **dotenv:** Módulo para cargar variables de entorno desde un archivo `.env`.

#### 2.2 - Estructura del Proyecto

El proyecto sigue una estructura modular para separar las responsabilidades:

```
/
├── app.js                 # Punto de entrada principal de la aplicación, orquesta las operaciones.
├── database.js            # Configuración y conexión a la base de datos MongoDB.
├── productService.js      # Lógica de negocio para la gestión de productos.
├── variantService.js      # Lógica de negocio para la gestión de variantes de productos.
├── userService.js         # Lógica de negocio para la gestión de usuarios y perfiles (a implementar).
├── orderService.js        # Lógica de negocio para la gestión de pedidos (a implementar).
├── package.json           # Metadatos del proyecto y dependencias.
└── README.md              # Documentación del proyecto.
```

#### 2.3 - Configuración y Ejecución

1.  **Clonar el repositorio (si aplica).**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar variables de entorno:**
    Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:
    ```
    MONGODB_URI=mongodb://localhost:27017/ecommerce_db
    ```
    (Ajustar la URI de MongoDB según sea necesario).
4.  **Ejecutar la aplicación:**
    ```bash
    node app.js
    ```
    Esto ejecutará las operaciones definidas en `app.js` (creación, lectura, actualización y eliminación de productos y variantes como ejemplo).
