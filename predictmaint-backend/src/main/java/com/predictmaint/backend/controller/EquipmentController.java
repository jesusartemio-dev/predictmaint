package com.predictmaint.backend.controller;

import com.predictmaint.backend.model.Equipment;
import com.predictmaint.backend.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        return ResponseEntity.ok(equipmentService.getAllEquipment());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(equipmentService.getEquipmentById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Equipment>> getEquipmentByStatus(@PathVariable String status) {
        return ResponseEntity.ok(equipmentService.getEquipmentByStatus(status));
    }

    @GetMapping("/area/{area}")
    public ResponseEntity<List<Equipment>> getEquipmentByArea(@PathVariable String area) {
        return ResponseEntity.ok(equipmentService.getEquipmentByArea(area));
    }

    @PostMapping
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
        return ResponseEntity.ok(equipmentService.createEquipment(equipment));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Equipment> updateEquipmentStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(equipmentService.updateEquipmentStatus(id, status));
    }
}
