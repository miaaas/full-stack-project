package com.newtech.tech_str.repository;

import com.newtech.tech_str.entity.Location;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    
    @Query("SELECT l FROM Location l WHERE l.product.id = :productId")
    List<Location> findLocationsByProductId(@Param("productId") Long productId);
    
}
