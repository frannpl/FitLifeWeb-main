-- 0. CREACIÓN DE USUARIO PARA SUPABASE
-- Crear el usuario que espera Supabase Studio si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_admin') THEN
    CREATE USER supabase_admin WITH PASSWORD 'rootpassword' SUPERUSER;
  END IF;
END $$;

-- 1. TABLAS PRIMARIAS (Sin dependencias)
CREATE TABLE IF NOT EXISTS ejercicio (
    id SERIAL PRIMARY KEY,
    nombre_ejercicio VARCHAR(60) NOT NULL,
    descripcion VARCHAR(120),
    grupo_muscular VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS comida (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    calorias INT NOT NULL,
    proteinas FLOAT4 NOT NULL,
    carbohidratos FLOAT4 NOT NULL,
    grasas FLOAT4 NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    altura FLOAT4 NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(60),
    genero VARCHAR(10),
    peso_actual FLOAT4 NOT NULL,
    edad INT NOT NULL,
    tarifa VARCHAR(20),
    fecha_ultima_cita DATE,
    fecha_proxima_cita DATE,
    porcentaje_grasa FLOAT4,
    medida_pecho FLOAT4,
    medida_cintura FLOAT4,
    medida_brazos FLOAT4,
    medida_piernas FLOAT4,
    is_pro BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS nutricionista (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(60)
);

-- 2. TABLAS SECUNDARIAS (Dependen de Usuario)
CREATE TABLE IF NOT EXISTS plan (
    id SERIAL PRIMARY KEY,
    nombre_plan VARCHAR(50),
    tipo_dieta VARCHAR(30),
    descripcion VARCHAR(2000),
    id_usuario INT REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rutina (
    id SERIAL PRIMARY KEY,
    nombre_rutina VARCHAR(60),
    descripcion VARCHAR(2000),
    nivel VARCHAR(30),
    duracion_semanas INT NOT NULL,
    id_usuario INT REFERENCES usuario(id) ON DELETE CASCADE
);

-- 3. TABLAS INTERMEDIAS
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

-- Usuarios de prueba
INSERT INTO usuario (nombre, email, password, altura, peso_actual, edad, tarifa, is_pro, porcentaje_grasa)
VALUES 
    ('Juan Perez', 'juan@gmail.com', '$2a$10$eE0mH7gSGFcK7r/b/o3u2eS4S2Q20B8qA63sW4nU/BkVy6HTr59c6', 1.75, 80.5, 28, 'Premium', true, 18.5),
    ('Maria Garcia', 'maria@gmail.com', '$2a$10$eE0mH7gSGFcK7r/b/o3u2eS4S2Q20B8qA63sW4nU/BkVy6HTr59c6', 1.65, 62.0, 24, 'Basic', false, 22.0),
    ('Fran', 'fran@gmail.com', '$2a$10$eE0mH7gSGFcK7r/b/o3u2eS4S2Q20B8qA63sW4nU/BkVy6HTr59c6', 1.80, 75.0, 25, 'Plus', true, 15.0)
ON CONFLICT DO NOTHING;

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
