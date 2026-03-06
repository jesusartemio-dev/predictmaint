package com.predictmaint.backend.service;

import com.predictmaint.backend.model.Equipment;
import com.predictmaint.backend.model.WorkOrder;
import com.predictmaint.backend.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final EquipmentService equipmentService;

    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<WorkOrder> getWorkOrdersByStatus(String status) {
        return workOrderRepository.findByStatus(status);
    }

    public List<WorkOrder> getWorkOrdersByEquipment(Long equipmentId) {
        return workOrderRepository.findByEquipmentId(equipmentId);
    }

    public WorkOrder createWorkOrder(Long equipmentId, WorkOrder workOrder) {
        Equipment equipment = equipmentService.getEquipmentById(equipmentId);
        workOrder.setEquipment(equipment);
        workOrder.setCreatedAt(LocalDateTime.now());
        workOrder.setStatus("PENDIENTE");
        return workOrderRepository.save(workOrder);
    }

    public WorkOrder updateWorkOrderStatus(Long id, String status) {
        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OT no encontrada: " + id));
        workOrder.setStatus(status);
        if ("COMPLETADA".equals(status)) {
            workOrder.setCompletedAt(LocalDateTime.now());
        }
        return workOrderRepository.save(workOrder);
    }
}
