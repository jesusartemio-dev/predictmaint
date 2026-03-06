package com.predictmaint.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String tagName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String equipmentType;

    @Column(nullable = false)
    private String status;

    private String location;

    private Integer operatingHours;
}
