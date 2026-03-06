package com.predictmaint.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "condition_readings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConditionReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "equipment_id", nullable = false)
    private Equipment equipment;

    @Column(nullable = false)
    private LocalDateTime readingDate;

    private Double vibration;

    private Double temperature;

    private Double current;

    private Double rpm;

    private String observations;
}
