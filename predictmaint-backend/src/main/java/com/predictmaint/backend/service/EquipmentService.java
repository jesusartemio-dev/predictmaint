package com.predictmaint.backend.service;

import com.predictmaint.backend.model.Equipment;
import com.predictmaint.backend.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipo no encontrado: " + id));
    }

    public List<Equipment> getEquipmentByStatus(String status) {
        return equipmentRepository.findByStatus(status);
    }

    public List<Equipment> getEquipmentByArea(String area) {
        return equipmentRepository.findByArea(area);
    }

    public Equipment createEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipmentStatus(Long id, String status) {
        Equipment equipment = getEquipmentById(id);
        equipment.setStatus(status);
        return equipmentRepository.save(equipment);
    }
}
