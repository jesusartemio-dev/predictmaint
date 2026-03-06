package com.predictmaint.backend.repository;

import com.predictmaint.backend.model.ConditionReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionReadingRepository extends JpaRepository<ConditionReading, Long> {

    List<ConditionReading> findByEquipmentIdOrderByReadingDateDesc(Long equipmentId);

    List<ConditionReading> findTop10ByEquipmentIdOrderByReadingDateDesc(Long equipmentId);
}
