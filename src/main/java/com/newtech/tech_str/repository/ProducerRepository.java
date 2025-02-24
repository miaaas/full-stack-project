package com.newtech.tech_str.repository;

import com.newtech.tech_str.entity.Producer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerRepository extends JpaRepository<Producer,Long>{
    
    @Query("SELECT p FROM Product pr JOIN pr.producer p WHERE  pr.id = :productId")
    List<Producer> findProducerByProductId(@Param("productId") Long productId);
}
