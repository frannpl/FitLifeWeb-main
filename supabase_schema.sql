-- Supabase PostgreSQL Schema para FitLifeWeb
-- Contiene las sentencias de creación de tablas base requeridas por Spring Boot JPA
-- y los registros de prueba para empezar.

-- 1. TABLA SECUNDARIA: Ejercicio
CREATE TABLE IF NOT EXISTS ejercicio (
    id SERIAL PRIMARY KEY,
    nombre_ejercicio VARCHAR(60) NOT NULL,
    descripcion VARCHAR(120),
    grupo_muscular VARCHAR(30)
);

-- 2. TABLA SECUNDARIA: Comida
CREATE TABLE IF NOT EXISTS comida (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    calorias INT NOT NULL,
    proteinas FLOAT4 NOT NULL,
    carbohidratos FLOAT4 NOT NULL,
    grasas FLOAT4 NOT NULL
);

-- 3. TABLA SECUNDARIA: Plan
CREATE TABLE IF NOT EXISTS plan (
    id SERIAL PRIMARY KEY,
    nombre_plan VARCHAR(50),
    tipo_dieta VARCHAR(30),
    descripcion VARCHAR(120)
);

-- 4. TABLA SECUNDARIA: Rutina
CREATE TABLE IF NOT EXISTS rutina (
    id SERIAL PRIMARY KEY,
    nombre_rutina VARCHAR(60),
    descripcion VARCHAR(120),
    nivel VARCHAR(30),
    duracion_semanas INT NOT NULL
);

-- 5. TABLAS PRIMARIAS: Usuario y Nutricionista
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    altura FLOAT4 NOT NULL,
    email VARCHAR(100),
    password VARCHAR(60),
    genero VARCHAR(10),
    peso_actual FLOAT4 NOT NULL,
    edad INT NOT NULL
);

CREATE TABLE IF NOT EXISTS nutricionista (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(60)
);

-- 6. TABLAS INTERMEDIAS CON CLAVES FORANEAS
CREATE TABLE IF NOT EXISTS plan_comida (
    id_plan INT REFERENCES plan(id) ON DELETE CASCADE,
    id_comida INT REFERENCES comida(id) ON DELETE CASCADE,
    cantidad INT NOT NULL,
    comidas_horarias VARCHAR(20),
    PRIMARY KEY (id_plan, id_comida)
);

CREATE TABLE IF NOT EXISTS rutina_ejercicio (
    id_rutina INT REFERENCES rutina(id) ON DELETE CASCADE,
    id_ejercicio INT REFERENCES ejercicio(id) ON DELETE CASCADE,
    repeticiones INT NOT NULL,
    series INT NOT NULL,
    PRIMARY KEY (id_rutina, id_ejercicio)
);

-- ----------------------------------------------------
-- REGISTROS DE PRUEBA (SEEDERS)
-- ----------------------------------------------------

-- Comidas base
INSERT INTO comida (nombre, calorias, proteinas, carbohidratos, grasas) 
VALUES 
    ('Avena con leche y platano', 350, 12.0, 60.0, 5.0),
    ('Pechuga de pollo a la plancha con arroz', 400, 35.0, 45.0, 8.0),
    ('Ensalada de atun con tomate y aceitunas', 250, 20.0, 10.0, 15.0),
    ('Yogur griego con almendras', 200, 15.0, 10.0, 12.0),
    ('Salmon al horno con batata', 450, 30.0, 35.0, 20.0),
    ('Tostada integral con aguacate', 220, 5.0, 20.0, 14.0)
ON CONFLICT DO NOTHING;

-- Ejercicios base
INSERT INTO ejercicio (nombre_ejercicio, descripcion, grupo_muscular) 
VALUES 
    ('Sentadillas con barra', 'Flexion de piernas con peso en la espalda', 'Piernas'),
    ('Press de banca plano', 'Empuje horizontal en banco', 'Pecho'),
    ('Dominadas', 'Traccion vertical con peso corporal', 'Espalda'),
    ('Press militar con mancuernas', 'Empuje vertical para hombros', 'Hombros'),
    ('Curl de biceps con barra', 'Flexion de codos para brazos', 'Brazos'),
    ('Plancha', 'Isométrico para zona media', 'Core')
ON CONFLICT DO NOTHING;

-- Planes de Ejemplo
INSERT INTO plan (nombre_plan, tipo_dieta, descripcion) 
VALUES 
    ('Plan Definicion Verano', 'Hipo-calorica', 'Dieta estricta reduciendo carbohidratos, optimizada para perder peso y mantener musculo'),
    ('Volumen Magro', 'Hiper-calorica', 'Superavit ligero de calorias priorizando carbohidratos complejos'),
    ('Mantenimiento Flexible', 'Equilibrada', 'Calculada para mantener el peso con opciones variadas')
ON CONFLICT DO NOTHING;

-- Rutinas de Ejemplo
INSERT INTO rutina (nombre_rutina, descripcion, nivel, duracion_semanas) 
VALUES 
    ('Fuerza base', 'Rutina de powerlifting 5x5', 'Intermedio', 8),
    ('Upper Lower', 'Rutina dividida en torso pierna, 4 dias', 'Intermedio', 12),
    ('FullBody para Novatos', 'Circuito de cuerpo completo ideal para empezar', 'Principiante', 4)
ON CONFLICT DO NOTHING;

-- Cuenta Nutricionista por defecto (Password: admin123)
-- Contrasena generada con BCrypt
INSERT INTO nutricionista (nombre, email, password) 
VALUES
    ('Nutricionista Supabase', 'nutricionista@gmail.com', '$2a$10$eE0mH7gSGFcK7r/b/o3u2eS4S2Q20B8qA63sW4nU/BkVy6HTr59c6')
ON CONFLICT DO NOTHING;
