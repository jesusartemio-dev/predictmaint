package com.predictmaint.backend.controller;

import com.predictmaint.backend.model.WorkOrder;
import com.predictmaint.backend.service.WorkOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workorders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @GetMapping
    public ResponseEntity<List<WorkOrder>> getAllWorkOrders() {
        return ResponseEntity.ok(workOrderService.getAllWorkOrders());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<WorkOrder>> getWorkOrdersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(workOrderService.getWorkOrdersByStatus(status));
    }

    @GetMapping("/equipment/{equipmentId}")
    public ResponseEntity<List<WorkOrder>> getWorkOrdersByEquipment(@PathVariable Long equipmentId) {
        return ResponseEntity.ok(workOrderService.getWorkOrdersByEquipment(equipmentId));
    }

    @PostMapping("/equipment/{equipmentId}")
    public ResponseEntity<WorkOrder> createWorkOrder(@PathVariable Long equipmentId, @RequestBody WorkOrder workOrder) {
        return ResponseEntity.ok(workOrderService.createWorkOrder(equipmentId, workOrder));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<WorkOrder> updateWorkOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(workOrderService.updateWorkOrderStatus(id, status));
    }
}
