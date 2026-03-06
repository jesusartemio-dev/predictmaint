package com.predictmaint.backend.controller;

import com.predictmaint.backend.model.ConditionReading;
import com.predictmaint.backend.service.ConditionReadingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/readings")
public class ConditionReadingController {

    private final ConditionReadingService conditionReadingService;

    @GetMapping("/equipment/{equipmentId}")
    public ResponseEntity<List<ConditionReading>> getReadingsByEquipment(@PathVariable Long equipmentId) {
        return ResponseEntity.ok(conditionReadingService.getReadingsByEquipment(equipmentId));
    }

    @GetMapping("/equipment/{equipmentId}/last")
    public ResponseEntity<List<ConditionReading>> getLastReadingsByEquipment(@PathVariable Long equipmentId) {
        return ResponseEntity.ok(conditionReadingService.getLastReadingsByEquipment(equipmentId));
    }

    @PostMapping("/equipment/{equipmentId}")
    public ResponseEntity<ConditionReading> createReading(@PathVariable Long equipmentId, @RequestBody ConditionReading reading) {
        return ResponseEntity.ok(conditionReadingService.createReading(equipmentId, reading));
    }
}
