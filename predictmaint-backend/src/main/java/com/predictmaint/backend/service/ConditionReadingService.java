package com.predictmaint.backend.service;

import com.predictmaint.backend.model.ConditionReading;
import com.predictmaint.backend.model.Equipment;
import com.predictmaint.backend.repository.ConditionReadingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConditionReadingService {

    private final ConditionReadingRepository conditionReadingRepository;
    private final EquipmentService equipmentService;

    private static final double VIBRATION_ALERT = 4.5;
    private static final double VIBRATION_CRITICAL = 7.1;
    private static final double TEMP_ALERT = 70.0;
    private static final double TEMP_CRITICAL = 85.0;

    public List<ConditionReading> getReadingsByEquipment(Long equipmentId) {
        return conditionReadingRepository.findByEquipmentIdOrderByReadingDateDesc(equipmentId);
    }

    public List<ConditionReading> getLastReadingsByEquipment(Long equipmentId) {
        return conditionReadingRepository.findTop10ByEquipmentIdOrderByReadingDateDesc(equipmentId);
    }

    public ConditionReading createReading(Long equipmentId, ConditionReading reading) {
        Equipment equipment = equipmentService.getEquipmentById(equipmentId);
        reading.setEquipment(equipment);
        reading.setReadingDate(LocalDateTime.now());
        String newStatus = evaluateStatus(reading);
        equipmentService.updateEquipmentStatus(equipmentId, newStatus);
        return conditionReadingRepository.save(reading);
    }

    private String evaluateStatus(ConditionReading reading) {
        Double vibration = reading.getVibration();
        Double temperature = reading.getTemperature();

        if ((vibration != null && vibration >= VIBRATION_CRITICAL) ||
                (temperature != null && temperature >= TEMP_CRITICAL)) {
            return "FALLA";
        }

        if ((vibration != null && vibration >= VIBRATION_ALERT) ||
                (temperature != null && temperature >= TEMP_ALERT)) {
            return "ALERTA";
        }

        return "OPERATIVO";
    }
}
