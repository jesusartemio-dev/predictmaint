package com.predictmaint.backend.repository;

import com.predictmaint.backend.model.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findByStatus(String status);

    List<WorkOrder> findByEquipmentId(Long equipmentId);

    List<WorkOrder> findByPriority(String priority);

    List<WorkOrder> findAllByOrderByCreatedAtDesc();
}
