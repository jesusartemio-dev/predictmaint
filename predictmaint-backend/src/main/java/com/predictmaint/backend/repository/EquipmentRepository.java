package com.predictmaint.backend.repository;

import com.predictmaint.backend.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    List<Equipment> findByStatus(String status);

    List<Equipment> findByArea(String area);

    List<Equipment> findByEquipmentType(String equipmentType);
}
