-- =============================================
-- DATOS DE PRUEBA - Planta de Manufactura
-- =============================================

-- EQUIPOS INDUSTRIALES
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('MOT-001', 'Motor principal faja transportadora',    'Linea A',          'MOTOR',      'OPERATIVO',     'Piso 1 - Sector Norte',    4320) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('MOT-002', 'Motor bomba hidraulica prensa',          'Linea A',          'MOTOR',      'ALERTA',        'Piso 1 - Sector Sur',      6100) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('MOT-003', 'Motor ventilador horno de secado',       'Linea B',          'MOTOR',      'OPERATIVO',     'Piso 2 - Sector Este',     2850) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('COM-001', 'Compresor aire comprimido central',      'Sala Compresores', 'COMPRESOR',  'OPERATIVO',     'Sotano',                   8920) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('COM-002', 'Compresor respaldo linea B',             'Sala Compresores', 'COMPRESOR',  'FALLA',         'Sotano',                   11400) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('BOM-001', 'Bomba agua refrigeracion chiller',       'Sala Mecanica',    'BOMBA',      'OPERATIVO',     'Piso 1 - Cuarto tecnico',  3200) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('BOM-002', 'Bomba combustible generador',            'Sala Mecanica',    'BOMBA',      'ALERTA',        'Exterior - Generador',     5670) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('FAJ-001', 'Faja transportadora entrada almacen',    'Almacen',          'FAJA',       'OPERATIVO',     'Piso 1 - Entrada',         1900) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('FAJ-002', 'Faja transportadora salida empaque',     'Empaque',          'FAJA',       'MANTENIMIENTO', 'Piso 1 - Salida',          7300) ON CONFLICT (tag_name) DO NOTHING;
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('VAL-001', 'Valvula control flujo linea vapor',      'Linea B',          'VALVULA',    'OPERATIVO',     'Piso 2 - Sector Oeste',    9100) ON CONFLICT (tag_name) DO NOTHING;

-- LECTURAS DE CONDICION (solo insertar si la tabla esta vacia)
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 1, '2025-03-01 08:00:00', 1.8, 44.0, 12.5, 1750, 'Lectura rutinaria normal'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 1, '2025-03-02 08:00:00', 2.0, 46.0, 12.8, 1748, 'Lectura rutinaria normal'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 1, '2025-03-03 08:00:00', 2.1, 47.0, 12.6, 1751, 'Lectura rutinaria normal'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 2, '2025-03-01 08:00:00', 3.2, 58.0, 15.1, 1740, 'Lectura rutinaria normal'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 2, '2025-03-02 08:00:00', 4.1, 62.0, 15.8, 1735, 'Vibracion en aumento, monitorear'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 2, '2025-03-03 08:00:00', 5.3, 68.0, 16.4, 1728, 'ALERTA: Vibracion sobre umbral'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 5, '2025-03-01 08:00:00', 6.8, 75.0, 28.3, 2980, 'Vibracion elevada, programar inspeccion'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 5, '2025-03-02 08:00:00', 7.5, 82.0, 30.1, 2950, 'ALERTA CRITICA: Temperatura y vibracion altas'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 5, '2025-03-03 08:00:00', 9.2, 91.0, 32.5, 2870, 'FALLA: Equipo detenido'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations)
SELECT 7, '2025-03-03 08:00:00', 4.8, 69.5, 8.7, 1450, 'Vibracion sobre umbral de alerta'
WHERE NOT EXISTS (SELECT 1 FROM condition_readings LIMIT 1);

-- ORDENES DE TRABAJO (solo insertar si la tabla esta vacia)
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at)
SELECT 2, 'PREDICTIVO', 'ALTA', 'PENDIENTE', 'Inspeccion balanceo y alineacion por vibracion elevada en MOT-002', 'Carlos Mendoza', '2025-03-03 10:00:00', NULL
WHERE NOT EXISTS (SELECT 1 FROM work_orders LIMIT 1);
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at)
SELECT 5, 'CORRECTIVO', 'ALTA', 'EN_PROGRESO', 'Reparacion urgente COM-002 por falla en sobrecalentamiento', 'Luis Paredes', '2025-03-03 11:00:00', NULL
WHERE NOT EXISTS (SELECT 1 FROM work_orders LIMIT 1);
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at)
SELECT 7, 'PREVENTIVO', 'MEDIA', 'PENDIENTE', 'Mantenimiento preventivo BOM-002, cambio de sellos mecanicos', 'Roberto Silva', '2025-03-03 12:00:00', NULL
WHERE NOT EXISTS (SELECT 1 FROM work_orders LIMIT 1);
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at)
SELECT 9, 'PREVENTIVO', 'BAJA', 'EN_PROGRESO', 'Mantenimiento programado FAJ-002, cambio de fajas y lubricacion', 'Jorge Castro', '2025-03-01 08:00:00', NULL
WHERE NOT EXISTS (SELECT 1 FROM work_orders LIMIT 1);
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at)
SELECT 1, 'PREVENTIVO', 'BAJA', 'COMPLETADA', 'Lubricacion rutinaria MOT-001 y verificacion de correas', 'Carlos Mendoza', '2025-02-20 08:00:00', '2025-02-20 16:00:00'
WHERE NOT EXISTS (SELECT 1 FROM work_orders LIMIT 1);
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at)
SELECT 4, 'PREVENTIVO', 'MEDIA', 'COMPLETADA', 'Cambio de filtros y aceite COM-001', 'Luis Paredes', '2025-02-15 09:00:00', '2025-02-15 14:00:00'
WHERE NOT EXISTS (SELECT 1 FROM work_orders LIMIT 1);

-- USUARIOS DEL SISTEMA (password: 1234)
INSERT INTO users (username, password, name, role, area) VALUES
('admin', '$2a$10$Cdt7Scme87y6XDEpxuBmLOzYT3OeRpB5wpY/ugMdLAGot7JY49H36', 'Carlos Mendoza', 'ADMIN', 'Gerencia') ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;
INSERT INTO users (username, password, name, role, area) VALUES
('tecnico1', '$2a$10$Cdt7Scme87y6XDEpxuBmLOzYT3OeRpB5wpY/ugMdLAGot7JY49H36', 'Luis Paredes', 'TECNICO', 'Linea A') ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;
INSERT INTO users (username, password, name, role, area) VALUES
('tecnico2', '$2a$10$Cdt7Scme87y6XDEpxuBmLOzYT3OeRpB5wpY/ugMdLAGot7JY49H36', 'Roberto Silva', 'TECNICO', 'Linea B') ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;
