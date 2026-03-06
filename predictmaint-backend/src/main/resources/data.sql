-- =============================================
-- DATOS DE PRUEBA - Planta de Manufactura
-- =============================================

-- EQUIPOS INDUSTRIALES
INSERT INTO equipment (tag_name, description, area, equipment_type, status, location, operating_hours) VALUES
('MOT-001', 'Motor principal faja transportadora',    'Linea A',          'MOTOR',      'OPERATIVO',     'Piso 1 - Sector Norte',    4320),
('MOT-002', 'Motor bomba hidraulica prensa',          'Linea A',          'MOTOR',      'ALERTA',        'Piso 1 - Sector Sur',      6100),
('MOT-003', 'Motor ventilador horno de secado',       'Linea B',          'MOTOR',      'OPERATIVO',     'Piso 2 - Sector Este',     2850),
('COM-001', 'Compresor aire comprimido central',      'Sala Compresores', 'COMPRESOR',  'OPERATIVO',     'Sotano',                   8920),
('COM-002', 'Compresor respaldo linea B',             'Sala Compresores', 'COMPRESOR',  'FALLA',         'Sotano',                   11400),
('BOM-001', 'Bomba agua refrigeracion chiller',       'Sala Mecanica',    'BOMBA',      'OPERATIVO',     'Piso 1 - Cuarto tecnico',  3200),
('BOM-002', 'Bomba combustible generador',            'Sala Mecanica',    'BOMBA',      'ALERTA',        'Exterior - Generador',     5670),
('FAJ-001', 'Faja transportadora entrada almacen',    'Almacen',          'FAJA',       'OPERATIVO',     'Piso 1 - Entrada',         1900),
('FAJ-002', 'Faja transportadora salida empaque',     'Empaque',          'FAJA',       'MANTENIMIENTO', 'Piso 1 - Salida',          7300),
('VAL-001', 'Valvula control flujo linea vapor',      'Linea B',          'VALVULA',    'OPERATIVO',     'Piso 2 - Sector Oeste',    9100);

-- LECTURAS DE CONDICION
-- MOT-001 (equipo 1) - Lecturas normales
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations) VALUES
(1, '2025-03-01 08:00:00', 1.8, 44.0, 12.5, 1750, 'Lectura rutinaria normal'),
(1, '2025-03-02 08:00:00', 2.0, 46.0, 12.8, 1748, 'Lectura rutinaria normal'),
(1, '2025-03-03 08:00:00', 2.1, 47.0, 12.6, 1751, 'Lectura rutinaria normal');

-- MOT-002 (equipo 2) - Lecturas en alerta, vibración creciente
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations) VALUES
(2, '2025-03-01 08:00:00', 3.2, 58.0, 15.1, 1740, 'Lectura rutinaria normal'),
(2, '2025-03-02 08:00:00', 4.1, 62.0, 15.8, 1735, 'Vibracion en aumento, monitorear'),
(2, '2025-03-03 08:00:00', 5.3, 68.0, 16.4, 1728, 'ALERTA: Vibracion sobre umbral');

-- COM-002 (equipo 5) - Lecturas críticas
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations) VALUES
(5, '2025-03-01 08:00:00', 6.8, 75.0, 28.3, 2980, 'Vibracion elevada, programar inspeccion'),
(5, '2025-03-02 08:00:00', 7.5, 82.0, 30.1, 2950, 'ALERTA CRITICA: Temperatura y vibracion altas'),
(5, '2025-03-03 08:00:00', 9.2, 91.0, 32.5, 2870, 'FALLA: Equipo detenido');

-- BOM-002 (equipo 7) - Lectura en alerta
INSERT INTO condition_readings (equipment_id, reading_date, vibration, temperature, current, rpm, observations) VALUES
(7, '2025-03-03 08:00:00', 4.8, 69.5, 8.7, 1450, 'Vibracion sobre umbral de alerta');

-- ORDENES DE TRABAJO
INSERT INTO work_orders (equipment_id, order_type, priority, status, description, assigned_technician, created_at, completed_at) VALUES
(2, 'PREDICTIVO',  'ALTA',  'PENDIENTE',   'Inspeccion balanceo y alineacion por vibracion elevada en MOT-002', 'Carlos Mendoza', '2025-03-03 10:00:00', NULL),
(5, 'CORRECTIVO',  'ALTA',  'EN_PROGRESO', 'Reparacion urgente COM-002 por falla en sobrecalentamiento',        'Luis Paredes',   '2025-03-03 11:00:00', NULL),
(7, 'PREVENTIVO',  'MEDIA', 'PENDIENTE',   'Mantenimiento preventivo BOM-002, cambio de sellos mecanicos',      'Roberto Silva',  '2025-03-03 12:00:00', NULL),
(9, 'PREVENTIVO',  'BAJA',  'EN_PROGRESO', 'Mantenimiento programado FAJ-002, cambio de fajas y lubricacion',   'Jorge Castro',   '2025-03-01 08:00:00', NULL),
(1, 'PREVENTIVO',  'BAJA',  'COMPLETADA',  'Lubricacion rutinaria MOT-001 y verificacion de correas',           'Carlos Mendoza', '2025-02-20 08:00:00', '2025-02-20 16:00:00'),
(4, 'PREVENTIVO',  'MEDIA', 'COMPLETADA',  'Cambio de filtros y aceite COM-001',                                'Luis Paredes',   '2025-02-15 09:00:00', '2025-02-15 14:00:00');

-- USUARIOS DEL SISTEMA
INSERT INTO users (username, password, name, role, area) VALUES
('admin', '1234', 'Carlos Mendoza', 'ADMIN', 'Gerencia'),
('tecnico1', '1234', 'Luis Paredes', 'TECNICO', 'Linea A'),
('tecnico2', '1234', 'Roberto Silva', 'TECNICO', 'Linea B');
