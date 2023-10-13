package com.amralate.practice.respository;

import com.amralate.practice.entity.Geo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GeoRepository extends JpaRepository<Geo, Long> {
}
