package com.newtech.tech_str.repository;

import com.newtech.tech_str.entity.Product;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
    
    @Query("SELECT pr FROM Location l JOIN l.product pr WHERE l.id = :locationId")
    List<Product> findProductsByLocationId(@Param("locationId") Long locationId);
    
    @Query("SELECT pr FROM Product pr WHERE pr.producer.id = :producerId")
    List<Product> findProductsByProducerId(@Param("producerId") Long producerId);
    
}
